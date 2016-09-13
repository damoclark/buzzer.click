/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var Settings = require('../../../lib/Settings');
var messageFactory = require('../../../lib/MessageFactory');
var constants = require('../../../lib/constants');
var messageConstants = constants.socketMessageNames;
var helper = require('./ServerTestHelper');
var idUtility = require('../../../lib/IdentifierUtility');

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
                it('should allow when request is valid', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(s, hc, function(rm) {
                        var cc = helper.createClient();

                        // Join
                        var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                        rqm.sessionId = rm.sessionId;
                        rqm.username = 'Test Person';

                        cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                            var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);
                            rm.should.not.be.null();
                            rm.wasSuccessful.should.be.true();
                            done();
                        });
                    });
                });
                it('should not allow when session is full', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(s, hc, function(responseMessage) {
                        var cc1 = helper.createClient();
                        var cc2 = helper.createClient();

                        // Join
                        var rm1 = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                        rm1.sessionId = responseMessage.sessionId;
                        rm1.username = 'TP1';
                        var rm2 = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                        rm2.sessionId = responseMessage.sessionId;
                        rm2.username = 'TP2';

                        // Contestant 1 join
                        cc1.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rm1, function(m1) {
                            var rm1 = messageFactory.restore(m1, messageConstants.CONTESTANT_JOIN_RESPONSE);
                            rm1.wasSuccessful.should.be.true();

                            // Contestant 2 join
                            cc2.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rm2,
                                function(m2) {
                                    var rm2 = messageFactory.restore(m2,
                                        messageConstants.CONTESTANT_JOIN_RESPONSE
                                    );
                                    rm2.wasSuccessful.should.be.false();
                                    rm2.failedRequestReason.should.equal(
                                        constants.messages.MAXIMUM_SESSION_SIZED_REACHED
                                    );
                                    done();
                                });
                        });
                    });
                });
                it('should subscribe contests to contestant room', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(s, hc, function(rm) {
                        var cc = helper.createClient();
                        var sessionId = rm.sessionId;

                        // Join
                        var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                        rqm.sessionId = sessionId;
                        rqm.username = 'Test Person';
                        
                        // list for Contestant update
                        cc.on('testMessage', function(m) {
                            m.should.equal('test');
                            done();
                        });

                        cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                            var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);
                            rm.should.not.be.null();
                            rm.wasSuccessful.should.be.true();
                            helper.sendMessageToContestants(sessionId,
                                'testMessage', 'test');
                        });
                    });
                });
                it('should subscribe contests to observer room', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(s, hc, function(rm) {
                        var cc = helper.createClient();
                        var sessionId = rm.sessionId;

                        // Join
                        var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                        rqm.sessionId = sessionId;
                        rqm.username = 'Test Person';

                        // list for observer update
                        cc.on(messageConstants.OBSERVER_UPDATE, function(m) {
                            var om = messageFactory.restore(m, messageConstants.OBSERVER_UPDATE);
                            om.should.not.be.null();
                            done();
                        });

                        cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                            var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);
                            rm.should.not.be.null();
                            rm.wasSuccessful.should.be.true();
                            helper.forceObserveUpdate(sessionId);
                        });
                    });
                });
                it('should not allow when session does not exist', function() {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(s, hc, function() {
                        var cc = helper.createClient();

                        // Join
                        var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                        rqm.sessionId = idUtility.generateSessionId();
                        rqm.username = 'Test Person';

                        cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                            var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);
                            rm.should.not.be.null();
                            rm.wasSuccessful.should.be.false();
                            rm.failedRequestReason.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                            done();
                        });
                    });
                });
                it('should not allow when session is completed', function() {
                    // TODO
                });
                it('should not allow when username is taken', function(done) {
                    var s = new Settings();
                    s.maxContestants = 2;

                    var hc = helper.createClient();
                    helper.createSession(s, hc, function(rm) {
                        var sessionId = rm.sessionId;
                        var cc1 = helper.createClient();

                        helper.contestantJoin(cc1, 'username', sessionId, function() {
                            var cc2 = helper.createClient();

                            // Join
                            var rm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                            rm.sessionId = sessionId;
                            rm.username = 'username';

                            cc2.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rm,
                                function(message) {
                                    var responseMessage = messageFactory.restore(
                                        message, messageConstants.CONTESTANT_JOIN_RESPONSE
                                    );
                                    responseMessage.should.not.be.null();
                                    responseMessage.wasSuccessful.should.be.false();
                                    responseMessage.failedRequestReason.should.equal(
                                        constants.messages.USERNAME_TAKEN);
                                    done();
                                });
                        });
                    });
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
                var s = new Settings();
                s.maxContestants = 5;

                var c = helper.createClient();
                helper.createSession(s, c, function(rm) {
                    var oc = helper.createClient();

                    // Rejoin
                    var rjm = messageFactory.create(messageConstants.REJOIN_SESSION);
                    rjm.sessionId = rm.sessionId;
                    rjm.participantId = rm.hostId;
                    rjm.rejoinAs = constants.rejoinAs.OBSERVER;

                    // list for observer update
                    oc.on(messageConstants.OBSERVER_UPDATE, function(message) {
                        var ob = messageFactory.restore(message, messageConstants.OBSERVER_UPDATE);
                        ob.should.not.be.null();
                        done();
                    });
                    
                    oc.emit(messageConstants.REJOIN_SESSION, rjm, function(data) {
                        data.type.should.equal(messageConstants.SUCCESS);
                        // force observer update
                        helper.forceObserveUpdate(rm.sessionId);
                    });
                });
            });
            it('should not allow when session does not exist', function(done) {
                var s = new Settings();
                s.maxContestants = 5;
                var c = helper.createClient();
                helper.createSession(s, c, function(rm) {
                    var ob = helper.createClient();
                    // Rejoin
                    var rjm = messageFactory.create(messageConstants.REJOIN_SESSION);
                    rjm.sessionId = idUtility.generateSessionId();
                    rjm.participantId = rm.hostId;
                    rjm.rejoinAs = constants.rejoinAs.OBSERVER;
                    ob.emit(messageConstants.REJOIN_SESSION, rjm, function(m) {
                        var em = messageFactory.restore(m, messageConstants.ERROR);
                        em.should.not.be.null();
                        em.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                        done();
                    });
                });
            });
            it('should not allow when session is completed', function() {
                // TODO
            });
        });
    });

    describe('host', function() {
        describe('create', function() {
            describe('session', function() {
                it('should allow when request is valid and create a session', function(done) {
                    helper.clearGameState();
                    var s = new Settings();
                    s.maxContestants = 5;

                    var csm = messageFactory.create(messageConstants.CREATE_SESSION);
                    csm.settings = s;

                    var c = helper.createClient();
                    c.emit(messageConstants.CREATE_SESSION, csm, function(m) {
                        m.should.be.Object();
                        m.type.should.equal(messageConstants.CREATE_SESSION_RESPONSE);
                        helper.sessions.all.length.should.equal(1);
                        var session = helper.sessions.all.pop();
                        var rsm = messageFactory.restore(m, messageConstants.CREATE_SESSION_RESPONSE);
                        rsm.sessionId.should.equal(session.id);
                        rsm.hostId.should.equal(session.host.id);
                        done();
                    });
                });
                it('should subscribe host to the observer room', function(done) {
                    var s = new Settings();
                    s.maxContestants = 5;

                    var c = helper.createClient();

                    // list for observer update
                    c.on(messageConstants.OBSERVER_UPDATE, function(m) {
                        var om = messageFactory.restore(m, messageConstants.OBSERVER_UPDATE);
                        om.should.not.be.null();
                        done();
                    });
                    
                    helper.createSession(s, c, function(rm) {
                        rm.should.not.be.null();
                        // force observer update
                        helper.forceObserveUpdate(rm.sessionId);
                    });
                });
            });
        });
        describe('rejoin', function() {
            describe('session', function() {
                it('should allow when request is valid', function(done) {
                    var s = new Settings();
                    s.maxContestants = 5;

                    var c = helper.createClient();
                    helper.createSession(s, c, function(rm) {
                        c.disconnect();
                        c = helper.createClient();

                        // Rejoin
                        var rjm = messageFactory.create(messageConstants.REJOIN_SESSION);
                        rjm.sessionId = rm.sessionId;
                        rjm.participantId = rm.hostId;
                        rjm.rejoinAs = constants.rejoinAs.HOST;

                        c.emit(messageConstants.REJOIN_SESSION, rjm, function(data) {
                            data.type.should.equal(messageConstants.SUCCESS);
                            done();
                        });
                    });
                });
                it('should subscribe host to observer room', function(done) {
                    var s = new Settings();
                    s.maxContestants = 5;

                    var c = helper.createClient();
                    helper.createSession(s, c, function(rm) {
                        c.disconnect();
                        c = helper.createClient();

                        // Rejoin
                        var rjm = messageFactory.create(messageConstants.REJOIN_SESSION);
                        rjm.sessionId = rm.sessionId;
                        rjm.participantId = rm.hostId;
                        rjm.rejoinAs = constants.rejoinAs.HOST;

                        // list for observer update
                        c.on(messageConstants.OBSERVER_UPDATE, function(m) {
                            var om = messageFactory.restore(m, messageConstants.OBSERVER_UPDATE);
                            om.should.not.be.null();
                            done();
                        });

                        c.emit(messageConstants.REJOIN_SESSION, rjm, function(data) {
                            data.type.should.equal(messageConstants.SUCCESS);
                        });
                    });
                });
                it('should not allowed when host id is invalid', function(done) {
                    var s = new Settings();
                    s.maxContestants = 5;

                    var c = helper.createClient();
                    helper.createSession(s, c, function(rm) {
                        c.disconnect();
                        c = helper.createClient();

                        // Rejoin
                        var rjm = messageFactory.create(messageConstants.REJOIN_SESSION);
                        rjm.sessionId = rm.sessionId;
                        rjm.participantId = idUtility.generateParticipantId();
                        rjm.rejoinAs = constants.rejoinAs.HOST;

                        c.emit(messageConstants.REJOIN_SESSION, rjm, function(m) {
                            var em = messageFactory.restore(m, messageConstants.ERROR);
                            em.should.not.be.null();
                            em.error.should.equal(constants.messages.COULD_NOT_REJOIN_NOT_HOST);
                            done();
                        });
                    });
                });
                it('should not allow when session does not exist', function(done) {
                    var s = new Settings();
                    s.maxContestants = 5;

                    var c = helper.createClient();
                    helper.createSession(s, c, function(rm) {
                        c.disconnect();
                        c = helper.createClient();

                        // Rejoin
                        var rjm = messageFactory.create(messageConstants.REJOIN_SESSION);
                        rjm.sessionId = idUtility.generateSessionId();
                        rjm.participantId = rm.hostId;
                        rjm.rejoinAs = constants.rejoinAs.HOST;

                        c.emit(messageConstants.REJOIN_SESSION, rjm, function(m) {
                            var rm = messageFactory.restore(m, messageConstants.ERROR);
                            rm.should.not.be.null();
                            rm.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                            done();
                        });
                    });
                });
                it('should not allow when session is completed', function() {
                    // TODO
                });
            });
        });
        describe('complete', function() {
            describe('session', function() {
                it('should allow when request is valid', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(s, hc, function(rm) {
                        var scm = messageFactory.create(messageConstants.SESSION_COMPLETE);
                        scm.sessionId = rm.sessionId;
                        scm.hostId = rm.hostId;
                        
                        hc.emit(messageConstants.SESSION_COMPLETE, scm, function(m) {
                            var rm = messageFactory.restore(m, messageConstants.SUCCESS);
                            rm.should.not.be.null();
                            done();
                        });
                    });
                });
                it('should not allow when host id is invalid', function() {
                    // TODO
                });
                it('should not allow when session id is invalid', function() {
                    // TODO
                });
                it('should not allow when session is already completed', function() {
                    // TODO
                });
                it('should notify observers', function() {
                    // var settings = new Settings();
                    // settings.maxContestants = 1;
                    // var hostClient = helper.createClient();
                    // helper.createSession(settings, hostClient, function(responseMessage) {
                    //     var contestantClient = helper.createClient();
                    //     helper.contestantJoin(contestantClient, 'user1', responseMessage.sessionId, function() {
                    //         done();
                    //     });
                    // });
                });
            });
        });
    });
});
