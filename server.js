const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
var dal = require('./dal.js');

const publicPath = path.join(__dirname, '/client/build');
console.log(publicPath)
app.use(express.static(publicPath));
app.use(cors());

app.get('/account/all', (req, res) => {
	dal.returnAllUsers().then((data) => {
		console.log('ok');
		res.send(data);
	}).catch((err) => {
		res.send(err);
		console.log(err);
	});
});

app.get('/create-account', (req, res) => {
	console.log('en crear');
	dal.createUser('Jeferson', 'jef@gmail.com', '123').then((data) => {
		console.log('ok user');
		res.send(data);
	}).catch((err) => {
		res.send(err);
		console.log(err);
	});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is up on port ${port}!`);
});