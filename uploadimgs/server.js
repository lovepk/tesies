var express = require('express');
var app = express();

app.use(express.static(__dirname + '/www'));
app.get('/uploadimg', function(req, res) {
	console.log(req)
	res.send({msg: 'msg'})
})

app.listen(3000, function() {
	console.log('running...');
})