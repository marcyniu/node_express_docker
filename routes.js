const express = require('express');
const router = express.Router();

//Example: http://{host}/
router.get('/', (req, res) => {
	res.send('Main folder');
});

//Path with no param
//Example: http://{host}/path1
router.get('/path1', (req, res) => {
  res.send('path1');
});

router.get('/path5', (req, res) => {
  res.send('path5');
});

//Path with param: userName
//Example: http://{host}/path2/John
router.get('/path2/:userName', (req, res, next) => {
	console.log(req.params);
	next();
}, (req, res) => {
	res.send('Welcome User name: ' + req.params['userName']);
});

//Static files in public directory:
//Example: http://{host}/images/cat.jpeg
router.use(express.static('public'));

// Export the configured router so server.js can mount it with app.use('/', routes)
module.exports = router;
