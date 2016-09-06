#!/usr/bin/env node

var MessageFactory = require('./lib/MessageFactory');

var socketio = require('socket.io-client')('http://localhost:3000');
socketio.on('connect', function() {
    console.log('Connected');
    MessageFactory.updateSocket(socketio);

    socketio.onMessage(MessageFactory.JOINGAMEMESSAGE, function(message) {
        console.log('Received ' + message.getType() +
            ' message with data:' + JSON.stringify(message.data)
        );
    });

    var m = MessageFactory.create(MessageFactory.JOINGAMEMESSAGE);
    m.setGameCode('12345');
    socketio.emitMessage(m);

    m = new MessageFactory.JoinGameMessage({
        "gamecode": "54321"
    });

    socketio.emitMessage(m);
});