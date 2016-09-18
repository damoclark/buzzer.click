var API_URL = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port; //This is seperate incase it changes in the future
var WEB_URL = generateWebUrl();
var messageConstants = buzzapi.constants.socketMessageNames;
var client = buzzapi.io(API_URL);

function generateWebUrl() {
    var port = (window.location.port) ? ':' + window.location.port : '';
    var url = window.location.protocol + '//' + window.location.hostname + port;
    return url;
}

/* eslint-disable no-unused-vars */
function createSession(values) {
    /* eslint-enable no-unused-vars */
    if (values) {
        //var client = buzzapi.io(API_URL);

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
            if (values['team-leader-selection'] === 'Random') {
                settings.teamSelectionMethod = buzzapi.constants.teamLeaderSelectionMethod.RANDOM;
            }
            if (values['team-leader-selection'] === 'PlayerChoice') {
                settings.teamSelectionMethod = buzzapi.constants.teamLeaderSelectionMethod.PLAYER_CHOICE;
            }
            //Set team name selection settings
            if (values['team-name-selection'] === 'Auto') {
                settings.teamNameEdit = buzzapi.constants.teamNameEdit.AUTO;
            }
            if (values['team-name-selection'] === 'AutoEdit') {
                settings.teamNameEdit = buzzapi.constants.teamNameEdit.ALLOW;
            }
            if (values['team-name-selection'] === 'Manual') {
                settings.teamNameEdit = buzzapi.constants.teamNameEdit.MANUAL;
                if (values['team-names'].length > 0) {
                    settings.teamNames = values['team-names'];
                }
            }
        } else { //set max-players if teams option is false
            if (!isNaN(parseInt(values['max-players']))) {
                settings.maxContestants = parseInt(values['max-players']);
            } else { //set to max
                settings.maxContestants = 9999;
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
            redirectHost();
        });
    }

}

/* eslint-disable no-unused-vars */
/**
 * check if a session already exists
 * Callback: handleExistingSession();
 */
function checkExistingSession(sessionId, participantId) {
    /* eslint-enable no-unused-vars */
    //var client = buzzapi.io(API_URL);

    var rjm = buzzapi.messageFactory.create(messageConstants.REJOIN_SESSION);
    rjm.sessionId = sessionId;
    rjm.participantId = participantId;
    rjm.rejoinAs = buzzapi.constants.rejoinAs.OBSERVER;

    client.emit(messageConstants.REJOIN_SESSION, rjm, function (m) {

        if (m.type === messageConstants.SUCCESS) {
            handleExistingSession();
        } else { //Remove cookies if session doesn't exist
            buzzapi.Cookie.remove('sessionId');
            buzzapi.Cookie.remove('hostId');
            buzzapi.Cookie.remove('contestantId');
        }
    });
}

/* eslint-disable no-unused-vars */
function closeSession(sessionId, hostId) {
    /* eslint-enable no-unused-vars */
    //var client = buzzapi.io(API_URL);

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
            buzzapi.Cookie.remove('contestantId');
        } else {
            if (console) {
                console.log('Error: ' + m);
            }
        }
    });
}
/* eslint-disable no-unused-vars */
function redirectHost() {
    /* eslint-enable no-unused-vars */
    window.open('/Share', 'share');
    window.location.href = '/Manage';

}

function redirectContestant() {
    window.location.href = '/Contestant';
}

/* eslint-disable no-unused-vars */
function joinSession(values) {
    /* eslint-enable no-unused-vars */
    //var client = buzzapi.io(API_URL);
    var cjr = buzzapi.messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
    if (values['session-id']) {
        cjr.sessionId = values['session-id'].toUpperCase();
    }
    if (values['session-username']) {
        cjr.username = values['session-username'];
    }

    client.emit(messageConstants.CONTESTANT_JOIN_REQUEST, cjr, function (m) {
        var rm = buzzapi.messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);
        if (rm.type === messageConstants.CONTESTANT_JOIN_RESPONSE) {
            if (rm.wasSuccessful) {
                buzzapi.Cookie.set(
                    'sessionId',
                    cjr.sessionId,
                    {
                        live: 1 //Live for 1 day
                    }
                );
                buzzapi.Cookie.set(
                    'contestantId',
                    rm.contestantId,
                    {
                        live: 1 //Live for 1 day
                    }
                );
                redirectContestant();
            } else {
                alertBootstrap(rm.failedRequestReason, 'danger');
            }
        }
    });
}

