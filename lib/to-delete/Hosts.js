var AbstractContainer = require('./AbstractContainer');

/**
 * Hosts object contains a list of all the Host sockets
 *
 * @extends AbstractContainer
 * 
 * @returns {Hosts} Instance
 */
var Hosts = function() {
    AbstractContainer.call(this);
};

Hosts.prototype = Object.create(AbstractContainer.prototype);

/**
 * Prototype name
 */
Hosts.prototype.type = 'Hosts';

//Export the class
module.exports = Hosts;