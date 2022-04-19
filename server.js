const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');

const publicPath = path.join(__dirname, '/client/build');
console.log(publicPath)
app.use(express.static(publicPath));
app.use(cors());

app.get('/account', (req, res) => {
	res.send('Prueba');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is up on port ${port}!`);
 });