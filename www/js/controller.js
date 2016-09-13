function createSession(values) {
    if (values) {
        var client = io(window.location.protocol + '//' + window.location.hostname + ':3000');
        var messageConstants = buzzapi.constants.socketMessageNames;

        var settings = new buzzapi.Settings();
        if (values['session-name']) {
            settings.sessionName = values['session-name'];
        }
        if (values['option-teams'] === 'true') {
            settings.hasTeams = true;
            if (validateNumber(values['max-players-teams'])) {
                settings.teamSize = parseInt(values['max-players-teams']);
            }
            if (validateNumber(values['num-teams'])) {
                settings.maxTeams = parseInt(values['num-teams']);
            }
            //Set teamleader selection setting
            if (values['team-leader-selection'] === 'Manual') {
                settings.teamSelectionMethod = buzzapi.constants.teamSelectionMethod.MANUAL;
            }
            if (values['team-leader-selection'] === 'PlayerChoice') {
                settings.teamSelectionMethod = buzzapi.constants.teamSelectionMethod.AUTO;
            }
            //Set team name selection settings
            if (values['team-name-selection'] === 'Auto') {
                settings.teamNameEdit = buzzapi.constants.teamNameEdit.LOCKED;
            }
            if (values['team-name-selection'] === 'AutoEdit') {
                settings.teamNameEdit = buzzapi.constants.teamNameEdit.ALLOW;
            }
            if (values['team-name-selection'] === 'Manual') {
                settings.teamNameEdit = buzzapi.constants.teamNameEdit.LOCKED;
                if (values['team-names'].length > 0) {
                    settings.teamNames = values['team-names'];
                }
            }
        } else { //set max-players if teams option is false
            if (!isNaN(parseInt(values['max-players']))) {
                settings.maxContestants = parseInt(values['max-players']);
            }
        }

        var createSessionMessage = buzzapi.messageFactory.create(messageConstants.CREATE_SESSION);
        createSessionMessage.settings = settings;

        client.emit(messageConstants.CREATE_SESSION, createSessionMessage, function (message) {
            var response = buzzapi.messageFactory.restore(message, messageConstants.CREATE_SESSION_RESPONSE);

            buzzapi.Cookie.set(
                'sessionId',
                response.data._sessionId,
                {
                    live: 1 //Live for 1 day
                }
            );
            buzzapi.Cookie.set(
                'hostId',
                response.data._hostId,
                {
                    live: 1 //Live for 1 day
                }
            );
            if (console) {
                console.log('Connected to server', response);
            } else {
                alter('Connected to server.');
            }
            joinHost();
        });
    }

}

function checkExistingSession(sessionId, hostId) {
    var client = io(window.location.protocol + '//' + window.location.hostname + ':3000');
    var messageConstants = buzzapi.constants.socketMessageNames;

    var rjm = buzzapi.messageFactory.create(messageConstants.REJOIN_SESSION);
    rjm.sessionId = sessionId;
    rjm.participantId = hostId;
    rjm.rejoinAs = buzzapi.constants.rejoinAs.HOST;

    client.emit(messageConstants.REJOIN_SESSION, rjm, function (m) {

        if (m.type === messageConstants.SUCCESS) {
            $('#modal-rejoin').modal();
        } else { //Remove cookies if session doesn't exist
            buzzapi.Cookie.remove('sessionId');
            buzzapi.Cookie.remove('hostId');
        }
    });
}

function closeSession(sessionId,hostId) {
    var client = io(window.location.protocol + '//' + window.location.hostname + ':3000');
    var messageConstants = buzzapi.constants.socketMessageNames;

    var scm = buzzapi.messageFactory.create(messageConstants.SESSION_COMPLETE);
    scm.sessionId = sessionId;
    scm.hostId = hostId;
    client.emit(messageConstants.SESSION_COMPLETE, scm, function (m) {

        if (m.type === messageConstants.SUCCESS) {
            if (console) {
                console.log('Session Closed');
            }
            buzzapi.Cookie.remove('sessionId');
            buzzapi.Cookie.remove('hostId');
        } else {
            if (console) {
                console.log('Error: '+ m);
            }
        }
    });
}

function joinHost() {
    window.open('/Share','share');
    window.location.href = '/Manage';

}

function validateNumber(val) {
    if (isNaN(parseInt(val))) {
        return false;
    } else {
        return true;
    }
}
