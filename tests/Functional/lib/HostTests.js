/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var Settings = require('../../../lib/Settings');
var messageFactory = require('../../../lib/MessageFactory');
var constants = require('../../../lib/constants');
var messageConstants = constants.socketMessageNames;
var helper = require('./ServerTestHelper');

describe('Buzzer server', function() {
    this.timeout(15000);
    before(function() {
        helper.startServer();
    });
    after(function() {
        helper.stopServer();
    });
    afterEach(function() {
        helper.closeClients();
    });

    describe('contestant join session', function() {

    });

    describe('host', function() {
        describe('create', function() {
            describe('session', function() {
                it('should create a session', function(done) {
                    var settings = new Settings();
                    settings.maxContestants = 5;

                    var createSessionMessage = messageFactory.create(messageConstants.CREATE_SESSION_MESSAGE);
                    createSessionMessage.settings = settings;

                    var client = helper.createClient();
                    client.emit(messageConstants.CREATE_SESSION_MESSAGE, createSessionMessage,
                        function(data) {
                            data.should.be.Object();
                            data.type.should.equal(messageConstants.CREATE_SESSION_RESPONSE_MESSAGE);

                            helper.sessions.all.length.should.equal(1);
                            var session = helper.sessions.all.pop();

                            var message = messageFactory.restore(data, messageConstants.CREATE_SESSION_RESPONSE_MESSAGE);
                            message.sessionId.should.equal(session.id);
                            message.hostId.should.equal(session.host.id);

                            done();
                        });
                });
            });
        });
        describe('rejoin', function() {
            describe('session', function() {
                it('should allow it', function(done) {
                    var settings = new Settings();
                    settings.maxContestants = 5;

                    var client = helper.createClient();

                    helper.createSession(settings, client, function(responseMessage) {
                        client.disconnect();
                        client = helper.createClient();

                        var rejoinMessage = messageFactory.create(messageConstants.REJOIN_SESSION_MESSAGE);
                        rejoinMessage.sessionId = responseMessage.sessionId;
                        rejoinMessage.participantId = responseMessage.hostId;
                        rejoinMessage.rejoinAs = constants.rejoinAs.HOST;

                        client.emit(messageConstants.REJOIN_SESSION_MESSAGE, rejoinMessage, function(data) {
                            data.type.should.equal(messageConstants.SUCCESS_MESSAGE);
                            done();
                        });
                    });
                });
            });
        });
    });
});
