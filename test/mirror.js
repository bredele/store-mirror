var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var Store = require('store-component');
var mirror = require('../lib/server');

app.use(express.static(path.resolve('.')));
app.use('/build', express.static(path.resolve('..', 'build')));

//sync store

var store = new Store();
store.use(mirror('test', io));

store.on('change incr', function(val) {
	console.log('incr', val);
});

var i = 0;
setInterval(function() {
	store.set('hello', i++);
}, 2000);

server.listen(3000);