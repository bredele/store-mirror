// var origin;

// if (!window.location.origin) {
// 	var location = window.location;
//   origin = location.protocol + "//" + location.hostname + (location.port ? ':' + location.port: '');
// }


module.exports = function(name, origin) {

	/**
	 * Socket.io socket.
	 * @api private
	 */
	
	var socket = io.connect(( origin ? origin: location.origin ) + '/' + name);


	/**
	 * Expose 'mirror' plugin
	 * @param  {Store} store
	 * @api public
	 */
	
	return function(store) {

		//mirror changes from client to server
		
		store.on('updated', function(name, val) {
			socket.emit('client change', name, val);
		});


		//mirror changes from server to client

		socket.on('server change', function(name, val) {
			store.set(name, val, true);
		});

	};

};