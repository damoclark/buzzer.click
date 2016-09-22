var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');
var Session = require('../Session');
var genericObjectFactory = require('./GenericObjectFactory');

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
    this.data._gameState.contestants = [];
    var i = 0;
    for (i = 0; i < session.contestants.length; i++) {
        this.data._gameState.contestants.push(genericObjectFactory.create(session.contestants[i]));
    }
    this.data._gameState.teams = [];
    if (session.teams) {
        for (i = 0; i < session.teams.length; i++) {
            var t = session.teams.all[i];
            var dto = {
                teamName: t.teamName,
                contestants: []
            };
            for (var ii = 0; ii < t.contestants.length; ii++) {
                dto.contestants.push(genericObjectFactory.create(t.contestants.all[ii]));
            }

            this.data._gameState.teams.push(dto);
        }
    }
    this.data._gameState.host = genericObjectFactory.create(session.host);
    this.data._gameState.settings = genericObjectFactory.create(session.settings);
    this.data._gameState.isCompleted = session.isSessionCompleted;
    this.data._gameState.currentState = session.currentState;
    this.data._gameState.roundWinner = session.roundWinner;
    this.data._gameState.pendingWinner = session.pendingWinner;
    this.data._gameState.previousWinners = session.previousWinners;
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
