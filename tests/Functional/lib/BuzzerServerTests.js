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

    describe('contestant', function() {
        describe('join', function() {
            describe('as individual', function() {
                it('should allow when request is valid', function(){

                });
                it('should not allow when session is full', function(){

                });
                it('should not allow when session does not exist', function(){

                });
                it('should not allow when session is completed', function(){
                    // TODO
                });
            });
            describe('with teams', function() {
                // TODO
            });
        });
    });

    describe('observer', function() {
        describe('rejoin', function() {
            it('should allow when request is valid and subscribe observer to the observer room', function(done) {
                var settings = new Settings();
                settings.maxContestants = 5;

                var client = helper.createClient();
                helper.createSession(settings, client, function(responseMessage) {
                    var observerClient = helper.createClient();

                    // Rejoin
                    var rejoinMessage = messageFactory.create(messageConstants.REJOIN_SESSION);
                    rejoinMessage.sessionId = responseMessage.sessionId;
                    rejoinMessage.participantId = responseMessage.hostId;
                    rejoinMessage.rejoinAs = constants.rejoinAs.OBSERVER;

                    // list for observer update
                    observerClient.on(messageConstants.OBSERVER_UPDATE, function(
                        message) {
                        var observerMessage = messageFactory.restore(message,
                            messageConstants.OBSERVER_UPDATE);
                        observerMessage.should.not.be.null();
                        done();
                    });

                    observerClient.emit(messageConstants.REJOIN_SESSION, rejoinMessage,
                        function(data) {
                            data.type.should.equal(messageConstants.SUCCESS);
                            // force observer update
                            helper.forceObserveUpdate(responseMessage.sessionId);
                        });
                });
            });
            it('should not allow when session does not exist', function(done) {
                var settings = new Settings();
                settings.maxContestants = 5;

                var client = helper.createClient();
                helper.createSession(settings, client, function(responseMessage) {
                    var observerClient = helper.createClient();

                    // Rejoin
                    var rejoinMessage = messageFactory.create(messageConstants.REJOIN_SESSION);
                    rejoinMessage.sessionId = idUtility.generateSessionId();
                    rejoinMessage.participantId = responseMessage.hostId;
                    rejoinMessage.rejoinAs = constants.rejoinAs.OBSERVER;

                    observerClient.emit(messageConstants.REJOIN_SESSION, rejoinMessage,
                        function(message) {
                            var errorMessage = messageFactory.restore(message,
                                messageConstants.ERROR);
                            errorMessage.should.not.be.null();
                            errorMessage.error.should.containEql(
                                'Session could not be found');
                            done();
                        });
                });
            });
            it('should not allow when session is completed', function(){
                // TODO
            });
        });
    });

    describe('host', function() {
        describe('create', function() {
            describe('session', function() {
                it('should allow when request is valid and create a session', function(done) {
                    helper.clearGameState();

                    var settings = new Settings();
                    settings.maxContestants = 5;

                    var createSessionMessage = messageFactory.create(messageConstants.CREATE_SESSION);
                    createSessionMessage.settings = settings;

                    var client = helper.createClient();
                    client.emit(messageConstants.CREATE_SESSION, createSessionMessage,
                        function(message) {
                            message.should.be.Object();
                            message.type.should.equal(messageConstants.CREATE_SESSION_RESPONSE);

                            helper.sessions.all.length.should.equal(1);
                            var session = helper.sessions.all.pop();

                            var responseMessage = messageFactory.restore(message,
                                messageConstants.CREATE_SESSION_RESPONSE);
                            responseMessage.sessionId.should.equal(session.id);
                            responseMessage.hostId.should.equal(session.host.id);

                            done();
                        });
                });
                it('should subscribe host to the observer room', function(done) {
                    var settings = new Settings();
                    settings.maxContestants = 5;

                    var client = helper.createClient();

                    // list for observer update
                    client.on(messageConstants.OBSERVER_UPDATE, function(message) {
                        var observerMessage = messageFactory.restore(message,
                            messageConstants.OBSERVER_UPDATE);
                        observerMessage.should.not.be.null();
                        done();
                    });

                    helper.createSession(settings, client, function(responseMessage) {
                        responseMessage.should.not.be.null();
                        // force observer update
                        helper.forceObserveUpdate(responseMessage.sessionId);
                    });
                });
            });
        });
        describe('rejoin', function() {
            describe('session', function() {
                it('should allow when request is valid', function(done) {
                    var settings = new Settings();
                    settings.maxContestants = 5;

                    var client = helper.createClient();
                    helper.createSession(settings, client, function(responseMessage) {
                        client.disconnect();
                        client = helper.createClient();

                        // Rejoin
                        var rejoinMessage = messageFactory.create(messageConstants.REJOIN_SESSION);
                        rejoinMessage.sessionId = responseMessage.sessionId;
                        rejoinMessage.participantId = responseMessage.hostId;
                        rejoinMessage.rejoinAs = constants.rejoinAs.HOST;

                        client.emit(messageConstants.REJOIN_SESSION, rejoinMessage,
                            function(data) {
                                data.type.should.equal(messageConstants.SUCCESS);
                                done();
                            });
                    });
                });
                it('should subscribe host to observer room', function(done) {
                    var settings = new Settings();
                    settings.maxContestants = 5;

                    var client = helper.createClient();
                    helper.createSession(settings, client, function(responseMessage) {
                        client.disconnect();
                        client = helper.createClient();

                        // Rejoin
                        var rejoinMessage = messageFactory.create(messageConstants.REJOIN_SESSION);
                        rejoinMessage.sessionId = responseMessage.sessionId;
                        rejoinMessage.participantId = responseMessage.hostId;
                        rejoinMessage.rejoinAs = constants.rejoinAs.HOST;

                        // list for observer update
                        client.on(messageConstants.OBSERVER_UPDATE, function(
                            message) {
                            var observerMessage = messageFactory.restore(message,
                                messageConstants.OBSERVER_UPDATE);
                            observerMessage.should.not.be.null();
                            done();
                        });

                        client.emit(messageConstants.REJOIN_SESSION, rejoinMessage,
                            function(data) {
                                data.type.should.equal(messageConstants.SUCCESS);
                                // force observer update
                                helper.forceObserveUpdate(responseMessage.sessionId);
                            });
                    });
                });
                it('should not allowed when host id is invalid', function(done) {
                    var settings = new Settings();
                    settings.maxContestants = 5;

                    var client = helper.createClient();
                    helper.createSession(settings, client, function(responseMessage) {
                        client.disconnect();
                        client = helper.createClient();

                        // Rejoin
                        var rejoinMessage = messageFactory.create(messageConstants.REJOIN_SESSION);
                        rejoinMessage.sessionId = responseMessage.sessionId;
                        rejoinMessage.participantId = idUtility.generateParticipantId();
                        rejoinMessage.rejoinAs = constants.rejoinAs.HOST;

                        client.emit(messageConstants.REJOIN_SESSION, rejoinMessage,
                            function(message) {
                                var errorMessage = messageFactory.restore(message,
                                    messageConstants.ERROR);
                                errorMessage.should.not.be.null();
                                errorMessage.error.should.containEql(
                                    'Could not rejoin as host');
                                done();
                            });
                    });
                });
                it('should not allow when session does not exist', function(done) {
                    var settings = new Settings();
                    settings.maxContestants = 5;

                    var client = helper.createClient();
                    helper.createSession(settings, client, function(responseMessage) {
                        client.disconnect();
                        client = helper.createClient();

                        // Rejoin
                        var rejoinMessage = messageFactory.create(messageConstants.REJOIN_SESSION);
                        rejoinMessage.sessionId = idUtility.generateSessionId();
                        rejoinMessage.participantId = responseMessage.hostId;
                        rejoinMessage.rejoinAs = constants.rejoinAs.HOST;

                        client.emit(messageConstants.REJOIN_SESSION, rejoinMessage,
                            function(message) {
                                var errorMessage = messageFactory.restore(message,
                                    messageConstants.ERROR);
                                errorMessage.should.not.be.null();
                                errorMessage.error.should.containEql(
                                    'Session could not be found');
                                done();
                            });
                    });
                });
                it('should not allow when session is completed', function(){
                    // TODO
                });                
            });
        });
    });
});
