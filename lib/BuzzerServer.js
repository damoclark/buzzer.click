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

        socket.on(messageConstants.CREATE_SESSION, createSessionHandler);
        socket.on(messageConstants.REJOIN_SESSION, rejoinSessionHandler);
        socket.on(messageConstants.CONTESTANT_JOIN_REQUEST, contestantJoinRequestHandler);
        socket.on(messageConstants.SESSION_COMPLETE, sessionCompleteHandler);
        socket.on(messageConstants.CONTESTANT_BUZZER_PRESS, contestantBuzzerPressHandler);
        socket.on(messageConstants.BUZZER_ACTION_COMMAND, buzzerActionCommandHandler);
        socket.on(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE, inquireTeamLeaderResponseHandler);
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
    response = (typeof response !== 'undefined') ? response : function() {};
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
        responseMessage.contestantId = contestant.id;
        responseMessage.wasSuccessful = true;
        responseMessage.enquireForTeamLeaderPosition = addResponse.enquireForTeamLeaderPosition;
        response(responseMessage);
        // Update the observers
        updateObservers(session);
    } else {
        responseMessage.failedRequestReason = addResponse.errorMessage;
        response(responseMessage);
    }
}

function createSessionHandler(message, response) {
    response = (typeof response !== 'undefined') ? response : function() {};

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
    // Update the observers
    updateObservers(session);
}

function rejoinSessionHandler(message, response) {
    response = (typeof response !== 'undefined') ? response : function() {};
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
    response = (typeof response !== 'undefined') ? response : function() {};
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

function contestantBuzzerPressHandler(message, response) {
    response = (typeof response !== 'undefined') ? response : function() {};
    var requestMessage = messageFactory.restore(message, messageConstants.CONTESTANT_BUZZER_PRESS);
    var session = sessions.getById(requestMessage.sessionId);
    var errorMessage = messageFactory.create(messageConstants.ERROR);
    var successMessage = messageFactory.create(messageConstants.SUCCESS);

    if (!session || session.isSessionCompleted) {
        errorMessage.error = constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED;
        response(errorMessage);
        return;
    }

    if (!session.contestants.find(function(c) {
            return c.id === requestMessage.contestantId;
        })) {
        errorMessage.error = constants.messages.COULD_NOT_ACCEPT_BUZZER_PRESS_NOT_CONTESTANT;
        response(errorMessage);
        return;
    }

    if (session.tryBuzzerPressRegister(requestMessage.contestantId)) {
        response(successMessage);
    } else {
        errorMessage.error = constants.messages.BUZZER_PRESS_NOT_ACCEPTED;
        response(errorMessage);
    }
}

function buzzerActionCommandHandler(message, response) {
    response = (typeof response !== 'undefined') ? response : function() {};
    var requestMessage = messageFactory.restore(message, messageConstants.BUZZER_ACTION_COMMAND);
    var session = sessions.getById(requestMessage.sessionId);
    var errorMessage = messageFactory.create(messageConstants.ERROR);
    var successMessage = messageFactory.create(messageConstants.SUCCESS);

    if (!session || session.isSessionCompleted) {
        errorMessage.error = constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED;
        response(errorMessage);
        return;
    }

    if (session.host.id !== requestMessage.hostId) {
        errorMessage.error = constants.messages.COULD_NOT_ACCEPT_REQUEST_NOT_HOST;
        response(errorMessage);
        return;
    }

    if (session.tryBuzzerAction(requestMessage.action)) {
        response(successMessage);
    } else {
        errorMessage.error = constants.messages.COULD_NOT_PROCESS_REQUEST_GAME_STATE_WILL_NOT_ALLOW;
        response(errorMessage);
    }
}

function inquireTeamLeaderResponseHandler(message, response) {
    response = (typeof response !== 'undefined') ? response : function() {};
    var requestMessage = messageFactory.restore(message, messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE);
    var session = sessions.getById(requestMessage.sessionId);
    var errorMessage = messageFactory.create(messageConstants.ERROR);
    var successMessage = messageFactory.create(messageConstants.SUCCESS);

    if (!session || session.isSessionCompleted) {
        errorMessage.error = constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED;
        response(errorMessage);
        return;
    }

    var contestant = session.contestants.find(function(c) {
            return c.id === requestMessage.contestantId;
        });

    if (!contestant) {
        errorMessage.error = constants.messages.COULD_NOT_ACCEPT_TEAM_LEADER_RESPONSE_NOT_CONTESTANT;
        response(errorMessage);
        return;
    }

    if (!requestMessage.decision) {
        response(successMessage);
        return;
    }

    var team = session.teams.getByContestant(contestant);
    var [success, error] = team.tryAssignTeamLeader(contestant, false);
    if (success){
        response(successMessage);
        updateObservers(session);
    } else {
        errorMessage.error = error;
        response(errorMessage);
    }
}
