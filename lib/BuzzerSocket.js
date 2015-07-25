
/**
 * Socket.io subclass specifically for Buzzer.click
 * Using https://github.com/PencilCode/dynamic.io as a reference
 */
var util = require('util') ;
var IOSocket = require('socket.io/lib/socket') ;
var IOServer = require('socket.io') ;
//var IOClient = require('socket.io/lib/client') ;
var IONamespace = require('socket.io/lib/namespace') ;
//Loaded from a dependent module for socket.io
var Adapter = require('socket.io/node_modules/socket.io-adapter');
var debug = require('socket.io/node_modules/debug')('socket.io:namespace');
var exports = BuzzerSocketServer ;


//augment IOSocket object with emitMessage method that converts the AbstractMessage type object that is given, and converts it to a generic json based object that can be despatched.

/**
 * Emit an AbstractMessage message - overidden method from Socket class
 * @param {AbstractMessage} msg A subclass of AbstractMessage to be sent
 */
IOSocket.prototype.emitMessage = function(msg)
{
	this.emit(msg.getMessageEvent(),msg.getMessageJSON()) ;
} ;

//augment IOSocket object with onMessage method that will call .on method and when it returns, convert the generic object into an AbstractMessage type using MessageFactory

/**
 * Establish event handler for receiving an AbstractMessage message - overriden
 * method from Socket class
 *
 * @param {} @todo UP TO HERE - WHERE DOES THE SUPERCLASS COME FROM
 */
IOSocket.prototype.onMessage = function(event,fn)
{
	this.on(event,function(msg)
	{
		var message ;
		//@todo Convert msg into AbstractMessage message object
		fn(message) ;
	} ) ;
} ;


/**
 * Constructor from socket.io reproduced (necessary)
 */
function BuzzerSocketServer(srv, opts)
{
  if (!(this instanceof BuzzerSocketServer)) return new BuzzerSocketServer(srv, opts);
  if ('object' == typeof srv && !srv.listen) {
    opts = srv;
    srv = null;
  }
  opts = opts || {};
  this.nsps = {};
  this.path(opts.path || '/socket.io');
  this.serveClient(false !== opts.serveClient);
  this.adapter(opts.adapter || Adapter);
  this.origins(opts.origins || '*:*');
  this.sockets = this.of('/');
  if (srv) this.attach(srv, opts);
}
//Same as: BuzzerSocketServer.prototype = new IOServer()
util.inherits(BuzzerSocketServer,IOServer) ;
exports.BuzzerSocketServer = BuzzerSocketServer ;

///**
// * Override onconnection method of IOServer to return our new IOClient object
// * instead of a socket.io-client
// */
//BuzzerSocketServer.prototype.onconnection = function(conn)
//{
//	console.log("Inside onconnection method") ;
//	var client = new IOClient(this,conn) ;
//	client.connect('/') ;
//	return this ;
//}
//

/**
 * Looks up a namespace. Override to use our IONamespace
 *
 * @param {String} nsp name
 * @param {Function} optional, nsp `connection` ev handler
 * @api public
 */
BuzzerSocketServer.prototype.of = function(name, fn){
  if (String(name)[0] !== '/') name = '/' + name;
  
  if (!this.nsps[name]) {
    debug('initializing namespace %s', name);
    var nsp = new IONamespace(this, name);
    this.nsps[name] = nsp;
  }
  if (fn) this.nsps[name].on('connect', fn);
  return this.nsps[name];
};

/**
 * Adds a new client. Override to use our IOSocket
 *
 * @return {Socket}
 * @api private
 */
IONamespace.prototype.add = function(client, fn){
  debug('adding socket to nsp %s', this.name);
  var socket = new IOSocket(this, client);
  var self = this;
  this.run(socket, function(err){
    process.nextTick(function(){
      if ('open' == client.conn.readyState) {
        if (err) return socket.error(err.data || err.message);

        // track socket
        self.sockets.push(socket);

        // it's paramount that the internal `onconnect` logic
        // fires before user-set events to prevent state order
        // violations (such as a disconnection before the connection
        // logic is complete)
        socket.onconnect();
        if (fn) fn();

        // fire user-set events
        self.emit('connect', socket);
        self.emit('connection', socket);
      } else {
        debug('next called after client was closed - ignoring socket');
      }
    });
  });
  return socket;
};


///**
// * Overload on method of 
// */
//BuzzerSocketServer.prototype.on = function(event,listener)
//{
//	console.log('Inside our own on method') ;
//	IOServer.prototype.on.apply(this,arguments) ;
//} ;


BuzzerSocketServer.listen = BuzzerSocketServer ;

module.exports = exports ;
