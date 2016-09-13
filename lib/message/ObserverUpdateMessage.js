var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');
var Session = require('../Session');

/**
 * Represents a message which is use to convey game state update to registered observers.
 * @extends AbstractMessage
 * @returns {ObserverUpdateMessage}
 */
var ObserverUpdateMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * ObserverUpdateMessage is a subclass of AbstractMessage.
 */
ObserverUpdateMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
ObserverUpdateMessage.prototype.type = 'ObserverUpdateMessage';

/**
 * Gets the game state object, which is a generic object representation of
 * the current game state.
 * @note The game state object, including child objects, are generic objects.
 * @public
 * @param {Object} the game state.
 * @return {Object} the game state.
 */
Object.defineProperty(ObserverUpdateMessage.prototype, 'gameState', {
    get: function() {
        return this.data._gameState;
    }
});

/**
 * Defines a method which prepares the session for sending. This involves converting the
 * session to a generic object representation and the removal of sensitive data.
 * @throw when param session equates to false or is an incorrect type.
 * @param {Session} the session.
 * @public
 */
ObserverUpdateMessage.prototype.populate = function(session) {
    if (!new ParamCheck().isInstanceAndTypeOf(session, Session) || !session) {
        throw new Error(
            'Argument `session` is invalid. It is required and must be of the correct type.');
    }
    this.data._gameState = {};
    var popObj = null;
    popObj = function(obj, target) {
        var innerObj = (typeof target !== 'undefined') ? target : {};
        for (var f in obj) {
            if (f === '_id') {
                continue;
            }
            var val = obj[f];
            if (f.startsWith('_')) {
                f = f.substring(1);
            }
            if (val && typeof val === 'object') {
                innerObj[f] = popObj(val);
            } else {
                innerObj[f] = val;
            }
        }
        return innerObj;
    };

    popObj(session, this.data._gameState);

    this.data._gameState.isCompleted = session.isSessionCompleted;
    this.data._gameState.currentState = session.currentState;
};

/**
 * Data structure for json validation of message data property
 * @private
 */
ObserverUpdateMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_gameState': {
            'type': 'Object'
        },
    },
    'required': [
        '_gameState',
    ]
};

module.exports = ObserverUpdateMessage;
