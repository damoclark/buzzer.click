var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');
var Session = require('../Session');
var genericObjectFactory = require('./GenericObjectFactory');

/**
 * Represents a message which is use to convey the callers session information
 * @extends AbstractMessage
 * @returns {SessionInformationResponseMessage}
 */
var SessionInformationResponseMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * SessionInformationResponseMessage is a subclass of AbstractMessage.
 */
SessionInformationResponseMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
SessionInformationResponseMessage.prototype.type = 'SessionInformationResponseMessage';

/**
 * Gets the info object, which is a generic object representation of
 * the callers information.
 * @public
 * @return {Object} the info object
 */
Object.defineProperty(SessionInformationResponseMessage.prototype, 'info', {
    get: function() {
        return this.data._info;
    }
});

/**
 * Defines a method which prepares and populates the info object.
 * @throw when param session equates to false or is an incorrect type.
 * @param {Session} the session.
 * @public
 */
SessionInformationResponseMessage.prototype.populate = function(host, contestant, session) {
    if (!new ParamCheck().isInstanceAndTypeOf(session, Session) || !session) {
        throw new Error(
            'Argument `session` is invalid. It is required and must be of the correct type.');
    }
    this.data._info = {};
    this.data._info.host = host ? genericObjectFactory.create(host) : null;
    this.data._info.contestant = null;
    this.data._info.team = null;
    if (contestant) {
        this.data._info.contestant = genericObjectFactory.create(contestant);
        var t = session.settings.hasTeams ? session.teams.getByContestant(contestant) : null;
        this.data._info.team = t ? genericObjectFactory.create(t) : null;
    }
    this.data._info.session = genericObjectFactory.create(session);
    this.data._info.isObserver = !host && !contestant;
    this.data._info.isHost = host ? true : false;
    this.data._info.isContestant = contestant ? true : false;
    this.data._info.isSessionCompleted = session.isSessionCompleted;
    this.data._info.sessionState = session.currentState;
};

/**
 * Data structure for json validation of message data property
 * @private
 */
SessionInformationResponseMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_info': {
            'type': 'Object'
        },
    },
    'required': [
        '_info',
    ]
};

module.exports = SessionInformationResponseMessage;