/**
 * rejoin Session as type,
 * if participantId is ommited then observer is default
 * Type: buzzapi.constants.rejoinAs.HOST,
 *      buzzapi.constants.rejoinAs.CONTESTANT,
 *      buzzapi.constants.rejoinAs.OBSERVER
*/
/* eslint-disable no-unused-vars */
function rejoinSession(sessionId, participantId, type) {
    /* eslint-enable no-unused-vars */
    //var client = buzzapi.io(API_URL);

    var rjm = buzzapi.messageFactory.create(messageConstants.REJOIN_SESSION);
    rjm.sessionId = sessionId;
    if (!type) {
        type = buzzapi.constants.rejoinAs.OBSERVER;
    }
    if (participantId) {
        rjm.participantId = participantId;
        rjm.rejoinAs = type;
    } else {
        rjm.rejoinAs = buzzapi.constants.rejoinAs.OBSERVER;
    }

    // listen for observer update
    client.on(messageConstants.OBSERVER_UPDATE, function(message) {
        var ob = buzzapi.messageFactory.restore(message, messageConstants.OBSERVER_UPDATE);
        console.clear();
        console.log(ob);
        if (ob.gameState.isCompleted) { //Let client know that the session has been completed
            alertBootstrap('Session has been completed', 'info',true);
            $('.container > .row  div:not(:first)').hide();
        } else {
            updateShareView(ob);
        }
    });

    client.emit(messageConstants.REJOIN_SESSION, rjm, function(m) {
        if (m.type === messageConstants.ERROR) {
            var err = buzzapi.messageFactory.restore(m, messageConstants.ERROR);
            alertBootstrap(err.error, 'danger');
        }
    });
}

/* eslint-disable no-unused-vars */
function pressBuzzer(sessionId, contestantId) {
    /* eslint-enable no-unused-vars */
    //var client = buzzapi.io(API_URL);

    var bpm = buzzapi.messageFactory.create(messageConstants.CONTESTANT_BUZZER_PRESS);
    bpm.sessionId = sessionId;
    bpm.contestantId = contestantId;

    client.emit(messageConstants.CONTESTANT_BUZZER_PRESS, bpm, function(m) {
        if (m.type === messageConstants.SUCCESS) {
            handleBuzzSuccess();
        } else {
            var err = buzzapi.messageFactory.restore(m, messageConstants.ERROR);
            alertBootstrap(err.error,'warning');
        }
    });
}

/**
 * sends the specified action to the server
 * sessionId
 * hostId
 * action:  buzzapi.constants.buzzerActionCommands.ACCEPT,
 *          buzzapi.constants.buzzerActionCommands.REJECT,
 *          buzzapi.constants.buzzerActionCommands.RESET,
 *          buzzapi.constants.buzzerActionCommands.DISABLE,
 *          buzzapi.constants.buzzerActionCommands.ENABLE
 *
 */
/* eslint-disable no-unused-vars */
function buzzerManageCommand(sessionId, hostId, action) {
    /* eslint-enable no-unused-vars */
    var bac = buzzapi.messageFactory.create(messageConstants.BUZZER_ACTION_COMMAND);
    bac.sessionId = sessionId;
    bac.hostId = hostId;
    bac.action = action;

    client.emit(messageConstants.BUZZER_ACTION_COMMAND,bac,function(rm) {
            if (rm.type === messageConstants.ERROR) {
                var err = buzzapi.messageFactory.restore(rm, messageConstants.ERROR);
                alertBootstrap(err.error, 'danger');
            }
        });
}

/* eslint-disable no-unused-vars */
function handleDisconnect() {
    /* eslint-enable no-unused-vars */
    //client = buzzapi.io(API_URL);
    client.on('connect',function(){
        client.on('disconnect',function(){
            alertBootstrap('Server disconnected, please refresh to try again.','danger',true);
            $('.container > .row  div:not(:first)').hide();
        });
    });
}

/* eslint-disable no-unused-vars */
function validateNumber(val) {
    /* eslint-enable no-unused-vars */
    if (isNaN(parseInt(val))) {
        return false;
    } else {
        return true;
    }
}

/**
 * Create a bootstrap alert to notify user of events.
 * Type = danger, success, warning, info
 * nodismiss = true : false
 * More information: http://getbootstrap.com/components/#alerts
 */
/* eslint-disable no-unused-vars */
function alertBootstrap(message, type,nodismiss) {
    /* eslint-enable no-unused-vars */
    $('#error-alert').remove();
    if (nodismiss) {
        $('body .container .row').first().prepend('<div class="alert alert-' + type + '" id="error-alert">' +
            '<strong>' + message + '</strong></div>');
    } else {
        $('body .container .row').first().prepend('<div class="alert alert-' + type + '" id="error-alert">' +
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
            '<strong>' + message + '</strong></div>');
    }
}
/*

/**
 *getParameterByName found on: http://stackoverflow.com/a/901144
 */
/* eslint-disable no-unused-vars */
function getParameterByName(name, url) {
    /* eslint-enable no-unused-vars */
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
