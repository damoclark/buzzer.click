/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var Settings = require('../../../lib/Settings');
var messageFactory = require('../../../lib/MessageFactory');
var successMessage = require('../../../lib/message/SuccessMessage');
var constants = require('../../../lib/constants');
var messageConstants = constants.socketMessageNames;
var helper = require('./ServerTestHelper');
var idUtility = require('../../../lib/IdentifierUtility');

describe('Buzzer server', function() {
    this.timeout(15000);
    before(function() {
        helper.startServer();
    });
    beforeEach(function() {
        helper.clearGameState();
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
                    helper.createSession(hc, s, function(rm) {
                        var cc = helper.createClient();

                        // Join
                        var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                        rqm.sessionId = rm.sessionId;
                        rqm.username = 'Test Person';

                        cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                            var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);
                            rm.should.not.be.null();
                            rm.wasSuccessful.should.be.true();
                            rm.contestantId.should.not.be.null();
                            done();
                        });
                    });
                });
                it('should update observers', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {

                        // listen for observer update
                        hc.on(messageConstants.OBSERVER_UPDATE, function(m) {
                            var om = messageFactory.restore(m, messageConstants.OBSERVER_UPDATE);
                            om.should.not.be.null();
                            om.gameState.contestants.length.should.equal(1);
                            om.gameState.contestants[0].username.should.equal(
                                'Test Person');
                            done();
                        });

                        var cc = helper.createClient();
                        helper.contestantJoin(cc, 'Test Person', rm.sessionId);
                    });
                });
                it('should not allow when session is full', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(responseMessage) {
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
                it('should subscribe contestant to contestant room', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {
                        var cc = helper.createClient();
                        var sessionId = rm.sessionId;

                        // Join
                        var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                        rqm.sessionId = sessionId;
                        rqm.username = 'Test Person';

                        // listen for Contestant update
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
                it('should subscribe contestant to observer room', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {
                        var cc = helper.createClient();
                        var sessionId = rm.sessionId;

                        // Join
                        var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                        rqm.sessionId = sessionId;
                        rqm.username = 'Test Person';

                        // listen for observer update
                        cc.on(messageConstants.OBSERVER_UPDATE, function(m) {
                            // Hack: this event may fire twice
                            helper.closeClients();
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
                it('should not allow when session does not exist', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function() {
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
                it('should not allow when session is completed', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {
                        var cc = helper.createClient();

                        helper.getLatestSession().complete();

                        // Join
                        var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                        rqm.sessionId = rm.sessionId;
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
                it('should not allow when username is taken', function(done) {
                    var s = new Settings();
                    s.maxContestants = 2;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {
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
        describe('buzzerPress', function() {
            it('should allow when state is ready', function(done) {
                var s = new Settings();
                s.maxContestants = 1;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var cc = helper.createClient();

                    helper.contestantJoin(cc, 'username', sessionId, function(rm) {
                        var bpm = messageFactory.create(messageConstants.CONTESTANT_BUZZER_PRESS);
                        bpm.sessionId = sessionId;
                        bpm.contestantId = rm.contestantId;

                        cc.emit(messageConstants.CONTESTANT_BUZZER_PRESS, bpm, function(m) {
                            var sm = messageFactory.restore(m, messageConstants.SUCCESS);
                            sm.should.not.be.null();
                            done();
                        });
                    });
                });
            });
            it('should ignore when state is not ready', function(done) {
                var s = new Settings();
                s.maxContestants = 2;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var cc1 = helper.createClient();

                    helper.contestantJoin(cc1, 'username1', sessionId, function(rm) {
                        var bpm = messageFactory.create(messageConstants.CONTESTANT_BUZZER_PRESS);
                        bpm.sessionId = sessionId;
                        bpm.contestantId = rm.contestantId;

                        cc1.emit(messageConstants.CONTESTANT_BUZZER_PRESS, bpm, function(m) {
                            var sm = messageFactory.restore(m, messageConstants.SUCCESS);
                            sm.should.not.be.null();

                            var cc2 = helper.createClient();

                            helper.contestantJoin(cc2, 'username2', sessionId,
                                function(rm) {
                                    var bpm = messageFactory.create(
                                        messageConstants.CONTESTANT_BUZZER_PRESS
                                    );
                                    bpm.sessionId = sessionId;
                                    bpm.contestantId = rm.contestantId;

                                    cc1.emit(messageConstants.CONTESTANT_BUZZER_PRESS,
                                        bpm,
                                        function(m) {
                                            var em = messageFactory.restore(
                                                m, messageConstants.ERROR
                                            );
                                            em.should.not.be.null();
                                            em.error.should.equal(constants
                                                .messages.BUZZER_PRESS_NOT_ACCEPTED
                                            );
                                            done();
                                        });
                                });
                        });
                    });
                });
            });
            it('should not allow when session is completed', function(done) {
                var s = new Settings();
                s.maxContestants = 1;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var cc = helper.createClient();

                    helper.contestantJoin(cc, 'username', sessionId, function(rm) {
                        var bpm = messageFactory.create(messageConstants.CONTESTANT_BUZZER_PRESS);
                        bpm.sessionId = sessionId;
                        bpm.contestantId = rm.contestantId;

                        helper.getLatestSession().complete();

                        cc.emit(messageConstants.CONTESTANT_BUZZER_PRESS, bpm, function(m) {
                            var sm = messageFactory.restore(m, messageConstants.ERROR);
                            sm.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                            done();
                        });
                    });
                });
            });
            it('should not allow when session does not exist', function(done) {
                var s = new Settings();
                s.maxContestants = 1;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var cc = helper.createClient();

                    helper.contestantJoin(cc, 'username', sessionId, function(rm) {
                        var bpm = messageFactory.create(messageConstants.CONTESTANT_BUZZER_PRESS);
                        bpm.sessionId = idUtility.generateSessionId();
                        bpm.contestantId = rm.contestantId;

                        cc.emit(messageConstants.CONTESTANT_BUZZER_PRESS, bpm, function(m) {
                            var sm = messageFactory.restore(m, messageConstants.ERROR);
                            sm.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                            done();
                        });
                    });
                });
            });
            it('should not allow when contestant does not exits', function(done) {
                var s = new Settings();
                s.maxContestants = 1;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var cc = helper.createClient();

                    helper.contestantJoin(cc, 'username', sessionId, function(rm) {
                        var bpm = messageFactory.create(messageConstants.CONTESTANT_BUZZER_PRESS);
                        bpm.sessionId = sessionId;
                        bpm.contestantId = idUtility.generateParticipantId();

                        cc.emit(messageConstants.CONTESTANT_BUZZER_PRESS, bpm, function(m) {
                            var sm = messageFactory.restore(m, messageConstants.ERROR);
                            sm.error.should.equal(constants.messages.COULD_NOT_ACCEPT_BUZZER_PRESS_NOT_CONTESTANT);
                            done();
                        });
                    });
                });
            });
        });
    });

    describe('observer', function() {
        describe('rejoin', function() {
            it('should allow when request is valid and subscribe observer to the observer room', function(done) {
                var s = new Settings();
                s.maxContestants = 5;

                var c = helper.createClient();
                helper.createSession(c, s, function(rm) {
                    var oc = helper.createClient();

                    // rejoin
                    var rjm = messageFactory.create(messageConstants.REJOIN_SESSION);
                    rjm.sessionId = rm.sessionId;
                    rjm.rejoinAs = constants.rejoinAs.OBSERVER;

                    // listen for observer update
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
                helper.createSession(c, s, function(rm) {
                    var ob = helper.createClient();

                    // rejoin
                    var rjm = messageFactory.create(messageConstants.REJOIN_SESSION);
                    rjm.sessionId = idUtility.generateSessionId();
                    rjm.rejoinAs = constants.rejoinAs.OBSERVER;

                    ob.emit(messageConstants.REJOIN_SESSION, rjm, function(m) {
                        var em = messageFactory.restore(m, messageConstants.ERROR);
                        em.should.not.be.null();
                        em.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                        done();
                    });
                });
            });
            it('should not allow when session is completed', function(done) {
                var s = new Settings();
                s.maxContestants = 5;

                var c = helper.createClient();
                helper.createSession(c, s, function(rm) {
                    var ob = helper.createClient();

                    helper.getLatestSession().complete();

                    // rejoin
                    var rjm = messageFactory.create(messageConstants.REJOIN_SESSION);
                    rjm.sessionId = idUtility.generateSessionId();
                    rjm.rejoinAs = constants.rejoinAs.OBSERVER;

                    ob.emit(messageConstants.REJOIN_SESSION, rjm, function(m) {
                        var em = messageFactory.restore(m, messageConstants.ERROR);
                        em.should.not.be.null();
                        em.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                        done();
                    });
                });
            });
        });
    });

    describe('host', function() {
        describe('create', function() {
            describe('session', function() {
                it('should allow when request is valid and create a session', function(done) {
                    var s = new Settings();
                    s.maxContestants = 5;

                    var csm = messageFactory.create(messageConstants.CREATE_SESSION);
                    csm.settings = s;

                    var c = helper.createClient();
                    c.emit(messageConstants.CREATE_SESSION, csm, function(m) {
                        m.should.be.Object();
                        m.type.should.equal(messageConstants.CREATE_SESSION_RESPONSE);
                        helper.sessions.all.length.should.equal(1);

                        var session = helper.getLatestSession();
                        session.complete();

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

                    // listen for observer update
                    c.on(messageConstants.OBSERVER_UPDATE, function(m) {
                        var om = messageFactory.restore(m, messageConstants.OBSERVER_UPDATE);
                        om.should.not.be.null();
                        done();
                    });

                    helper.createSession(c, s, function(rm) {
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
                    helper.createSession(c, s, function(rm) {
                        c.disconnect();
                        c = helper.createClient();

                        // rejoin
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
                    helper.createSession(c, s, function(rm) {
                        c.disconnect();
                        c = helper.createClient();

                        // rejoin
                        var rjm = messageFactory.create(messageConstants.REJOIN_SESSION);
                        rjm.sessionId = rm.sessionId;
                        rjm.participantId = rm.hostId;
                        rjm.rejoinAs = constants.rejoinAs.HOST;

                        // listen for observer update
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
                it('should not allow when host id is invalid', function(done) {
                    var s = new Settings();
                    s.maxContestants = 5;

                    var c = helper.createClient();
                    helper.createSession(c, s, function(rm) {
                        c.disconnect();
                        c = helper.createClient();

                        // rejoin
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
                    helper.createSession(c, s, function(rm) {
                        c.disconnect();
                        c = helper.createClient();

                        // rejoin
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
                it('should not allow when session is completed', function(done) {
                    var s = new Settings();
                    s.maxContestants = 5;

                    var c = helper.createClient();
                    helper.createSession(c, s, function(rm) {
                        c.disconnect();
                        c = helper.createClient();

                        helper.getLatestSession().complete();

                        // rejoin
                        var rjm = messageFactory.create(messageConstants.REJOIN_SESSION);
                        rjm.sessionId = rm.sessionId;
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
            });
        });
        describe('complete', function() {
            describe('session', function() {
                it('should allow when request is valid', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {
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
                it('should not allow when host id is invalid', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {
                        var scm = messageFactory.create(messageConstants.SESSION_COMPLETE);
                        scm.sessionId = rm.sessionId;
                        scm.hostId = idUtility.generateParticipantId();

                        hc.emit(messageConstants.SESSION_COMPLETE, scm, function(m) {
                            var rm = messageFactory.restore(m, messageConstants.ERROR);
                            rm.should.not.be.null();
                            rm.error.should.equal(constants.messages.COULD_NOT_COMPLETE_SESSION_NOT_HOST);
                            done();
                        });
                    });
                });
                it('should not allow when session id is invalid', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {
                        var scm = messageFactory.create(messageConstants.SESSION_COMPLETE);
                        scm.sessionId = idUtility.generateSessionId();
                        scm.hostId = rm.hostId;

                        hc.emit(messageConstants.SESSION_COMPLETE, scm, function(m) {
                            var rm = messageFactory.restore(m, messageConstants.ERROR);
                            rm.should.not.be.null();
                            rm.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                            done();
                        });
                    });
                });
                it('should not allow when session is already completed', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {

                        helper.getLatestSession().complete();

                        var scm = messageFactory.create(messageConstants.SESSION_COMPLETE);
                        scm.sessionId = rm.sessionId;
                        scm.hostId = rm.hostId;

                        hc.emit(messageConstants.SESSION_COMPLETE, scm, function(m) {
                            var rm = messageFactory.restore(m, messageConstants.ERROR);
                            rm.should.not.be.null();
                            rm.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                            done();
                        });
                    });
                });
                it('should notify observers', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {
                        var scm = messageFactory.create(messageConstants.SESSION_COMPLETE);
                        scm.sessionId = rm.sessionId;
                        scm.hostId = rm.hostId;

                        // listen for observer update
                        hc.on(messageConstants.OBSERVER_UPDATE, function(m) {
                            var om = messageFactory.restore(m, messageConstants.OBSERVER_UPDATE);
                            om.should.not.be.null();
                            done();
                        });

                        hc.emit(messageConstants.SESSION_COMPLETE, scm, function(m) {
                            var rm = messageFactory.restore(m, messageConstants.SUCCESS);
                            rm.should.not.be.null();
                        });
                    });
                });
            });
        });
        describe('buzzer', function() {
            describe('action', function() {
                it('should allow accept when valid', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {
                        var sessionId = rm.sessionId;
                        var hostId = rm.hostId;
                        var cc = helper.createClient();

                        helper.contestantJoin(cc, 'username', sessionId, function(rm) {
                            var bpm = messageFactory.create(messageConstants.CONTESTANT_BUZZER_PRESS);
                            bpm.sessionId = sessionId;
                            bpm.contestantId = rm.contestantId;

                            cc.emit(messageConstants.CONTESTANT_BUZZER_PRESS, bpm,
                                function(m) {
                                    messageFactory.restore(m, messageConstants.SUCCESS);

                                    helper.getLatestSession().currentState.should
                                        .equal(constants.gameStates.PENDING);

                                    var hrm = messageFactory.create(
                                        messageConstants.BUZZER_ACTION_COMMAND
                                    );
                                    hrm.sessionId = sessionId;
                                    hrm.hostId = hostId;
                                    hrm.action = constants.buzzerActionCommands
                                        .ACCEPT;

                                    hc.emit(messageConstants.BUZZER_ACTION_COMMAND,
                                        hrm,
                                        function(rm) {
                                            var sm = messageFactory.restore(
                                                rm, messageConstants.SUCCESS
                                            );
                                            sm.should.not.be.null();

                                            helper.getLatestSession().currentState
                                                .should.equal(constants.gameStates
                                                    .READY);
                                            helper.getLatestSession().roundWinner
                                                .should.equal('username');

                                            done();
                                        });
                                });
                        });
                    });
                });
                it('should allow reject when valid', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {
                        var sessionId = rm.sessionId;
                        var hostId = rm.hostId;
                        var cc = helper.createClient();

                        helper.contestantJoin(cc, 'username', sessionId, function(rm) {
                            var bpm = messageFactory.create(messageConstants.CONTESTANT_BUZZER_PRESS);
                            bpm.sessionId = sessionId;
                            bpm.contestantId = rm.contestantId;

                            cc.emit(messageConstants.CONTESTANT_BUZZER_PRESS, bpm,
                                function(m) {
                                    messageFactory.restore(m, messageConstants.SUCCESS);

                                    helper.getLatestSession().currentState.should
                                        .equal(constants.gameStates.PENDING);

                                    var hrm = messageFactory.create(
                                        messageConstants.BUZZER_ACTION_COMMAND
                                    );
                                    hrm.sessionId = sessionId;
                                    hrm.hostId = hostId;
                                    hrm.action = constants.buzzerActionCommands
                                        .REJECT;

                                    hc.emit(messageConstants.BUZZER_ACTION_COMMAND,
                                        hrm,
                                        function(rm) {
                                            var sm = messageFactory.restore(
                                                rm, messageConstants.SUCCESS
                                            );
                                            sm.should.not.be.null();

                                            helper.getLatestSession().currentState
                                                .should.equal(constants.gameStates
                                                    .READY);
                                            should(helper.getLatestSession()
                                                .roundWinner).be.null();

                                            done();
                                        });
                                });
                        });
                    });
                });
                it('should allow reset when valid', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {

                        var hrm = messageFactory.create(messageConstants.BUZZER_ACTION_COMMAND);
                        hrm.sessionId = rm.sessionId;
                        hrm.hostId = rm.hostId;
                        hrm.action = constants.buzzerActionCommands.RESET;

                        hc.emit(messageConstants.BUZZER_ACTION_COMMAND, hrm, function(rm) {
                            var sm = messageFactory.restore(rm, messageConstants.SUCCESS);
                            sm.should.not.be.null();

                            done();
                        });
                    });
                });
                it('should allow disable when valid', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {

                        helper.hostBuzzerAction(hc, rm.sessionId, rm.hostId, constants.buzzerActionCommands.DISABLE, function(sm) {
                            sm.should.be.instanceOf(successMessage);
                            helper.getLatestSession().currentState.should.equal(constants.gameStates.BUZZER_LOCK);
                            done();
                        });
                    });
                });
                it('should allow enable when valid', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {

                        helper.hostBuzzerAction(hc, rm.sessionId, rm.hostId, constants.buzzerActionCommands.DISABLE, function(sm) {
                            sm.should.be.instanceOf(successMessage);
                            helper.getLatestSession().currentState.should.equal(constants.gameStates.BUZZER_LOCK);

                            helper.hostBuzzerAction(hc, rm.sessionId, rm.hostId, constants.buzzerActionCommands.ENABLE, function(sm) {
                                sm.should.be.instanceOf(successMessage);
                                helper.getLatestSession().currentState.should.equal(constants.gameStates.READY);
                                done();
                            });
                        });
                    });
                });
                it('should not allow accept when state is not pending', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {

                        var hrm = messageFactory.create(messageConstants.BUZZER_ACTION_COMMAND);
                        hrm.sessionId = rm.sessionId;
                        hrm.hostId = rm.hostId;
                        hrm.action = constants.buzzerActionCommands.ACCEPT;

                        hc.emit(messageConstants.BUZZER_ACTION_COMMAND, hrm, function(rm) {
                            var em = messageFactory.restore(rm, messageConstants.ERROR);
                            em.should.not.be.null();
                            done();
                        });
                    });
                });
                it('should not allow reject when state is not pending', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {

                        var hrm = messageFactory.create(messageConstants.BUZZER_ACTION_COMMAND);
                        hrm.sessionId = rm.sessionId;
                        hrm.hostId = rm.hostId;
                        hrm.action = constants.buzzerActionCommands.REJECT;

                        hc.emit(messageConstants.BUZZER_ACTION_COMMAND, hrm, function(rm) {
                            var em = messageFactory.restore(rm, messageConstants.ERROR);
                            em.should.not.be.null();
                            done();
                        });
                    });
                });
                it('should allow reset when game state is ready', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {

                        var hrm = messageFactory.create(messageConstants.BUZZER_ACTION_COMMAND);
                        hrm.sessionId = rm.sessionId;
                        hrm.hostId = rm.hostId;
                        hrm.action = constants.buzzerActionCommands.RESET;

                        hc.emit(messageConstants.BUZZER_ACTION_COMMAND, hrm, function(rm) {
                            var sm = messageFactory.restore(rm, messageConstants.SUCCESS);
                            sm.should.not.be.null();
                            done();
                        });
                    });
                });
                it('should allow reset when game state is pending', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {
                        var sessionId = rm.sessionId;
                        var hostId = rm.hostId;
                        var cc = helper.createClient();

                        helper.contestantJoin(cc, 'username', sessionId, function(rm) {
                            var bpm = messageFactory.create(messageConstants.CONTESTANT_BUZZER_PRESS);
                            bpm.sessionId = sessionId;
                            bpm.contestantId = rm.contestantId;

                            cc.emit(messageConstants.CONTESTANT_BUZZER_PRESS, bpm,
                                function(m) {
                                    messageFactory.restore(m, messageConstants.SUCCESS);

                                    helper.getLatestSession().currentState.should
                                        .equal(constants.gameStates.PENDING);

                                    var hrm = messageFactory.create(
                                        messageConstants.BUZZER_ACTION_COMMAND
                                    );
                                    hrm.sessionId = sessionId;
                                    hrm.hostId = hostId;
                                    hrm.action = constants.buzzerActionCommands
                                        .RESET;

                                    hc.emit(messageConstants.BUZZER_ACTION_COMMAND,
                                        hrm,
                                        function(rm) {
                                            var sm = messageFactory.restore(
                                                rm, messageConstants.SUCCESS
                                            );
                                            sm.should.not.be.null();

                                            helper.getLatestSession().currentState
                                                .should.equal(constants.gameStates
                                                    .READY);
                                            should.not.exist(helper.getLatestSession()
                                                .roundWinner);

                                            done();
                                        });
                                });
                        });
                    });
                });
                it('should not allow response when host id is invalid', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {
                        var sessionId = rm.sessionId;
                        var hostId = rm.hostId;
                        var cc = helper.createClient();

                        helper.contestantJoin(cc, 'username', sessionId, function(rm) {
                            var bpm = messageFactory.create(messageConstants.CONTESTANT_BUZZER_PRESS);
                            bpm.sessionId = sessionId;
                            bpm.contestantId = rm.contestantId;

                            cc.emit(messageConstants.CONTESTANT_BUZZER_PRESS, bpm,
                                function(m) {
                                    var hrm = messageFactory.create(
                                        messageConstants.BUZZER_ACTION_COMMAND
                                    );
                                    hrm.sessionId = sessionId;
                                    hrm.hostId = idUtility.generateParticipantId();
                                    hrm.action = constants.buzzerActionCommands
                                        .ACCEPT;

                                    hc.emit(messageConstants.BUZZER_ACTION_COMMAND,
                                        hrm,
                                        function(rm) {
                                            var em = messageFactory.restore(
                                                rm, messageConstants.ERROR
                                            );
                                            em.error.should.equal(constants
                                                .messages.COULD_NOT_ACCEPT_REQUEST_NOT_HOST
                                            );
                                            done();
                                        });
                                });
                        });
                    });
                });
                it('should not allow response when session id is invalid', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {
                        var sessionId = rm.sessionId;
                        var hostId = rm.hostId;
                        var cc = helper.createClient();

                        helper.contestantJoin(cc, 'username', sessionId, function(rm) {
                            var bpm = messageFactory.create(messageConstants.CONTESTANT_BUZZER_PRESS);
                            bpm.sessionId = sessionId;
                            bpm.contestantId = rm.contestantId;

                            cc.emit(messageConstants.CONTESTANT_BUZZER_PRESS, bpm,
                                function(m) {
                                    var hrm = messageFactory.create(
                                        messageConstants.BUZZER_ACTION_COMMAND
                                    );
                                    hrm.sessionId = idUtility.generateSessionId();
                                    hrm.hostId = hostId;
                                    hrm.action = constants.buzzerActionCommands
                                        .ACCEPT;

                                    hc.emit(messageConstants.BUZZER_ACTION_COMMAND,
                                        hrm,
                                        function(rm) {
                                            var em = messageFactory.restore(
                                                rm, messageConstants.ERROR
                                            );
                                            em.error.should.equal(constants
                                                .messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED
                                            );
                                            done();
                                        });
                                });
                        });
                    });
                });
                it('should not allow response when session is complete', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {
                        var sessionId = rm.sessionId;
                        var hostId = rm.hostId;
                        var cc = helper.createClient();

                        helper.contestantJoin(cc, 'username', sessionId, function(rm) {
                            var bpm = messageFactory.create(messageConstants.CONTESTANT_BUZZER_PRESS);
                            bpm.sessionId = sessionId;
                            bpm.contestantId = rm.contestantId;

                            cc.emit(messageConstants.CONTESTANT_BUZZER_PRESS, bpm,
                                function(m) {
                                    var hrm = messageFactory.create(
                                        messageConstants.BUZZER_ACTION_COMMAND
                                    );
                                    hrm.sessionId = sessionId;
                                    hrm.hostId = hostId;
                                    hrm.action = constants.buzzerActionCommands
                                        .ACCEPT;

                                    helper.getLatestSession().complete();

                                    hc.emit(messageConstants.BUZZER_ACTION_COMMAND,
                                        hrm,
                                        function(rm) {
                                            var em = messageFactory.restore(
                                                rm, messageConstants.ERROR
                                            );
                                            em.error.should.equal(constants
                                                .messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED
                                            );
                                            done();
                                        });
                                });
                        });
                    });
                });
                describe('when accepted', function() {
                    it('should update observers', function(done) {
                        var s = new Settings();
                        s.maxContestants = 1;

                        var hc = helper.createClient();
                        helper.createSession(hc, s, function(rm) {
                            var sessionId = rm.sessionId;
                            var hostId = rm.hostId;
                            var cc = helper.createClient();

                            // listen for observer update
                            hc.on(messageConstants.OBSERVER_UPDATE, function(m) {
                                var om = messageFactory.restore(m,
                                    messageConstants.OBSERVER_UPDATE);
                                if (om.gameState.contestants.length && om.gameState
                                    .contestants[0].score === 1) {
                                    done();
                                }
                            });

                            helper.contestantJoin(cc, 'username', sessionId,
                                function(rm) {
                                    var bpm = messageFactory.create(
                                        messageConstants.CONTESTANT_BUZZER_PRESS
                                    );
                                    bpm.sessionId = sessionId;
                                    bpm.contestantId = rm.contestantId;

                                    cc.emit(messageConstants.CONTESTANT_BUZZER_PRESS,
                                        bpm,
                                        function(m) {
                                            messageFactory.restore(m,
                                                messageConstants.SUCCESS
                                            );

                                            var hrm = messageFactory.create(
                                                messageConstants.BUZZER_ACTION_COMMAND
                                            );
                                            hrm.sessionId = sessionId;
                                            hrm.hostId = hostId;
                                            hrm.action = constants.buzzerActionCommands
                                                .ACCEPT;

                                            hc.emit(messageConstants.BUZZER_ACTION_COMMAND,
                                                hrm);
                                        });
                                });
                        });
                    });
                });
                describe('when rejected', function() {
                    it('should update observers', function(done) {
                        var s = new Settings();
                        s.maxContestants = 1;

                        var hc = helper.createClient();
                        helper.createSession(hc, s, function(rm) {
                            var sessionId = rm.sessionId;
                            var hostId = rm.hostId;
                            var cc = helper.createClient();

                            var observedPending = false;
                            // listen for observer update
                            hc.on(messageConstants.OBSERVER_UPDATE, function(m) {
                                var om = messageFactory.restore(m,
                                    messageConstants.OBSERVER_UPDATE);
                                if (om.gameState.currentState === constants
                                    .gameStates.PENDING) {
                                    observedPending = true;
                                    return;
                                }
                                if (observedPending && om.gameState.currentState ===
                                    constants.gameStates.READY) {
                                    om.gameState.contestants.length.should.equal(
                                        1);
                                    om.gameState.contestants[0].score.should
                                        .equal(0);
                                    done();
                                }
                            });

                            helper.contestantJoin(cc, 'username', sessionId,
                                function(rm) {
                                    var bpm = messageFactory.create(
                                        messageConstants.CONTESTANT_BUZZER_PRESS
                                    );
                                    bpm.sessionId = sessionId;
                                    bpm.contestantId = rm.contestantId;

                                    cc.emit(messageConstants.CONTESTANT_BUZZER_PRESS,
                                        bpm,
                                        function(m) {
                                            messageFactory.restore(m,
                                                messageConstants.SUCCESS
                                            );

                                            var hrm = messageFactory.create(
                                                messageConstants.BUZZER_ACTION_COMMAND
                                            );
                                            hrm.sessionId = sessionId;
                                            hrm.hostId = hostId;
                                            hrm.action = constants.buzzerActionCommands
                                                .REJECT;

                                            hc.emit(messageConstants.BUZZER_ACTION_COMMAND,
                                                hrm);
                                        });
                                });
                        });
                    });
                });
                describe('when reset', function() {
                    it('should update observers', function(done) {
                        var s = new Settings();
                        s.maxContestants = 1;

                        var hc = helper.createClient();
                        helper.createSession(hc, s, function(rm) {
                            var sessionId = rm.sessionId;
                            var hostId = rm.hostId;
                            var cc = helper.createClient();

                            var observedPending = false;
                            // listen for observer update
                            hc.on(messageConstants.OBSERVER_UPDATE, function(m) {
                                var om = messageFactory.restore(m,
                                    messageConstants.OBSERVER_UPDATE);
                                if (om.gameState.currentState === constants
                                    .gameStates.PENDING) {
                                    observedPending = true;
                                    return;
                                }
                                if (observedPending && om.gameState.currentState ===
                                    constants.gameStates.READY) {
                                    om.gameState.contestants.length.should.equal(
                                        1);
                                    om.gameState.contestants[0].score.should
                                        .equal(0);
                                    done();
                                }
                            });

                            helper.contestantJoin(cc, 'username', sessionId,
                                function(rm) {
                                    helper.contestantBuzzerPress(cc, sessionId,
                                        rm.contestantId,
                                        function() {
                                            helper.hostBuzzerAction(hc,
                                                sessionId, hostId,
                                                constants.buzzerActionCommands
                                                .RESET);
                                        });
                                });
                        });
                    });
                });
                describe('when disabled', function() {
                    it('should update observers', function(done) {
                        var s = new Settings();
                        s.maxContestants = 1;

                        var hc = helper.createClient();

                        // listen for observer update
                        hc.on(messageConstants.OBSERVER_UPDATE, function(m) {
                            var om = messageFactory.restore(m, messageConstants.OBSERVER_UPDATE);
                            if (om.gameState.currentState === constants.gameStates.BUZZER_LOCK) {
                                done();
                            }
                        });

                        helper.createSession(hc, s, function(rm) {
                            helper.hostBuzzerAction(hc, rm.sessionId, rm.hostId, constants.buzzerActionCommands.DISABLE);
                        });
                    });
                });
                describe('when enabled', function() {
                    it('should update observers', function(done) {
                        var s = new Settings();
                        s.maxContestants = 1;

                        var hc = helper.createClient();

                        var observedLocked = false;
                        // listen for observer update
                        hc.on(messageConstants.OBSERVER_UPDATE, function(m) {
                            var om = messageFactory.restore(m, messageConstants.OBSERVER_UPDATE);
                            if (om.gameState.currentState === constants.gameStates.BUZZER_LOCK) {
                                observedLocked = true;
                                return;
                            }
                            if (observedLocked && om.gameState.currentState === constants.gameStates.READY) {
                                done();
                            }
                        });

                        helper.createSession(hc, s, function(rm) {

                            helper.hostBuzzerAction(hc, rm.sessionId, rm.hostId, constants.buzzerActionCommands.DISABLE, function(sm) {
                                sm.should.be.instanceOf(successMessage);
                                helper.getLatestSession().currentState.should.equal(constants.gameStates.BUZZER_LOCK);

                                helper.hostBuzzerAction(hc, rm.sessionId, rm.hostId, constants.buzzerActionCommands.ENABLE, function(sm) {
                                    sm.should.be.instanceOf(successMessage);
                                    helper.getLatestSession().currentState.should.equal(constants.gameStates.READY);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
