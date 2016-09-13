function createSession(values) {
    if (values) {
        var client = io(window.location.protocol + '//' + window.location.hostname + ':3000');
        var messageConstants = buzzapi.constants.socketMessageNames;

        var settings = new buzzapi.Settings();
        if (values['session-name']){
            settings.sessionName = values['session-name'];
        }
        if (values['option-teams'] === 'true'){
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
            if (!isNaN(parseInt(values['max-players']))){
                settings.maxContestants = parseInt(values['max-players']);
            }
        }

        var createSessionMessage = buzzapi.messageFactory.create(messageConstants.CREATE_SESSION);
        createSessionMessage.settings = settings;

        client.emit(messageConstants.CREATE_SESSION, createSessionMessage, function (message) {
            var response = buzzapi.messageFactory.restore(message, messageConstants.CREATE_SESSION_RESPONSE);

            $('body div.container')
                .prepend('<div>Connected to the server<br />Server replied with `' +
                messageConstants.CREATE_SESSION_RESPONSE + '`<br />Server said: sessionId: ' + response.data._sessionId + ', hostid: ' + response.data._hostId);

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
        });
    }

}

function validateNumber(val) {
    if (isNaN(parseInt(val))){
        return false;
    } else {
        return true;
    }
}
