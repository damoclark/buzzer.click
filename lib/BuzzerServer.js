/**
 * This is the server for buzzer.click
 */

var socketIo = require('socket.io');
var console = require('console');
var Sessions = require('./Sessions');
var Contestant = require('./Contestant');
var Host = require('./Host');
var idUtility = require('./IdentifierUtility');
var constants = require('./Constants');
var messageFactory = require('./MessageFactory');
var roomNameFactory = require('./RoomNameFactory');
var io;
var sessions;
var isDebug = true;
var messageConstants = constants.socketMessageNames;

exports.listen = function(server) {
    sessions = new Sessions();
    exports.sessions = sessions;

    io = socketIo.listen(server);
    if (isDebug) {
        var socketIoWildcard = require('socketio-wildcard')();
        io.use(socketIoWildcard);
    }

    io.on('connection', function(socket) {
        if (isDebug) {
            console.log('A new client with id `' + socket.id + '` has connected');
        }

        // Only active when isDebug is true
        socket.on('*', function(message) {
            console.log('Inbound `' + message.data[0] +
                '` from client. Message `' + JSON.stringify(message.data[1]) +
                '`');
        });

        socket.on(messageConstants.CREATE_SESSION, createSessionMessageHandler);
        socket.on(messageConstants.REJOIN_SESSION, rejoinSessionMessageHandler);
        socket.on(messageConstants.CONTESTANT_JOIN_REQUEST, contestantJoinRequestHandler);
        socket.on(messageConstants.SESSION_COMPLETE, sessionCompleteHandler);

    });
};

function updateObservers(session) {
    var message = messageFactory.create(messageConstants.OBSERVER_UPDATE);
    message.populate(session);
    io.sockets.in(roomNameFactory.observers(session.id)).emit(messageConstants.OBSERVER_UPDATE, message);
}
exports.updateObservers = updateObservers;

function sendMessageToContestants(session, messageName, message) {
    io.sockets.in(roomNameFactory.contestants(session.id)).emit(messageName, message);
}
exports.sendMessageToContestants = sendMessageToContestants;

function contestantJoinRequestHandler(message, response) {
    var requestMessage = messageFactory.restore(message, messageConstants.CONTESTANT_JOIN_REQUEST);
    var session = sessions.getById(requestMessage.sessionId);
    var responseMessage = messageFactory.create(messageConstants.CONTESTANT_JOIN_RESPONSE);
    responseMessage.wasSuccessful = false;

    if (!session || session.isSessionCompleted) {
        responseMessage.failedRequestReason = constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED;
        response(responseMessage);
        return;
    }

    var contestant = new Contestant();
    contestant.username = requestMessage.username;

    var addResponse = session.addContestant(contestant);

    if (addResponse.wasSuccessful) {
        this.join(roomNameFactory.contestants(session.id));
        this.join(roomNameFactory.observers(session.id));
        responseMessage.wasSuccessful = true;
        response(responseMessage);
    } else {
        responseMessage.failedRequestReason = addResponse.errorMessage;
        response(responseMessage);
    }
}

function createSessionMessageHandler(message, response) {
    var host = new Host();
    host.id = idUtility.generateParticipantId();

    var requestMessage = messageFactory.restore(message, messageConstants.CREATE_SESSION);
    var session = sessions.add(host, requestMessage.settings);

    session.subscribeForStateChange('onenterstate', onSessionStateChangeHandler);

    var responseMessage = messageFactory.create(messageConstants.CREATE_SESSION_RESPONSE);
    responseMessage.sessionId = session.id;
    responseMessage.hostId = session.host.id;

    this.join(roomNameFactory.host(session.id));
    this.join(roomNameFactory.observers(session.id));

    response(responseMessage);
}

function onSessionStateChangeHandler(session, event, from, to) {
    updateObservers(session);
}

function rejoinSessionMessageHandler(message, response) {
    var requestMessage = messageFactory.restore(message, messageConstants.REJOIN_SESSION);
    var session = sessions.getById(requestMessage.sessionId);
    var errorMessage = messageFactory.create(messageConstants.ERROR);
    var successMessage = messageFactory.create(messageConstants.SUCCESS);

    if (!session || session.isSessionCompleted) {
        errorMessage.error = constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED;
        response(errorMessage);
        return;
    }

    switch (requestMessage.rejoinAs) {
        case constants.rejoinAs.HOST:
            if (session.host.id !== requestMessage.participantId) {
                errorMessage.error = constants.messages.COULD_NOT_REJOIN_NOT_HOST;
                response(errorMessage);
                return;
            }
            this.join(roomNameFactory.host(session.id));
            this.join(roomNameFactory.observers(session.id));
            break;
        case constants.rejoinAs.CONTESTANT:
            if (!session.contestants.find(function(c) {
                    return c.id === requestMessage.participantId;
                })) {
                errorMessage.error = constants.messages.COULD_NOT_REJOIN_NOT_CONTESTANT;
                response(errorMessage);
                return;
            }
            this.join(roomNameFactory.contestants(session.id));
            this.join(roomNameFactory.observers(session.id));
            break;
        case constants.rejoinAs.OBSERVER:
            this.join(roomNameFactory.observers(session.id));
            break;
        default:
            errorMessage.error = constants.messages.COULD_NOT_REJOIN_UNKNOWN;
            response(errorMessage);
            break;
    }

    response(successMessage);

    // Update the observers (helps rejoin populate UI)
    updateObservers(session);
}

function sessionCompleteHandler(message, response) {
    var requestMessage = messageFactory.restore(message, messageConstants.SESSION_COMPLETE);
    var session = sessions.getById(requestMessage.sessionId);
    var errorMessage = messageFactory.create(messageConstants.ERROR);
    var successMessage = messageFactory.create(messageConstants.SUCCESS);

    if (!session || session.isSessionCompleted) {
        errorMessage.error = constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED;
        response(errorMessage);
        return;
    }

    if (session.host.id !== requestMessage.hostId) {
        errorMessage.error = constants.messages.COULD_NOT_COMPLETE_SESSION_NOT_HOST;
        response(errorMessage);
        return;
    }

    session.complete();
    response(successMessage);
}
