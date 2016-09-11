var ParamCheck = require('./ParamCheck');

/**
 * RoomNameFactory module.
 * @module room name factory
 */

/**
 * Represents a room name factory.
 * @public
 * @constructor
 */
function RoomNameFactory() {

}

/**
 * Prototype name
 */
RoomNameFactory.prototype.type = 'RoomNameFactory';

RoomNameFactory.prototype.host = function(sessionId) {
    return 'session/' + sessionId + '/host';
};

RoomNameFactory.prototype.observers = function(sessionId) {
    return 'session/' + sessionId + '/observers';
};

RoomNameFactory.prototype.contestants = function(sessionId) {
    return 'session/' + sessionId + '/contestants';
};

//Export the class
module.exports = new RoomNameFactory();
