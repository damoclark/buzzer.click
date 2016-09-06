var AbstractMessage = require('./message/AbstractMessage');
var semver = require('semver');

var classes = {
    BuzzerStateMessage: require('./message/BuzzerStateMessage'),
    ConfirmMessage: require('./message/ConfirmMessage'),
    ContestantBuzzerPress: require('./message/ContestantBuzzerPress'),
    ContestantJoinResponseMessage: require('./message/ContestantJoinResponseMessage'),
    CreateSessionMessage: require('./message/CreateSessionMessage'),
    CreateSessionResponseMessage: require('./message/CreateSessionResponseMessage'),
    HostBuzzerResetMessage: require('./message/HostBuzzerResetMessage'),
    InquireTeamLeaderPositionMessage: require('./message/InquireTeamLeaderPositionMessage'),
    JoinGameMessage: require('./message/JoinGameMessage'),
    ParticipantJoinRequestMessage: require('./message/ParticipantJoinRequestMessage'),
    ProtocolErrorMessage: require('./message/ProtocolErrorMessage'),
    RegisterNameMessage: require('./message/RegisterNameMessage'),
    RequestTeamNameMessage: require('./message/RequestTeamNameMessage'),
    RoundWonMessage: require('./message/RoundWonMessage'),
    TeamLeaderPositionInquiryResponseMessage: require(
        './message/TeamLeaderPositionInquiryResponseMessage')
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
    var messageCtr = classes[messageName];

    if (!messageCtr) {
        throw new Error('Message name `' + messageName +
            '` could not be matched to a message type.');
    }

    return new messageCtr();
};

MessageFactory.prototype.restore = function(expectedType, message) {
    if (semver.gt(message.protocol, AbstractMessage.prototype.protocol)) {
        throw new Error('Client protocol ' + msg.protocol + ', server protocol ' +
            AbstractMessage.prototype.protocol);
    }

    if (message.type !== expectedType){
        throw new Error('Unexpected message type error. Was expected `'+ expectedType +'` but message was `'+ message.type +'`');
    }

    // TODO: add schema validation

    var typedMessage = new classes[expectedType]();

    // TODO: maybe switch message with typed message for security reasons
    for (var p in message.data) {
        typedMessage[p] = message.data[p];
    }

    return typedMessage;
};

//Export the class
module.exports = new MessageFactory();
