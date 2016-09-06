/**
 * This is the server for buzzer.click
 */

var socketIo = require('socket.io');
var console = require('console');
var Sessions = require('./Sessions');
var Session = require('./Session');
var Host = require('./Host');
var IdentifierUtility = require('./IdentifierUtility');
var constants = require('./Constants');
var messageFactory = require('./MessageFactory');
var io;
var sessions;

exports.listen = function(server) {
    sessions = new Sessions();
    exports.sessions = sessions;

    io = socketIo.listen(server);
    io.on('connection', function(socket) {
        console.log('A new client has connected');

        socket.on(constants.socketMessageTypeNames.CREATE_GAME_MESSAGE, function(message, response) {
            console.log('A client sent message of `' + message + '`');

            var host = new Host();
            host.id = new IdentifierUtility().generateParticipantId();

            var settings = message.settings;

            var session = sessions.add(host, settings);

            response(session);
            
        });



        socket.on('client message', function(data, response) {
            console.log('A client sent message of ' + data);
            response('Thank you for the message');
        });

        setTimeout(function(){
            socket.emit('server message', 'Hello from the server');
        }, 1500);
    });
};

//var MessageFactory = require('./MessageFactory');

//var BuzzerError = require('./BuzzerError');

//var Games = require('./Games');
//var Game = require('./Game');
//@todo add other state related objects here as written

//Declare the socket.io object globally within the module
var io;

//Create our global state object games here so accessible to rest of module
//var games = new Games();

// maps socket.id to user's nickname
//var nicknames = {};
// list of socket ids
//var clients = [];
//var namesUsed = [];
/*
exports.listen = function(server) {
    //An event has occurred on the listening socket
    io = socketio.listen(server);

    //We have a new connection, so let's handle it
    io.on('connection', function(socket) {
        console.log('Connection made');

        //Add the emitMessage and onMessage methods to our socket
        MessageFactory.updateSocket(socket);

        //Moved game create into a handler function
        handleCreateGame(socket)

        //
        //Testing for send/receive messages
        //
        socket.onMessage(MessageFactory.JOINGAMEMESSAGE, function(
            message) {
            console.log('Received ' + message.getType() +
                ' message with object:' + JSON.stringify(
                    message));

            socket.emitMessage(MessageFactory.create(
                MessageFactory.JOINGAMEMESSAGE, {
                    'gamecode': '123456'
                }));
        });

        //Log errors to console
        socket.on('error',function(er){
            console.log("socket error="+er);
        });
        
        //    initializeConnection(socket) ;
        handleChoosingNicknames(socket) ;
        //    handleClientDisconnections(socket) ;
        //    handleMessageBroadcasting(socket) ;
        //    handlePrivateMessaging(socket) ;
    });
}

function handleCreateGame(socket)
{ 
    socket.onMessage(MessageFactory.CREATEGAMEMESSAGE, function(
            message) {
            console.log('Received ' + message.getType() +
                ' message with object:' + JSON.stringify(
                    message));
            //Create game object and pass in settings provided by client
            try {
                var game = new Game(message.get());
                var e = new BuzzerError(BuzzerError.INVALID_CODE,
                    "Bla bla bla!");
                
                //Add the game to the system
                games.add(game);

                throw e;
            } catch (err) {
                if (err instanceof BuzzerError) {
                    console.log(
                        'Inside catch for BuzzerError');
                    var r = MessageFactory.create(
                        MessageFactory.CREATEGAMECONFIRMMESSAGE
                    );
                    r.setBuzzerError(err);
                    socket.emitMessage(r);
                }
                //@todo return ConfirmMessage with code = error
                console.log('error=' + err.message);
                console.log('name=' + err.name);
                if (err instanceof ReferenceError) {
                    console.log('Syntax error!!');
                }
                //@todo UP TO HERE USE BuzzerError here
            }
            //@todo return ConfirmCreateGameMessage (subclass of ConfirmMessage) with gameCode & hostCode
            //var confirm = MessageFactory.create(MessageFactory.CONFIRMMESSAGE,{confirm:{code:0,message:""}}) ;
            var confirm = MessageFactory.create(
                MessageFactory.CONFIRMMESSAGE);
            confirm.setCode(0).setMessage("");
            socket.emitMessage(confirm);
        });
}
function initializeConnection(socket) {
    //This isn't right.  This should be done when the attempt
    //to create or join a game
    var game = new Game();
    games.add(game);
    socket.clientId
    showActiveUsers(socket);
    showOldMsgs(socket);
}

function showActiveUsers(socket) {
    var activeNames = [];
    var usersInRoom = io.sockets.clients();
    for (var index in usersInRoom) {
        var userSocketId = usersInRoom[index].id;
        if (userSocketId !== socket.id && nicknames[userSocketId]) {
            var name = nicknames[userSocketId];
            activeNames.push({
                id: namesUsed.indexOf(name),
                nick: name
            });
        }
    }
    socket.emit('names', activeNames);
}

function showOldMsgs(socket) {
    db.getOldMsgs(5, function(err, docs) {
        socket.emit('load old msgs', docs);
    });
}

function handleChoosingNicknames(socket) {
    socket.on('choose nickname', function(nick, cb) {
        if (namesUsed.indexOf(nick) !== -1) {
            cb(
                'That name is already taken!  Please choose another one.'
            );
            return;
        }
        var ind = namesUsed.push(nick) - 1;
        clients[ind] = socket;
        nicknames[socket.id] = nick;
        cb(null);
        io.sockets.emit('new user', {
            id: ind,
            nick: nick
        });
    });
}

function handleMessageBroadcasting(socket) {
    socket.on('message', function(msg) {
        var nick = nicknames[socket.id];
        db.saveMsg({
            nick: nick,
            msg: msg
        }, function(err) {
            if (err) throw err;
            io.sockets.emit('message', {
                nick: nick,
                msg: msg
            });
        });
    });
}

function handlePrivateMessaging(socket) {
    socket.on('private message', function(data) {
        var from = nicknames[socket.id];
        clients[data.userToPM].emit('private message', {
            from: from,
            msg: data.msg
        });
    });
}

function handleClientDisconnections(socket) {
    socket.on('disconnect', function() {
        var ind = namesUsed.indexOf(nicknames[socket.id]);
        delete namesUsed[ind];
        delete clients[ind];
        delete nicknames[socket.id];
        io.sockets.emit('user disconnect', ind);
    });
}
*/
