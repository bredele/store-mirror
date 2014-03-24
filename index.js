
/**
 * Expose module.
 */

module.exports = function(name, io) {

  /**
   * Expose 'mirror' plugin
   * @param  {Store} store
   * @api public
   */
  
  return function(store) {

    io
    .of('/' + name)
    .on('connection', function(socket) {

      //mirror changes from server to client
      
      store.on('updated', function(key, val) {
        socket.emit('server change', key, val);
      });


      //mirror changes from client to server

      socket.on('client change', function(key, val) {
        if(val) {
          store.set(key, val, true);
        } else {
          store.del(key, true);
        }
      });
        
    });

  };

};

