var io = require('socket.io-client');
var console = require('console');
var http = require('http');
var socketIoWildcardPatch = require('socketio-wildcard')(io.Manager);
var BuzzerServer = require('../../../lib/BuzzerServer');
var messageFactory = require('../../../lib/MessageFactory');
var constants = require('../../../lib/constants');
var messageConstants = constants.socketMessageNames;
var isDebug = false;

/**
 * Server test helper
 * @module server test helper
 */

/**
 * Represents a server test helper.
 * @public
 * @constructor
 */
function ServerTestHelper() {

}

/**
 * Prototype name
 */
ServerTestHelper.prototype.type = 'ServerTestHelper';

ServerTestHelper.prototype.serverUrl = 'http://127.0.0.1:3001';

ServerTestHelper.prototype.server = null;

ServerTestHelper.prototype.clients = [];

ServerTestHelper.prototype.sessions = null;

ServerTestHelper.prototype.createClient = function() {
    var socket = io(this.serverUrl);
    if (isDebug) {
        socketIoWildcardPatch(socket);
        socket.on('*', function(message) {
            console.log('Inbound `' + message.data[0] + '` from server. Message `' + JSON.stringify(message.data[1]) + '`');
        });
    }
    return this.clients[this.clients.push(socket) - 1];
};

ServerTestHelper.prototype.startServer = function() {
    this.server = http.createServer();
    BuzzerServer.listen(this.server);
    this.server.listen('3001');
    this.sessions = BuzzerServer.sessions;
};

ServerTestHelper.prototype.closeClients = function() {
    for (var i = 0; i < this.clients.length; i++) {
        this.clients[i].disconnect();
    }
    this.clients = [];
};

ServerTestHelper.prototype.stopServer = function() {
    this.closeClients();
    if (this.server) {
        this.server.close();
    }
    this.sessions = null;
};

ServerTestHelper.prototype.createSession = function(settings, client, afterCreateCallback) {
    var createSessionMessage = messageFactory.create(messageConstants.CREATE_SESSION_MESSAGE);
    createSessionMessage.settings = settings;

    client.emit(messageConstants.CREATE_SESSION_MESSAGE, createSessionMessage,
        function(data) {
            var response = messageFactory.restore(data, messageConstants.CREATE_SESSION_RESPONSE_MESSAGE);
            afterCreateCallback(response);
        });
};

ServerTestHelper.prototype.forceObserveUpdate = function(sessionId) {
    var sessions = BuzzerServer.sessions;
    var session = sessions.getById(sessionId);
    BuzzerServer.updateObservers(session);
};

var helper = new ServerTestHelper();

//Export the class
module.exports = helper;
