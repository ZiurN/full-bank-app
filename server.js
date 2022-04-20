import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express';
import cors from 'cors';
import {retrieveUserInfo} from './dal.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '/client/build');
console.log(publicPath)
app.use(express.static(publicPath));
app.use(cors());

app.get('/client-info/:userId', (req, res) => {
	retrieveUserInfo(req.params.userId)
		.then((data) => {
			console.log('ok', data);
			res.send(data);
		}).catch((err) => {
			console.log('err', err);
			res.send(err);
		});
});

app.get('/create-account', (req, res) => {
	console.log('en crear');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server is up on port ${port}!`);
});