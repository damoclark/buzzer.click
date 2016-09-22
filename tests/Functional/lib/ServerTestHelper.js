/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
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

ServerTestHelper.prototype.clearGameState = function() {
    BuzzerServer.sessions._sessions = [];
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

ServerTestHelper.prototype.createSession = function(hc, settings, callback) {
    var csm = messageFactory.create(messageConstants.CREATE_SESSION);
    csm.settings = settings;

    hc.emit(messageConstants.CREATE_SESSION, csm, function(data) {
        var response = messageFactory.restore(data, messageConstants.CREATE_SESSION_RESPONSE);
        callback(response);
    });
};

ServerTestHelper.prototype.contestantJoin = function(cc, username, sessionId, callback) {
    callback = (typeof callback !== 'undefined') ? callback : function() {};
    var rm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
    rm.sessionId = sessionId;
    rm.username = username;

    cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rm, function(m) {
        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);
        rm.should.not.be.null();
        rm.wasSuccessful.should.be.true();
        callback(rm);
    });
};

ServerTestHelper.prototype.forceObserveUpdate = function(sessionId) {
    var sessions = BuzzerServer.sessions;
    var session = sessions.getById(sessionId);
    BuzzerServer.updateObservers(session);
};

ServerTestHelper.prototype.sendMessageToContestants = function(sessionId, messageName, message) {
    var sessions = BuzzerServer.sessions;
    var session = sessions.getById(sessionId);
    BuzzerServer.sendMessageToContestants(session, messageName, message);
};

ServerTestHelper.prototype.getLatestSession = function() {
    return this.sessions.all.pop();
};

ServerTestHelper.prototype.contestantBuzzerPress = function(cc, sessionId, contestantId, callback) {
    callback = (typeof callback !== 'undefined') ? callback : function() {};
    var bpm = messageFactory.create(messageConstants.CONTESTANT_BUZZER_PRESS);
    bpm.sessionId = sessionId;
    bpm.contestantId = contestantId;
    cc.emit(messageConstants.CONTESTANT_BUZZER_PRESS, bpm, function(rm) {
        if (rm.type === messageConstants.SUCCESS) {
            callback(messageFactory.restore(rm, messageConstants.SUCCESS));
        } else {
            callback(messageFactory.restore(rm, messageConstants.ERROR));
        }
    });
};

ServerTestHelper.prototype.hostBuzzerAction = function(hc, sessionId, hostId, action, callback) {
    callback = (typeof callback !== 'undefined') ? callback : function() {};
    var m = messageFactory.create(messageConstants.BUZZER_ACTION_COMMAND);
    m.hostId = hostId;
    m.sessionId = sessionId;
    m.action = action;
    hc.emit(messageConstants.BUZZER_ACTION_COMMAND, m, function(rm) {
        if (rm.type === messageConstants.SUCCESS) {
            callback(messageFactory.restore(rm, messageConstants.SUCCESS));
        } else {
            callback(messageFactory.restore(rm, messageConstants.ERROR));
        }
    });
};

var helper = new ServerTestHelper();

//Export the class
module.exports = helper;
