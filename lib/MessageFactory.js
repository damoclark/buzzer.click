var AbstractMessage = require('./message/AbstractMessage');
var semver = require('semver');

var classes = {
    BuzzerActionCommandMessage: require('./message/BuzzerActionCommandMessage'),
    ContestantBuzzerPressMessage : require('./message/ContestantBuzzerPressMessage'),
    ContestantJoinRequestMessage : require('./message/ContestantJoinRequestMessage'),
    ContestantJoinResponseMessage : require('./message/ContestantJoinResponseMessage'),
    CreateSessionMessage: require('./message/CreateSessionMessage'),
    CreateSessionResponseMessage: require('./message/CreateSessionResponseMessage'),
    ErrorMessage: require('./message/ErrorMessage'),
    HostTeamLeaderSetRequestMessage: require('./message/HostTeamLeaderSetRequestMessage'),
    HostTeamNameUpdateRequestMessage: require('./message/HostTeamNameUpdateRequestMessage'),
    InquireTeamLeaderResponseMessage: require('./message/InquireTeamLeaderResponseMessage'),
    ObserverUpdateMessage : require('./message/ObserverUpdateMessage'),
    RejoinSessionMessage: require('./message/RejoinSessionMessage'),
    RoundWonMessage : require('./message/RoundWonMessage'),
    SessionComplete : require('./message/SessionComplete'),
    SessionCompleted : require('./message/SessionCompleted'),
    SetTeamNameRequestMessage: require('./message/SetTeamNameRequestMessage'),
    SuccessMessage: require('./message/SuccessMessage')
};

/**
 * Message factory module.
 * @module messageFactory
 */

/**
 * Represents a message factory.
 * @public
 * @constructor
 */
function MessageFactory() {

}

/**
 * Prototype name
 */
MessageFactory.prototype.type = 'MessageFactory';

/**
 * Defines a method to create socket message instances.
 * @public
 * @param  {String} messageName
 * @throw if the message name does not match back to a message.
 * @return {*} the message instance.
 */
MessageFactory.prototype.create = function(messageName) {
    var MessageCtr = classes[messageName];

    if (!MessageCtr) {
        throw new Error('Message name `' + messageName +
            '` could not be matched to a message type.');
    }

    return new MessageCtr();
};

/**
 * Defines a method to restore a message to its strongly typed counterpart.
 * @public
 * @param  {String} messageName
 * @throw if the protocol does not match.
 * @throw if the expected type does not match the message type.
 * @throw if the restored message does not pass JSON schema validation.
 * @return {*} the message instance.
 */
MessageFactory.prototype.restore = function(message, expectedType) {
    if (semver.gt(message.protocol, AbstractMessage.prototype.protocol)) {
        throw new Error('Client protocol ' + msg.protocol + ', server protocol ' +
            AbstractMessage.prototype.protocol);
    }

    if (message.type !== expectedType) {
        throw new Error('Unexpected message type error. Was expected `' +
            expectedType + '` but message was `' + message.type + '`');
    }

    // Restore the message to its correct type
    var typedMessage = new classes[expectedType]();

    if (typedMessage.restore) {
        typedMessage.restore(message.data);
    } else {
        for (var p in message.data) {
            typedMessage.data[p] = message.data[p];
        }
    }

    // Validate the message is correct against the JSON schema
    if (!typedMessage.isValid()) {
        throw new Error('Message validation failed. Errors were ' + typedMessage.validate().toString());
    }

    return typedMessage;
};

//Export the class
module.exports = new MessageFactory();
