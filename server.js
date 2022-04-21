import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {retrieveUserInfo, createUserInFirebase, upddateUserInfoInFirebase} from './dal.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '/client/build');
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(cors());

app.get('/client-info/:userId', (req, res) => {
	retrieveUserInfo(req.params.userId)
		.then((data) => {
			res.send(data);
		}).catch((err) => {
			res.send(err);
		});
});
app.post('/create-account', (req, res) => {
	createUserInFirebase(req.body)
		.then((data) => {
			res.send({message: data});
		}).catch((err) => {
			res.send(err);
		});
});
app.post('/update-account', (req, res) => {
	upddateUserInfoInFirebase(req.body)
		.then((data) => {
			res.status(200).send({message: data});
		}).catch((err) => {
			res.status(500).send(err);
		});
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server is up on port ${port}!`);
});