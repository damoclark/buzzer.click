/* eslint-disable no-unused-vars */
var API_URL = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port; //This is seperate incase it changes in the future
var WEB_URL = generateWebUrl();
var messageConstants = buzzapi.constants.socketMessageNames;
var client = buzzapi.io(API_URL);
/* eslint-enabled no-unused-vars */

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
            if (validateNumber(values['max-players-teams']) && parseInt(values['max-players-teams']) !== 0) {
                settings.teamSize = parseInt(values['max-players-teams']);
            } else { //set to max
                settings.teamSize = buzzapi.constants.UNLIMITED;
            }
            if (validateNumber(values['num-teams'])) {
                var teamInt = parseInt(values['num-teams']);
                if (teamInt === 0) {
                    settings.maxTeams = buzzapi.constants.UNLIMITED;
                } else {
                    settings.maxTeams = teamInt;
                }
            }
            //Set teamleader selection setting
            if (values['team-leader-selection'] === 'Random') {
                settings.teamLeaderSelectionMethod = buzzapi.constants.teamLeaderSelectionMethod.RANDOM;
            }
            if (values['team-leader-selection'] === 'PlayerChoice') {
                settings.teamLeaderSelectionMethod = buzzapi.constants.teamLeaderSelectionMethod.PLAYER_CHOICE;
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
            if (values['team-selection-mode'] === 'SmallestTeam') {
                settings.teamSelectionMethod = buzzapi.constants.teamSelectionMethod.SMALLEST_TEAM;
            }
            if (values['team-selection-mode'] === 'PlayerChoice') {
                settings.teamSelectionMethod = buzzapi.constants.teamSelectionMethod.PLAYER_CHOICE;
            }
        } else { //set max-players if teams option is false
            if (validateNumber(values['max-players']) && parseInt(values['max-players']) !== 0) {
                settings.maxContestants = parseInt(values['max-players']);
            } else { //set to max
                settings.maxContestants = buzzapi.constants.UNLIMITED;
            }
        }

        var createSessionMessage = buzzapi.messageFactory.create(messageConstants.CREATE_SESSION);
        createSessionMessage.settings = settings;

        client.emit(messageConstants.CREATE_SESSION, createSessionMessage, function (message) {

            if (message.type === messageConstants.ERROR) {
                var error = buzzapi.messageFactory.restore(message, messageConstants.ERROR);
                alertBootstrap(error.error, 'danger', true);
            } else {
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
            }
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

/**
 * Handlers: handleTeamLeaderPositionRequest, handleChooseTeam
 */
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
    if (values['choose-team-choice']) {
        cjr.teamName = values['choose-team-choice'];
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
                if (rm.enquireForTeamLeaderPosition) {
                    handleTeamLeaderPositionRequest();
                } else {
                    redirectContestant();
                }
            } else if (rm.mustChooseTeam) {
                handleChooseTeam(rm.teams);
            } else {
                alertBootstrap(rm.failedRequestReason, 'danger');
            }
        }
    });
}

function sendTeamLeaderResponse(sessionId, contestantId, response) {
    rqm = buzzapi.messageFactory.create(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE);
    rqm.sessionId = sessionId;
    rqm.contestantId = contestantId;
    rqm.decision = response;

    client.emit(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE, rqm,
        function (m) {
            if (m.type === messageConstants.ERROR) {
                var sm = buzzapi.messageFactory.restore(m, messageConstants.ERROR);
                alertBootstrap(sm.error, 'warning');
            }
        });
}

function setTeamName(sessionId, contestantId, name) {
    var req = buzzapi.messageFactory.create(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE);
    req.sessionId = sessionId;
    req.contestantId = contestantId;
    req.teamName = name;

    client.emit(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE, req,
        function (m) {
            if (m.type === messageConstants.ERROR) {
                var sm = buzzapi.messageFactory.restore(m, messageConstants.ERROR);
                alertBootstrap(sm.error, 'warning', false, '#modal-team-name .modal-body');
            } else {
                redirectContestant();
            }
        });
}

/**
 * hostUpdateSettings
 * Handlers:
 *  handleUpdateSettingsError
 *  handleUpdateSettingsSuccess(reopen)
 *
 * Values can contain the following:
 *  .teamSize
 *  .sessionName
 *  .maxTeams
 *  .maxContestants
 *  .teamNameChange -> .teamNameFrom, .teamNameTo
 *  .teamLeaderChange -> .teamName, .teamLeaderUsername
 */
function hostUpdateSettings(sessionId, hostId, values) {
    var reopen = false; //Specifies that the modal should re-open after update.
    var sur = buzzapi.messageFactory.create(messageConstants.HOST_SETTINGS_UPDATE_MESSAGE);
    sur.hostId = hostId;
    sur.sessionId = sessionId;
    if (values.teamSize) {
        sur.teamSize = values.teamSize;
    }
    if (values.sessionName) {
        sur.sessionName = values.sessionName;
    }
    if (values.maxTeams) {
        sur.maxTeams = values.maxTeams;
        reopen = true;
    }
    if (values.maxContestants) {
        sur.maxContestants = values.maxContestants;
    }
    client.emit(messageConstants.HOST_SETTINGS_UPDATE_MESSAGE, sur, function (m) {
        if (m.type === messageConstants.ERROR) {
            var er = buzzapi.messageFactory.restore(m, messageConstants.ERROR);
            handleUpdateSettingsError(er);
        }
    });
    if (values.teamNameChange) {
        $.each(values.teamNameChange, function (key, item) {
            var tnc = buzzapi.messageFactory.create(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE);
            tnc.hostId = hostId;
            tnc.sessionId = sessionId;
            tnc.teamNameFrom = item.teamNameFrom;
            tnc.teamNameTo = item.teamNameTo;

            client.emit(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE, tnc, function (m) {
                if (m.type === messageConstants.ERROR) {
                    var er = buzzapi.messageFactory.restore(m, messageConstants.ERROR);
                    handleUpdateSettingsError(er);
                }
            });
        });
    }
    if (values.teamLeaderChange) {
        $.each(values.teamLeaderChange, function (key, item) {
            var tls = buzzapi.messageFactory.create(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE);
            tls.hostId = hostId;
            tls.sessionId = sessionId;
            tls.teamName = item.teamName;
            tls.teamLeaderUsername = item.teamLeaderUsername;

            client.emit(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE, tls, function (m) {
                if (m.type === messageConstants.ERROR) {
                    var er = buzzapi.messageFactory.restore(m, messageConstants.ERROR);
                    handleUpdateSettingsError(er);
                }
            });
        });
    }

    //Got this far must be all good.
    handleUpdateSettingsSuccess(reopen);
}

