
var AbstractContainer = require('./AbstractContainer') ;

/**
 * Hosts object contains a list of all the Host objects
 * 
 * @returns {Hosts} Instance
 */
var Hosts = function()
{
	AbstractContainer.call(this) ;
} ;

Hosts.prototype = new AbstractContainer() ;

//Export the class
module.exports = Hosts ;