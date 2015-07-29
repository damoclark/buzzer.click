
var AbstractContainer = require('./AbstractContainer') ;

/**
 * Object that contains a list of all clients connections and their socket
 * 
 * @extends AbstractContainer
 * 
 * @returns {Clients} Object instance
 */
var Clients = function()
{
	AbstractContainer.call(this) ;
} ;

Clients.prototype = Object.create(AbstractContainer.prototype) ;

/**
 * Prototype name
 */
Clients.prototype.type = 'Clients' ;

module.exports = Clients ;