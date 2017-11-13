var express = require('express'),
	app 	= express(),
	bodyparser = require('body-parser'),
	multer	= require('multer');

var storage = multer.diskStorage({
	destination: 'www/uploads',
	filename: function(req, file, cb) {
		var orname = file.originalname,
			arr = orname.split('.'),
			filetype = arr[arr.length - 1];
		var newname = Date.now() + '.' + filetype;
		cb(null, newname);
	}
});
var uploads = multer({storage});
app.use(express.static(__dirname + '/www'));
app.post('/uploadimg', uploads.array('file'), function(req, res) {
	console.log(req.body)
	res.send({success: true,url: req.body.name});
})

app.listen(3001, function() {
	console.log('running...');
})