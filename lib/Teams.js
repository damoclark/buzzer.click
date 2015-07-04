
var AbstractContainer = require('./AbstractContainer') ;

/**
 * Teams object contains a list of all the Team objects
 * 
 * @returns {Teams} Instance of Teams
 */
var Teams = function()
{
	AbstractContainer.call(this) ;
} ;

Teams.prototype = new AbstractContainer() ;

//Export the class
module.exports = Teams ;