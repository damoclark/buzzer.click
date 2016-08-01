var AbstractContainer = require('./AbstractContainer');

/**
 * Teams object contains a list of all the Team objects
 *
 * @extends AbstractContainer
 * 
 * @returns {Teams} Instance of Teams
 */
var Teams = function() {
    AbstractContainer.call(this);
};

Teams.prototype = Object.create(AbstractContainer.prototype);

/**
 * Prototype name
 */
Teams.prototype.type = 'Teams';

//Export the class
module.exports = Teams;