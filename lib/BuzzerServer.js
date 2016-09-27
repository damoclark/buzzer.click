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
var connectedParticipantsMap = [];

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

        socket.on(messageConstants.DISCONNECT, socketDisconnectHandler);
        socket.on(messageConstants.CREATE_SESSION, createSessionHandler);
        socket.on(messageConstants.REJOIN_SESSION, rejoinSessionHandler);
        socket.on(messageConstants.CONTESTANT_JOIN_REQUEST, contestantJoinRequestHandler);
        socket.on(messageConstants.SESSION_COMPLETE, sessionCompleteHandler);
        socket.on(messageConstants.CONTESTANT_BUZZER_PRESS, contestantBuzzerPressHandler);
        socket.on(messageConstants.BUZZER_ACTION_COMMAND, buzzerActionCommandHandler);
        socket.on(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE, inquireTeamLeaderResponseHandler);
        socket.on(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE, setTeamNameRequestHandler);
        socket.on(messageConstants.HOST_SETTINGS_UPDATE_MESSAGE, hostSettingsUpdateMessageHandler);
        socket.on(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE, hostTeamLeaderSetRequestHandler);
        socket.on(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE, hostTeamNameUpdateRequestHandler);
        socket.on(messageConstants.SESSION_INFORMATION_REQUEST_MESSAGE, SessionInformationRequestHandler);
    });
};

function socketDisconnectHandler() {
    var self = this;
    var index = connectedParticipantsMap.findIndex(function(rc) {
        return rc.socket === self;
    });
    if (index >= 0) {
        // flag disconnected
        var rc = connectedParticipantsMap[index];
        rc.participant.disconnect();

        // update observers
        updateObservers(rc.session);

        // remove tracking element
        connectedParticipantsMap.splice(index, 1);
    }
}

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

    if (session.settings.teamSelectionMethod === constants.teamSelectionMethod.PLAYER_CHOICE && !requestMessage.teamName) {
        responseMessage.failedRequestReason = constants.messages.CONTESTANT_MUST_CHOOSE_TEAM;
        responseMessage.mustChooseTeam = true;
        session.teams.getAvailable(session.settings).forEach(function(t) {
            responseMessage.teams.push(t.teamName);
        });
        response(responseMessage);
        return;
    }

    var contestant = new Contestant();
    contestant.username = requestMessage.username;

    var addResponse = session.addContestant(contestant, requestMessage.teamName);

    if (addResponse.wasSuccessful) {
        this.join(roomNameFactory.contestants(session.id));
        this.join(roomNameFactory.observers(session.id));
        responseMessage.contestantId = contestant.id;
        responseMessage.wasSuccessful = true;
        responseMessage.enquireForTeamLeaderPosition = addResponse.enquireForTeamLeaderPosition;
        response(responseMessage);

        // register the socket connection
        connectedParticipantsMap.push({
            socket: this,
            participant: contestant,
            session: session
        });

        // Update the observers
        updateObservers(session);
    } else {
        responseMessage.failedRequestReason = addResponse.errorMessage;
        response(responseMessage);
    }
}

