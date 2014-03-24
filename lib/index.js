// var origin;

// if (!window.location.origin) {
//  var location = window.location;
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

    store.on('updated', function(key, val) {
      socket.emit('client change', key, val);
    });


    //mirror changes from server to client

    socket.on('server change', function(key, val) {
      if(val) {
        store.set(key, val, true);
      } else {
        store.del(key, true);
      }
    });

  };

};