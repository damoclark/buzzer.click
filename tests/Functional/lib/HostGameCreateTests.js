/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var io = require('socket.io-client');
var console = require('console');
var http = require('http');
var socketIoWildcardPatch = require('socketio-wildcard')(io.Manager);
var BuzzerServer = require('../../../lib/BuzzerServer');
var Settings = require('../../../lib/Settings');
var messageFactory = require('../../../lib/MessageFactory');
var constants = require('../../../lib/constants');
var messageConstants = constants.socketMessageNames;

var url = 'http://127.0.0.1:3001';
var server = null;
var clients = [];
var sessions = null;
var createClient = function() {
    var socket = io(url);
    socketIoWildcardPatch(socket);
    socket.on('*', function(message) {
        console.log('Inbound `' + message.data[0] + '` from server. Message `' + JSON.stringify(message.data[1]) + '`');
    });
    return clients[clients.push(socket) - 1];
};

describe('Host', function() {
    this.timeout(15000);
    before(function() {
        server = http.createServer();
        BuzzerServer.listen(server);
        server.listen('3001');
        sessions = BuzzerServer.sessions;
    });
    after(function() {
        if (server) {
            server.close();
        }
    });
    afterEach(function() {
        for (var i = 0; i < clients.length; i++) {
            clients[i].disconnect();
        }
        clients = [];
    });
    describe('session', function() {
        describe('create', function() {
            it('should create a session', function(done) {
                var settings = new Settings();
                settings.maxContestants = 5;

                var createSessionMessage = messageFactory.create(constants.socketMessageNames.CREATE_SESSION_MESSAGE);
                createSessionMessage.settings = settings;

                var client = createClient();
                client.emit(constants.socketMessageNames.CREATE_SESSION_MESSAGE, createSessionMessage,
                    function(data) {
                        data.should.be.Object();
                        data.type.should.equal(messageConstants.CREATE_SESSION_RESPONSE_MESSAGE);

                        sessions.all.length.should.equal(1);
                        var session = sessions.all.pop();

                        var message = messageFactory.restore(messageConstants.CREATE_SESSION_RESPONSE_MESSAGE,
                            data);
                        message.sessionId.should.equal(session.id);
                        message.hostId.should.equal(session.host.id);

                        done();
                    });
            });
        });
    });
});
