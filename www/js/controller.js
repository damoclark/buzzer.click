function createSession(values) {
    if (values) {
        var client = io(window.location.protocol + '//' + window.location.hostname + ':3000');
        var messageConstants = buzzapi.constants.socketMessageNames;

        var settings = new buzzapi.Settings();
        if (values['session-name']){
            settings.sessionName = values['session-name'];
        }
        if (values['option-teams'] == 'true'){
            settings.hasTeams = true;
            if (validateNumber(values['max-players-teams'])) {
                settings.teamSize = parseInt(values['max-players-teams']);
            }
            if (validateNumber(values['num-teams'])) {
                settings.maxTeams = parseInt(values['num-teams']);
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
                messageConstants.CREATE_SESSION_RESPONSE + '`<br />Server said: ' + JSON.stringify(response));

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
