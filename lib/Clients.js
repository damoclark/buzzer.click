
var AbstractContainer = require('./AbstractContainer') ;

var Clients = function()
{
	AbstractContainer.call(this) ;
} ;

Clients.prototype = new AbstractContainer() ;

module.exports = Clients ;