
var AbstractContainer = require('./AbstractContainer') ;

var Teams = function()
{
	AbstractContainer.call(this) ;
} ;

Teams.prototype = new AbstractContainer() ;

module.exports = Teams ;