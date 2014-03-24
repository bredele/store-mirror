
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
      
      store.on('updated', function(name, val) {
        socket.emit('server change', name, val);
      });


      //mirror changes from client to server

      socket.on('client change', function(name, val) {
        store[val ? 'set' : 'del'].apply(store, arguments);
      });
        
    });

  };

};