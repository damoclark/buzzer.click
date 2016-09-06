/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var io = require('socket.io-client');
var console = require('console');

var http = require('http');
var BuzzerServer = require('../../../lib/BuzzerServer');
var Settings = require('../../../lib/Settings');
var messageFactory = require('../../../lib/MessageFactory');
var constants = require('../../../lib/constants');

var url = 'http://127.0.0.1:3001';
var server = null;
var clients = [];
var sessions = null;
var createClient = function() {
    return clients[clients.push(io(url)) - 1];
};

describe('Host', function() {
    this.timeout(15000);
    before(function() {
        server = http.createServer();
        BuzzerServer.listen(server);
        server.listen('3001');
        sessions = exports.sessions;
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
    describe('game', function() {
        describe('create', function() {
            it('for session with max players', function(done) {
                var settings = new Settings();
                settings.maxContestants = 5;

                var createSessionMessage = messageFactory.create(constants.socketMessageNames.CREATE_SESSION_MESSAGE);
                createSessionMessage.settings = settings;

                var client = createClient();
                client.emit(constants.socketMessageNames.CREATE_SESSION_MESSAGE,
                    createSessionMessage,
                    function(response) {
                        console.log('Server replied with ' + response);
                        done();
                    });
            });
            it('test', function(done) {
                var client = createClient();
                client.on('connect', function() {
                    console.log(
                        'The client has connected to server'
                    );
                });
                client.emit('client message',
                    'Hello server from client',
                    function(response) {
                        console.log('Server replied with ' +
                            response);
                    });
                client.on('server message', function(data) {
                    console.log(
                        'The server sent message of ' +
                        data);
                    done();
                });
            });
        });
    });
});
