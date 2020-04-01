const express = require('express');
const routes = express.Router();

console.log(express);

//Example: http://{host}/
routes.get('/', (req, res) => {
	res.send('Main folder');
});

//Path with no param
//Example: http://{host}/path1
routes.get('/path1', (req, res) => {
  res.send('path1');
});

//Path with param: userName
//Example: http://{host}/path2/John
routes.get('/path2/:userName', (req, res, next) => {
	console.log(req.params);
	next();
}, (req, res) => {
	res.send('Welcome User name: ' + req.params['userName']);
});

//Static files in public directory:
//Example: http://{host}/images/cat.jpeg
routes.use(express.static('public'));


module.exports = routes;
