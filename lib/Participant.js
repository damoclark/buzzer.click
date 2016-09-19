var ParamCheck = require('./ParamCheck');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

/**
 * Participant module.
 * @module participant
 */

/**
 * Represents a participant.
 * @public
 * @constructor
 * @extends EventEmitter
 */
function Participant() {

}

/**
 * Prototype name
 */
Participant.prototype.type = 'Participant';

/**
 * ContestantJoinResponseMessage is a subclass of EventEmitter
 */
util.inherits(Participant, EventEmitter);

/**
 * @private
 */
Participant.prototype._id = null;
/**
 * @private
 */
Participant.prototype._disconnected = false;

/**
 * Defines a property to get and set the @see {@link _id} field.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @return {String} the id if set; else null.
 */
Object.defineProperty(Participant.prototype, 'id', {
    get: function() {
        return this._id;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this._id = val;
    }
});

/**
 * Defines a property to get a flag for whether the participant is connected or disconnected.
 * @readonly
 * @public
 * @throws on set value.
 * @return {Boolean} true when the participant is disconnected; else, false.
 */
Object.defineProperty(Participant.prototype, 'isDisconnected', {
    get: function() {
        return this._disconnected;
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a method to change the participant to disconnected.
 * @public
 * @see {@link isDisconnected}
 * @see {@link Reconnect}
 */
Participant.prototype.disconnect = function() {
    this._disconnected = true;
};

/**
 * Defines a method to change the participant to connected.
 * @public
 * @see {@link isDisconnected}
 * @see {@link Disconnect}
 */
Participant.prototype.reconnect = function() {
    this._disconnected = false;
};

//Export the class
module.exports = Participant;
