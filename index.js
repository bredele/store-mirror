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
		
		store.on('change', function(name, val) {
			console.log('socket emit');
			socket.emit('change', name, val);
		});

	};

};