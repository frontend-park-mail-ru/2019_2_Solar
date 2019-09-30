
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
// const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();

// app.use(morgan('dev'));
// app.use(body.json());
app.use(cookie());
app.use(express.static('dist'))

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });

const port = 3000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});