var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static(path.resolve('.')));
app.use('/build', express.static(path.resolve('..', 'build')));

io.of('/test').on('connection', function(socket){ 
	socket.on('change', function(name, val) {
		console.log('message',name, val);
	});
});

server.listen(3000);