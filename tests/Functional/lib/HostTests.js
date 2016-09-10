/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var Settings = require('../../../lib/Settings');
var messageFactory = require('../../../lib/MessageFactory');
var constants = require('../../../lib/constants');
var messageConstants = constants.socketMessageNames;
var helper = require('./ServerTestHelper');
var IdentifierUtility = require('../../../lib/IdentifierUtility');
var idUtility = new IdentifierUtility();

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
                        function(message) {
                            message.should.be.Object();
                            message.type.should.equal(messageConstants.CREATE_SESSION_RESPONSE_MESSAGE);

                            helper.sessions.all.length.should.equal(1);
                            var session = helper.sessions.all.pop();

                            var responseMessage = messageFactory.restore(message,
                                messageConstants.CREATE_SESSION_RESPONSE_MESSAGE);
                            responseMessage.sessionId.should.equal(session.id);
                            responseMessage.hostId.should.equal(session.host.id);

                            done();
                        });
                });
                it('should subscribe host to observer room', function(done) {
                    var settings = new Settings();
                    settings.maxContestants = 5;

                    var client = helper.createClient();

                    client.on(messageConstants.OBSERVER_UPDATE_MESSAGE, function(message) {
                        var observerMessage = messageFactory.restore(message,
                            messageConstants.OBSERVER_UPDATE_MESSAGE);
                        observerMessage.should.not.be.null();
                        done();
                    });

                    helper.createSession(settings, client, function(responseMessage) {
                        responseMessage.should.not.be.null();

                        helper.forceObserveUpdate(responseMessage.sessionId);
                    });
                });
            });
        });
        describe('rejoin', function() {
            describe('session', function() {
                it('when valid is allowed', function(done) {
                    var settings = new Settings();
                    settings.maxContestants = 5;

                    var client = helper.createClient();
                    helper.createSession(settings, client, function(responseMessage) {
                        client.disconnect();
                        client = helper.createClient();

                        // Rejoin
                        var rejoinMessage = messageFactory.create(messageConstants.REJOIN_SESSION_MESSAGE);
                        rejoinMessage.sessionId = responseMessage.sessionId;
                        rejoinMessage.participantId = responseMessage.hostId;
                        rejoinMessage.rejoinAs = constants.rejoinAs.HOST;

                        client.emit(messageConstants.REJOIN_SESSION_MESSAGE, rejoinMessage,
                            function(data) {
                                data.type.should.equal(messageConstants.SUCCESS_MESSAGE);
                                done();
                            });
                    });
                });
                it('when host id is invalid is not allowed', function(done) {
                    var settings = new Settings();
                    settings.maxContestants = 5;

                    var client = helper.createClient();
                    helper.createSession(settings, client, function(responseMessage) {
                        client.disconnect();
                        client = helper.createClient();

                        // Rejoin
                        var rejoinMessage = messageFactory.create(messageConstants.REJOIN_SESSION_MESSAGE);
                        rejoinMessage.sessionId = responseMessage.sessionId;
                        rejoinMessage.participantId = idUtility.generateParticipantId();
                        rejoinMessage.rejoinAs = constants.rejoinAs.HOST;

                        client.emit(messageConstants.REJOIN_SESSION_MESSAGE, rejoinMessage,
                            function(message) {
                                var errorMessage = messageFactory.restore(message,
                                    messageConstants.ERROR_MESSAGE);
                                errorMessage.should.not.be.null();
                                errorMessage.error.should.containEql(
                                    'Could not rejoin as host');
                                done();
                            });
                    });
                });
                it('when session is is invalid is not allowed', function(done) {
                    var settings = new Settings();
                    settings.maxContestants = 5;

                    var client = helper.createClient();
                    helper.createSession(settings, client, function(responseMessage) {
                        client.disconnect();
                        client = helper.createClient();

                        // Rejoin
                        var rejoinMessage = messageFactory.create(messageConstants.REJOIN_SESSION_MESSAGE);
                        rejoinMessage.sessionId = idUtility.generateSessionId();
                        rejoinMessage.participantId = responseMessage.hostId;
                        rejoinMessage.rejoinAs = constants.rejoinAs.HOST;

                        client.emit(messageConstants.REJOIN_SESSION_MESSAGE, rejoinMessage,
                            function(message) {
                                var errorMessage = messageFactory.restore(message,
                                    messageConstants.ERROR_MESSAGE);
                                errorMessage.should.not.be.null();
                                errorMessage.error.should.containEql(
                                    'Session could not be found');
                                done();
                            });
                    });
                });
            });
        });
    });
});
