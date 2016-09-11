/**
 * This is the server for buzzer.click
 */

var socketIo = require('socket.io');
var console = require('console');
var Sessions = require('./Sessions');
var Host = require('./Host');
var IdentifierUtility = require('./IdentifierUtility');
var constants = require('./Constants');
var messageFactory = require('./MessageFactory');
var roomNameFactory = require('./RoomNameFactory');
var io;
var sessions;
var idUtility = new IdentifierUtility();
var isDebug = false;
var messageConstants = constants.socketMessageNames;

exports.listen = function(server) {
    sessions = new Sessions();
    exports.sessions = sessions;

    io = socketIo.listen(server);
    if (isDebug) {
        var socketIoWildcard = require('socketio-wildcard')();
        io.use(socketIoWildcard);
    }

    io.on('connection', function(socket) {
        if (isDebug){
            console.log('A new client with id `' + socket.id + '` has connected');
        }

        // Only active when isDebug is true
        socket.on('*', function(message) {
            console.log('Inbound `' + message.data[0] +
                '` from client. Message `' + JSON.stringify(message.data[1]) +
                '`');
        });

        socket.on(messageConstants.CREATE_SESSION, createSessionMessageHandler);
        socket.on(messageConstants.REJOIN_SESSION, rejoinSessionMessageHandler);

    });
};

function updateObservers(session) {
    var message = messageFactory.create(messageConstants.OBSERVER_UPDATE);
    message.populate(session);
    io.sockets.in(roomNameFactory.observers(session.id)).emit(messageConstants.OBSERVER_UPDATE, message);
}

exports.updateObservers = updateObservers;

function createSessionMessageHandler(data, response) {
    var host = new Host();
    host.id = idUtility.generateParticipantId();

    var requestMessage = messageFactory.restore(data, messageConstants.CREATE_SESSION);
    var session = sessions.add(host, requestMessage.settings);

    var responseMessage = messageFactory.create(messageConstants.CREATE_SESSION_RESPONSE);
    responseMessage.sessionId = session.id;
    responseMessage.hostId = session.host.id;

    this.join(roomNameFactory.host(session.id));
    this.join(roomNameFactory.observers(session.id));

    response(responseMessage);
}

function rejoinSessionMessageHandler(data, response) {
    var requestMessage = messageFactory.restore(data, messageConstants.REJOIN_SESSION);
    var session = sessions.getById(requestMessage.sessionId);
    var errorMessage = messageFactory.create(messageConstants.ERROR);
    var successMessage = messageFactory.create(messageConstants.SUCCESS);

    if (!session) { // TODO || session.isSessionCompleted)
        errorMessage.error = 'Session could not be found or is completed.';
        response(errorMessage);
        return;
    }

    switch (requestMessage.rejoinAs) {
        case constants.rejoinAs.HOST:
            if (session.host.id !== requestMessage.participantId) {
                errorMessage.error = 'Could not rejoin as host, as you\'re not the host!';
                response(errorMessage);
                return;
            }
            this.join(roomNameFactory.host(session.id));
            this.join(roomNameFactory.observers(session.id));
            break;
        case constants.rejoinAs.CONTESTANT:
            if (!session.contestants.find(function(c) {
                    return c.id === requestMessage.participantId;
                })) {
                errorMessage.error = 'Could not rejoin a contestant, as you\'re not a contestant!';
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
            errorMessage.error = 'Could not rejoin as join as constant is unknown';
            response(errorMessage);
            break;
    }

    response(successMessage);

    // Update the observers (helps rejoin populate UI)
    updateObservers(session);
}

//var MessageFactory = require('./MessageFactory');

//var BuzzerError = require('./BuzzerError');

//var Games = require('./Games');
//var Game = require('./Game');
//@todo add other state related objects here as written

//Declare the socket.io object globally within the module
//var io;

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
