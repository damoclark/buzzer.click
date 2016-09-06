var MessageFactory = require('./lib/MessageFactory');
var Settings = require('./lib/Settings');

var socketio = require('socket.io-client')('http://localhost:3000');
socketio.on('connect', function() {
    console.log('Connected');
    MessageFactory.updateSocket(socketio);

    //socketio.onMessage(MessageFactory.JOINGAMEMESSAGE,function(message)
    //{
    //		console.log('Received '+message.getType()+' message with data:'+JSON.stringify(message.data)) ;
    //} ) ;

    socketio.onMessage(MessageFactory.CONFIRMMESSAGE, function(message) {
        console.log('Received ' + message.getType() +
            ' message with msg:' + JSON.stringify(message));
        console.log('Confirm code=' + message.getCode() +
            ', and message=' + message.getMessage());
    });

    //m = MessageFactory.create(MessageFactory.JOINGAMEMESSAGE) ;
    //m.setGameCode('12345') ;
    //socketio.emitMessage(m) ;
    //
    //m = new MessageFactory.JoinGameMessage({"gamecode":"54321"}) ; 
    //
    //socketio.emitMessage(m) ;
});

global.createGame = function(sessionName) {
    var m;
    var settings = new Settings();
    settings.setName(sessionName);
    m = MessageFactory.create(CREATEGAMEMESSAGE,
        settings);
    socketio.emitMessage(m);
}