function createSessionHandler(message, response) {
    response = (typeof response !== 'undefined') ? response : function() {};
    var errorMessage = messageFactory.create(messageConstants.ERROR);
    var requestMessage = messageFactory.restore(message, messageConstants.CREATE_SESSION);

    var [result, error] = requestMessage.settings.validate();
    if (!result) {
        errorMessage.error = error;
        response(errorMessage);
        return;
    }

    var host = new Host();
    host.id = idUtility.generateParticipantId();

    var session = sessions.add(host, requestMessage.settings);

    session.subscribeForStateChange('onenterstate', onSessionStateChangeHandler);

    var responseMessage = messageFactory.create(messageConstants.CREATE_SESSION_RESPONSE);
    responseMessage.sessionId = session.id;
    responseMessage.hostId = session.host.id;

    this.join(roomNameFactory.host(session.id));
    this.join(roomNameFactory.observers(session.id));

    // register the socket connection
    connectedParticipantsMap.push({
        socket: this,
        participant: host,
        session: session
    });

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

    var participant = null;

    switch (requestMessage.rejoinAs) {
        case constants.rejoinAs.HOST:
            if (session.host.id !== requestMessage.participantId) {
                errorMessage.error = constants.messages.COULD_NOT_REJOIN_NOT_HOST;
                response(errorMessage);
                return;
            }
            this.join(roomNameFactory.host(session.id));
            this.join(roomNameFactory.observers(session.id));
            participant = session.host;
            break;
        case constants.rejoinAs.CONTESTANT:
            participant = session.contestants.find(function(c) {
                    return c.id === requestMessage.participantId;
                });
            if (!participant) {
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

    if (participant) {
        participant.reconnect();
        // register the socket connection
        connectedParticipantsMap.push({
            socket: this,
            participant: participant,
            session: session
        });
    }

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

    if (success) {
        response(successMessage);
        updateObservers(session);
    } else {
        errorMessage.error = error;
        response(errorMessage);
    }
}

function setTeamNameRequestHandler(message, response) {
    response = (typeof response !== 'undefined') ? response : function() {};
    var requestMessage = messageFactory.restore(message, messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE);
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
        errorMessage.error = constants.messages.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_NOT_CONTESTANT_TEAM_OR_TEAM_LEADER;
        response(errorMessage);
        return;
    }

    var team = session.teams.getByContestant(contestant);

    if (!team.teamLeader || team.teamLeader.id !== contestant.id) {
        errorMessage.error = constants.messages.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_NOT_CONTESTANT_TEAM_OR_TEAM_LEADER;
        response(errorMessage);
        return;
    }

    var otherTeam = session.teams.getByTeamName(requestMessage.teamName);

    if (otherTeam && team === otherTeam) {
        // no update
        response(successMessage);
        return;
    } else if (otherTeam) {
        errorMessage.error = constants.messages.COULD_NOT_ACCEPT_TEAM_NAME_IN_USE;
        response(errorMessage);
        return;
    }

    var [success, error] = team.tryChangeName(requestMessage.teamName, session.settings, false);

    if (success) {
        response(successMessage);
        updateObservers(session);
    } else {
        errorMessage.error = error;
        response(errorMessage);
    }
}

function hostSettingsUpdateMessageHandler(message, response) {
    response = (typeof response !== 'undefined') ? response : function() {};
    var requestMessage = messageFactory.restore(message, messageConstants.HOST_SETTINGS_UPDATE_MESSAGE);
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

    var success = true;

    if (success) {
        response(successMessage);
        updateObservers(session);
    } else {
        errorMessage.error = error;
        response(errorMessage);
    }
}

function hostTeamLeaderSetRequestHandler(message, response) {
    response = (typeof response !== 'undefined') ? response : function() {};
    var requestMessage = messageFactory.restore(message, messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE);
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

    var team = session.teams.getByTeamName(requestMessage.teamName);

    if (!team) {
        errorMessage.error = constants.messages.COULD_NOT_PROCESS_REQUEST_TEAM_NOT_FOUND;
        response(errorMessage);
        return;
    }

    var contestant = team.getContestantByUsername(requestMessage.teamLeaderUsername);

    if (!contestant) {
        errorMessage.error = constants.messages.COULD_NOT_PROCESS_REQUEST_CONTESTANT_NOT_FOUND;
        response(errorMessage);
        return;
    }

    var [success, error] = team.tryAssignTeamLeader(contestant, true);

    if (success) {
        response(successMessage);
        updateObservers(session);
    } else {
        errorMessage.error = error;
        response(errorMessage);
    }
}

function hostTeamNameUpdateRequestHandler(message, response) {
    response = (typeof response !== 'undefined') ? response : function() {};
    var requestMessage = messageFactory.restore(message, messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE);
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

    var team = session.teams.getByTeamName(requestMessage.teamNameFrom);

    if (!team) {
        errorMessage.error = constants.messages.COULD_NOT_PROCESS_REQUEST_TEAM_NOT_FOUND;
        response(errorMessage);
        return;
    }

    var otherTeam = session.teams.getByTeamName(requestMessage.teamNameTo);

    if (otherTeam && team === otherTeam) {
        // no update
        response(successMessage);
        return;
    } else if (otherTeam) {
        errorMessage.error = constants.messages.COULD_NOT_ACCEPT_TEAM_NAME_IN_USE;
        response(errorMessage);
        return;
    }

    var [success, error] = team.tryChangeName(requestMessage.teamNameTo, session.settings, true);

    if (success) {
        response(successMessage);
        updateObservers(session);
    } else {
        errorMessage.error = error;
        response(errorMessage);
    }
}

function SessionInformationRequestHandler(message, response) {
    response = (typeof response !== 'undefined') ? response : function() {};
    var requestMessage = messageFactory.restore(message, messageConstants.SESSION_INFORMATION_REQUEST_MESSAGE);
    var session = sessions.getById(requestMessage.sessionId);
    var errorMessage = messageFactory.create(messageConstants.ERROR);
    var responseMessage = messageFactory.create(messageConstants.SESSION_INFORMATION_RESPONSE_MESSAGE);

    if (!session) {
        errorMessage.error = constants.messages.SESSION_COULD_NOT_BE_FOUND;
        response(errorMessage);
        return;
    }

    var host = session.host.id === requestMessage.participantId ? session.host : null;
    var contestant = session.contestants.find(function(c) {
        return c.id === requestMessage.participantId;
    });

    if (requestMessage.participantId && !host && !contestant) {
        errorMessage.error = constants.messages.COULD_NOT_PROCESS_REQUEST_CONTESTANT_OR_HOST_NOT_FOUND;
        response(errorMessage);
        return;
    }

    responseMessage.populate(host, contestant, session);
    response(responseMessage);
}
