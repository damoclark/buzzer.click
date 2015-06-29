
var AbstractContainer = require('./AbstractContainer') ;

var Hosts = function()
{
	AbstractContainer.call(this) ;
} ;

Hosts.prototype = new AbstractContainer() ;

module.exports = Hosts ;