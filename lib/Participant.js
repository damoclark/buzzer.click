var ParamCheck = require('./ParamCheck');

/**
 * Participant module.
 * @module participant
 */

/**
 * Represents a participant.
 * @constructor
 */
function Participant() {

}

/**
 * Prototype name
 */
Participant.prototype.type = 'Participant';

Participant.prototype._id = null;
Participant.prototype._disconnected = false;

/**
 * Defines a property to get and set the @see {@link _id} field.
 */
Object.defineProperty(Participant.prototype, 'id', {
    get: function() {
        return this._id;
    },
    set: function(id) {
        if (!new ParamCheck().isInstanceAndTypeOf(id, 'String')) {
            throw new Error(
                'Argument `id` is invalid. It is required and must be of the correct type.'
            );
        }
        this._id = id;
    }
});

/**
 * Defines a property to get a flag for whether the participant is connected or disconnected.
 * @readonly
 * @throws on set value.
 * @return true when the participant is disconnected; else, false.
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
 * @see {@link isDisconnected}
 * @see {@link Reconnect}
 */
Participant.prototype.disconnect = function() {
    this._disconnected = true;
};

/**
 * Defines a method to change the participant to connected
 * @see {@link isDisconnected}
 * @see {@link Disconnect}
 */
Participant.prototype.reconnect = function() {
    this._disconnected = false;
};

//Export the class
module.exports = Participant;