/**
 * Request session info, calls handleSessionInformatonRequest() in the view
 */
function sessionInformationRequest(sessionId, participantId) {
    var sir = buzzapi.messageFactory.create(messageConstants.SESSION_INFORMATION_REQUEST_MESSAGE);
    sir.sessionId = sessionId;
    sir.participantId = participantId;

    client.emit(messageConstants.SESSION_INFORMATION_REQUEST_MESSAGE, sir, function (m) {
        if (m.type === messageConstants.SESSION_INFORMATION_RESPONSE_MESSAGE) {
            handleSessionInformationRequest(m);
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
    client.on(messageConstants.OBSERVER_UPDATE, function (message) {
        var ob = buzzapi.messageFactory.restore(message, messageConstants.OBSERVER_UPDATE);
        //console.clear();
        console.log(ob);
        if (ob.gameState.isCompleted) { //Let client know that the session has been completed
            alertBootstrap('Session has been completed', 'info', true);
            $('.container > .row  div:not(:first)').hide();
            $('#participant-info-header').text('Final Score');
            $('#participant-info').show().parents().show();;
        } else {
            ob.sessionId = sessionId;
            ob.participantId = participantId;
            updateShareView(ob);
        }
    });

    client.emit(messageConstants.REJOIN_SESSION, rjm, function (m) {
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

    client.emit(messageConstants.CONTESTANT_BUZZER_PRESS, bpm, function (m) {
        if (m.type === messageConstants.SUCCESS) {
            handleBuzzSuccess();
        } else {
            var err = buzzapi.messageFactory.restore(m, messageConstants.ERROR);
            alertBootstrap(err.error, 'warning');
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

    client.emit(messageConstants.BUZZER_ACTION_COMMAND, bac, function (rm) {
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
    client.on('connect', function () {
        client.on('disconnect', function () {
            alertBootstrap('Server disconnected, please refresh to try again.', 'danger', true);
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
function alertBootstrap(message, type, nodismiss, target) {
    /* eslint-enable no-unused-vars */
    $('#error-alert').remove();
    var targetDOM = $('body .container .row');
    if (target) {
        targetDOM = $(target);
    }
    if (nodismiss) {
        targetDOM.first().prepend('<div class="alert alert-' + type + '" id="error-alert">' +
            '<strong>' + message + '</strong></div>');
    } else {
        targetDOM.first().prepend('<div class="alert alert-' + type + '" id="error-alert">' +
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

function playSuccessSound() {
    var audio = new Audio('media/success.mp3');
    audio.play();
    return 'success';
}

function playRejectSound() {
    var audio = new Audio('media/reject.mp3');
    audio.play();
    return 'reject';
}

function playBuzzerSound() {
    var audio = new Audio('media/buzzer.mp3');
    audio.play();
    return 'buzzer';
}
function playDisabledBuzzerSound() {
    var audio = new Audio('media/buzzer-disabled.mp3');
    audio.play();
    return 'buzzer';
}

//Bootswatch theme picker for all pages
$(function () {
    var THEMES_TO_LOAD = ['Paper','Cerulean','Flatly','Journal','Lumen','Readable','Sandstone','Simplex','Spacelab','United','Yeti'];
    $('.container').append('<hr />').append('<div class="pull-right">Theme: <select id="theme-picker" /></div>');
    var currentTheme = loadCss();
    $.getJSON('https://bootswatch.com/api/3.json', function (data) {
        var themes = data.themes;
        var select = $('#theme-picker');
        select.show();
        themes.forEach(function (value, index) {
            if ($.inArray(value.name, THEMES_TO_LOAD) > -1) {
                if (value.name === currentTheme) {
                    select.append($('<option />')
                        .val(index)
                        .text(value.name)
                        .attr('selected', 'selected'));
                } else {
                    select.append($('<option />')
                        .val(index)
                        .text(value.name));
                }
            }
        });

        select.change(function () {
            var theme = themes[$(this).val()];
            saveCss(theme.cssMin,theme.name);
        });

        }, 'json').fail(function () {
            alertBootstrap('Error fetching theme list');
        });
});

function saveCss(href,name) {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('theme', href);
        localStorage.setItem('themeName', name);
        $('link[title=theme]').attr('href', href);
    } else {
        alertBootstrap('Local storage is not supported, we cannot save this theme for next time.', 'info');
    }
}

function loadCss() {
    if (storageAvailable('localStorage')) {
        var theme = localStorage.getItem('theme');
        if (theme !== null) {
            $('link[title=theme]').attr('href', theme);
            return localStorage.getItem('themeName');
        }
    }
}

function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return false;
	}
}

