var API_URL = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port; //This is seperate incase it changes in the future
var WEB_URL = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
var messageConstants = buzzapi.constants.socketMessageNames;

/* eslint-disable no-unused-vars */
function createSession(values) {
    /* eslint-enable no-unused-vars */
    if (values) {
        var client = buzzapi.io(API_URL);

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
            redirectHost();
        });
    }

}

/* eslint-disable no-unused-vars */
function checkExistingSession(sessionId, hostId) {
    /* eslint-enable no-unused-vars */
    var client = buzzapi.io(API_URL);

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

/* eslint-disable no-unused-vars */
function closeSession(sessionId, hostId) {
    /* eslint-enable no-unused-vars */
    var client = buzzapi.io(API_URL);

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
    var client = buzzapi.io(API_URL);
    var cjr = buzzapi.messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
    if (values['session-id']) {
        cjr.sessionId = values['session-id'];
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

/* eslint-disable no-unused-vars */
function joinObserver(sessionId, participantId) {
    /* eslint-enable no-unused-vars */
    var client = buzzapi.io(API_URL);

    var rjm = buzzapi.messageFactory.create(messageConstants.REJOIN_SESSION);
    rjm.sessionId = sessionId;
    if (participantId) {
        rjm.participantId = participantId;
    }
    rjm.rejoinAs = buzzapi.constants.rejoinAs.OBSERVER;

    // listen for observer update
    client.on(messageConstants.OBSERVER_UPDATE, function(message) {
        var ob = buzzapi.messageFactory.restore(message, messageConstants.OBSERVER_UPDATE);
        console.log(ob);
        updateShareView(ob);
    });

    client.emit(messageConstants.REJOIN_SESSION, rjm, function(m) {
        if (m.type === messageConstants.ERROR) {
            var err = buzzapi.messageFactory.restore(m, messageConstants.ERROR);
            alertBootstrap(err.error, 'danger');
        }
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
 * More information: http://getbootstrap.com/components/#alerts
 */
/* eslint-disable no-unused-vars */
function alertBootstrap(message, type) {
    /* eslint-enable no-unused-vars */
    $('#error-alert').remove();
    $('body .container .row').first().prepend(`<div class="alert alert-${type}" id="error-alert">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>${message}</strong>
        </div>`);
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
