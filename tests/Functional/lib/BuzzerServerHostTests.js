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

                        helper.hostBuzzerAction(hc, rm.sessionId, rm.hostId, constants.buzzerActionCommands
                            .DISABLE,
                            function(sm) {
                                sm.should.be.instanceOf(successMessage);
                                helper.getLatestSession().currentState.should.equal(
                                    constants.gameStates.BUZZER_LOCK);
                                done();
                            });
                    });
                });
                it('should allow enable when valid', function(done) {
                    var s = new Settings();
                    s.maxContestants = 1;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {

                        helper.hostBuzzerAction(hc, rm.sessionId, rm.hostId, constants.buzzerActionCommands
                            .DISABLE,
                            function(sm) {
                                sm.should.be.instanceOf(successMessage);
                                helper.getLatestSession().currentState.should.equal(
                                    constants.gameStates.BUZZER_LOCK);

                                helper.hostBuzzerAction(hc, rm.sessionId, rm.hostId,
                                    constants.buzzerActionCommands.ENABLE,
                                    function(sm) {
                                        sm.should.be.instanceOf(successMessage);
                                        helper.getLatestSession().currentState.should
                                            .equal(constants.gameStates.READY);
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
                    it('should update contestant score', function(done) {
                        var s = new Settings();
                        s.maxContestants = 1;

                        var hc = helper.createClient();
                        helper.createSession(hc, s, function(rm) {
                            var sessionId = rm.sessionId;
                            var hostId = rm.hostId;
                            var cc = helper.createClient();

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
                                                hrm,
                                                function(m) {
                                                    messageFactory.restore(
                                                        m,
                                                        messageConstants
                                                        .SUCCESS);

                                                    var s = helper.getLatestSession();
                                                    var c = s.contestants[
                                                        0];
                                                    c.score.should.equal(
                                                        1);
                                                    done();
                                                });
                                        });
                                });
                        });
                    });
                    it('should update team score', function(done) {
                        var s = new Settings();
                        s.hasTeams = true;
                        s.maxTeams = 1;
                        s.teamSize = 1;

                        var hc = helper.createClient();
                        helper.createSession(hc, s, function(rm) {
                            var sessionId = rm.sessionId;
                            var hostId = rm.hostId;
                            var cc = helper.createClient();

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
                                                hrm,
                                                function(m) {
                                                    messageFactory.restore(
                                                        m,
                                                        messageConstants
                                                        .SUCCESS);

                                                    var s = helper.getLatestSession();
                                                    var c = s.contestants[
                                                        0];
                                                    c.score.should.equal(
                                                        1);
                                                    var t = s.teams.all[
                                                        0];
                                                    t.score.should.equal(
                                                        1);
                                                    done();
                                                });
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
                    it('should not update contestant score', function(done) {
                        var s = new Settings();
                        s.maxContestants = 1;

                        var hc = helper.createClient();
                        helper.createSession(hc, s, function(rm) {
                            var sessionId = rm.sessionId;
                            var hostId = rm.hostId;
                            var cc = helper.createClient();

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
                                                hrm,
                                                function(m) {
                                                    messageFactory.restore(
                                                        m,
                                                        messageConstants
                                                        .SUCCESS);

                                                    var s = helper.getLatestSession();
                                                    var c = s.contestants[
                                                        0];
                                                    c.score.should.equal(
                                                        0);
                                                    done();
                                                });
                                        });
                                });
                        });
                    });
                    it('should not update team score', function(done) {
                        var s = new Settings();
                        s.hasTeams = true;
                        s.maxTeams = 1;
                        s.teamSize = 1;

                        var hc = helper.createClient();
                        helper.createSession(hc, s, function(rm) {
                            var sessionId = rm.sessionId;
                            var hostId = rm.hostId;
                            var cc = helper.createClient();

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
                                                hrm,
                                                function(m) {
                                                    messageFactory.restore(
                                                        m,
                                                        messageConstants
                                                        .SUCCESS);

                                                    var s = helper.getLatestSession();
                                                    var c = s.contestants[
                                                        0];
                                                    c.score.should.equal(
                                                        0);
                                                    var t = s.teams.all[
                                                        0];
                                                    t.score.should.equal(
                                                        0);
                                                    done();
                                                });
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
                    it('should not update contestant score', function(done) {
                        var s = new Settings();
                        s.maxContestants = 1;

                        var hc = helper.createClient();
                        helper.createSession(hc, s, function(rm) {
                            var sessionId = rm.sessionId;
                            var hostId = rm.hostId;
                            var cc = helper.createClient();

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
                                                .RESET;

                                            hc.emit(messageConstants.BUZZER_ACTION_COMMAND,
                                                hrm,
                                                function(m) {
                                                    messageFactory.restore(
                                                        m,
                                                        messageConstants
                                                        .SUCCESS);

                                                    var s = helper.getLatestSession();
                                                    var c = s.contestants[
                                                        0];
                                                    c.score.should.equal(
                                                        0);
                                                    done();
                                                });
                                        });
                                });
                        });
                    });
                    it('should not update team score', function(done) {
                        var s = new Settings();
                        s.hasTeams = true;
                        s.maxTeams = 1;
                        s.teamSize = 1;

                        var hc = helper.createClient();
                        helper.createSession(hc, s, function(rm) {
                            var sessionId = rm.sessionId;
                            var hostId = rm.hostId;
                            var cc = helper.createClient();

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
                                                .RESET;

                                            hc.emit(messageConstants.BUZZER_ACTION_COMMAND,
                                                hrm,
                                                function(m) {
                                                    messageFactory.restore(
                                                        m,
                                                        messageConstants
                                                        .SUCCESS);

                                                    var s = helper.getLatestSession();
                                                    var c = s.contestants[
                                                        0];
                                                    c.score.should.equal(
                                                        0);
                                                    var t = s.teams.all[
                                                        0];
                                                    t.score.should.equal(
                                                        0);
                                                    done();
                                                });
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
                            helper.hostBuzzerAction(hc, rm.sessionId, rm.hostId,
                                constants.buzzerActionCommands.DISABLE);
                        });
                    });
                    it('should not update contestant score', function(done) {
                        var s = new Settings();
                        s.maxContestants = 1;

                        var hc = helper.createClient();
                        helper.createSession(hc, s, function(rm) {
                            var sessionId = rm.sessionId;
                            var hostId = rm.hostId;
                            var cc = helper.createClient();

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
                                                .DISABLE;

                                            hc.emit(messageConstants.BUZZER_ACTION_COMMAND,
                                                hrm,
                                                function(m) {
                                                    messageFactory.restore(
                                                        m,
                                                        messageConstants
                                                        .SUCCESS);

                                                    var s = helper.getLatestSession();
                                                    var c = s.contestants[
                                                        0];
                                                    c.score.should.equal(
                                                        0);
                                                    done();
                                                });
                                        });
                                });
                        });
                    });
                    it('should not update team score', function(done) {
                        var s = new Settings();
                        s.hasTeams = true;
                        s.maxTeams = 1;
                        s.teamSize = 1;

                        var hc = helper.createClient();
                        helper.createSession(hc, s, function(rm) {
                            var sessionId = rm.sessionId;
                            var hostId = rm.hostId;
                            var cc = helper.createClient();

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
                                                .DISABLE;

                                            hc.emit(messageConstants.BUZZER_ACTION_COMMAND,
                                                hrm,
                                                function(m) {
                                                    messageFactory.restore(
                                                        m,
                                                        messageConstants
                                                        .SUCCESS);

                                                    var s = helper.getLatestSession();
                                                    var c = s.contestants[
                                                        0];
                                                    c.score.should.equal(
                                                        0);
                                                    var t = s.teams.all[
                                                        0];
                                                    t.score.should.equal(
                                                        0);
                                                    done();
                                                });
                                        });
                                });
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
                            if (observedLocked && om.gameState.currentState ===
                                constants.gameStates.READY) {
                                done();
                            }
                        });

                        helper.createSession(hc, s, function(rm) {

                            helper.hostBuzzerAction(hc, rm.sessionId, rm.hostId,
                                constants.buzzerActionCommands.DISABLE,
                                function(sm) {
                                    sm.should.be.instanceOf(successMessage);
                                    helper.getLatestSession().currentState.should
                                        .equal(constants.gameStates.BUZZER_LOCK);

                                    helper.hostBuzzerAction(hc, rm.sessionId,
                                        rm.hostId, constants.buzzerActionCommands
                                        .ENABLE,
                                        function(sm) {
                                            sm.should.be.instanceOf(
                                                successMessage);
                                            helper.getLatestSession().currentState
                                                .should.equal(constants.gameStates
                                                    .READY);
                                        });
                                });
                        });
                    });
                });
            });
        });
        describe('team name change', function() {
            it('should allow it when request is valid', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var hostId = rm.hostId;

                    var session = helper.getLatestSession();
                    var team = session.teams.all[0];

                    var req = messageFactory.create(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE);
                    req.sessionId = sessionId;
                    req.hostId = hostId;
                    req.teamNameFrom = team.teamName;
                    req.teamNameTo = 'The new team name';

                    hc.emit(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE, req, function(m) {
                        var sm = messageFactory.restore(m, messageConstants.SUCCESS);
                        sm.should.not.be.null();
                        team.teamName.should.equal(req.teamNameTo);
                        done();
                    });
                });
            });
            it('should allow it when name contains profanity', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var hostId = rm.hostId;

                    var session = helper.getLatestSession();
                    var team = session.teams.all[0];

                    var req = messageFactory.create(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE);
                    req.sessionId = sessionId;
                    req.hostId = hostId;
                    req.teamNameFrom = team.teamName;
                    req.teamNameTo = 'ash0le penis';

                    hc.emit(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE, req, function(m) {
                        var sm = messageFactory.restore(m, messageConstants.SUCCESS);
                        sm.should.not.be.null();
                        team.teamName.should.equal(req.teamNameTo);
                        done();
                    });
                });
            });
            it('should allow it when team name editing is manual', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.MANUAL;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var hostId = rm.hostId;

                    var session = helper.getLatestSession();
                    var team = session.teams.all[0];

                    var req = messageFactory.create(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE);
                    req.sessionId = sessionId;
                    req.hostId = hostId;
                    req.teamNameFrom = team.teamName;
                    req.teamNameTo = 'The new team name';

                    hc.emit(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE, req, function(m) {
                        var sm = messageFactory.restore(m, messageConstants.SUCCESS);
                        sm.should.not.be.null();
                        team.teamName.should.equal(req.teamNameTo);
                        done();
                    });
                });
            });            
            it('should not allow it when session is completed', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var hostId = rm.hostId;

                    var session = helper.getLatestSession();
                    var team = session.teams.all[0];
                    session.complete();

                    var req = messageFactory.create(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE);
                    req.sessionId = sessionId;
                    req.hostId = hostId;
                    req.teamNameFrom = team.teamName;
                    req.teamNameTo = 'A new team name';

                    hc.emit(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE, req, function(m) {
                        var em = messageFactory.restore(m, messageConstants.ERROR);
                        em.should.not.be.null();
                        em.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                        done();
                    });
                });
            });
            it('should not allow it when not the host', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;

                    var session = helper.getLatestSession();
                    var team = session.teams.all[0];

                    var req = messageFactory.create(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE);
                    req.sessionId = sessionId;
                    req.hostId = idUtility.generateParticipantId();
                    req.teamNameFrom = team.teamName;
                    req.teamNameTo = 'A new team name';

                    hc.emit(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE, req, function(m) {
                        var em = messageFactory.restore(m, messageConstants.ERROR);
                        em.should.not.be.null();
                        em.error.should.equal(constants.messages.COULD_NOT_ACCEPT_REQUEST_NOT_HOST);
                        done();
                    });
                });
            });
            it('should not allow it team does not exist', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var hostId = rm.hostId;

                    var req = messageFactory.create(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE);
                    req.sessionId = sessionId;
                    req.hostId = hostId;
                    req.teamNameFrom = 'does not exist';
                    req.teamNameTo = 'some other team name';

                    hc.emit(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE, req, function(m) {
                        var em = messageFactory.restore(m, messageConstants.ERROR);
                        em.should.not.be.null();
                        em.error.should.equal(constants.messages.COULD_NOT_PROCESS_REQUEST_TEAM_NOT_FOUND);
                        done();
                    });
                });
            });
            it('should not allow it when team name already in use', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 2;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var hostId = rm.hostId;

                    var session = helper.getLatestSession();
                    var team1 = session.teams.all[0];
                    var team2 = session.teams.all[1];

                    var req = messageFactory.create(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE);
                    req.sessionId = sessionId;
                    req.hostId = hostId;
                    req.teamNameFrom = team1.teamName;
                    req.teamNameTo = team2.teamName;

                    hc.emit(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE, req, function(m) {
                        var em = messageFactory.restore(m, messageConstants.ERROR);
                        em.should.not.be.null();
                        em.error.should.equal(constants.messages.COULD_NOT_ACCEPT_TEAM_NAME_IN_USE);
                        done();
                    });
                });
            });
            it('should not allow it when session does not exist', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 2;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var hostId = rm.hostId;

                    var session = helper.getLatestSession();
                    var team = session.teams.all[0];

                    var req = messageFactory.create(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE);
                    req.sessionId = idUtility.generateSessionId();
                    req.hostId = hostId;
                    req.teamNameFrom = team.teamName;
                    req.teamNameTo = 'some new name';

                    hc.emit(messageConstants.HOST_TEAM_NAME_UPDATE_REQUEST_MESSAGE, req, function(m) {
                        var em = messageFactory.restore(m, messageConstants.ERROR);
                        em.should.not.be.null();
                        em.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                        done();
                    });
                });
            });
        });
        describe('team leader change', function() {
            it('should allow it when request is valid', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 2;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var hostId = rm.hostId;

                    var c1 = helper.createClient();
                    var c2 = helper.createClient();

                    helper.contestantJoin(c1, 'c1', sessionId, function() {
                        helper.contestantJoin(c2, 'c2', sessionId, function() {
                            var session = helper.getLatestSession();
                            var team = session.teams.all[0];
                            var teamLeaderUsername = team.teamLeader.username;
                            
                            var req = messageFactory.create(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE);
                            req.sessionId = sessionId;
                            req.hostId = hostId;
                            req.teamName = team.teamName;
                            req.teamLeaderUsername = team.teamLeader.username === 'c1' ? 'c2' : 'c1';
                            
                            hc.emit(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE, req, function(m) {
                                var sm = messageFactory.restore(m, messageConstants.SUCCESS);
                                sm.should.not.be.null();
                                team.teamLeader.username.should.not.equal(teamLeaderUsername);
                                done();
                            });
                        });
                    });
                });
            });
            it('should allow it team leader is the same', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 2;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var hostId = rm.hostId;

                    var c1 = helper.createClient();
                    var c2 = helper.createClient();

                    helper.contestantJoin(c1, 'c1', sessionId, function() {
                        helper.contestantJoin(c2, 'c2', sessionId, function() {
                            var session = helper.getLatestSession();
                            var team = session.teams.all[0];
                            var teamLeaderUsername = team.teamLeader.username;
                            
                            var req = messageFactory.create(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE);
                            req.sessionId = sessionId;
                            req.hostId = hostId;
                            req.teamName = team.teamName;
                            req.teamLeaderUsername = team.teamLeader.username;
                            
                            hc.emit(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE, req, function(m) {
                                var sm = messageFactory.restore(m, messageConstants.SUCCESS);
                                sm.should.not.be.null();
                                team.teamLeader.username.should.equal(teamLeaderUsername);
                                done();
                            });
                        });
                    });
                });
            });            
            it('should not allow it when session is completed', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 2;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var hostId = rm.hostId;

                    var c1 = helper.createClient();
                    var c2 = helper.createClient();

                    helper.contestantJoin(c1, 'c1', sessionId, function() {
                        helper.contestantJoin(c2, 'c2', sessionId, function() {
                            var session = helper.getLatestSession();
                            var team = session.teams.all[0];
                            
                            var req = messageFactory.create(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE);
                            req.sessionId = sessionId;
                            req.hostId = hostId;
                            req.teamName = team.teamName;
                            req.teamLeaderUsername = team.teamLeader.username === 'c1' ? 'c2' : 'c1';

                            session.complete();
                            
                            hc.emit(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE, req, function(m) {
                                var em = messageFactory.restore(m, messageConstants.ERROR);
                                em.should.not.be.null();
                                em.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                                done();
                            });
                        });
                    });
                });
            });
            it('should not allow it when not the host', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 2;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;

                    var c1 = helper.createClient();
                    var c2 = helper.createClient();

                    helper.contestantJoin(c1, 'c1', sessionId, function() {
                        helper.contestantJoin(c2, 'c2', sessionId, function() {
                            var session = helper.getLatestSession();
                            var team = session.teams.all[0];
                            
                            var req = messageFactory.create(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE);
                            req.sessionId = sessionId;
                            req.hostId = idUtility.generateParticipantId();
                            req.teamName = team.teamName;
                            req.teamLeaderUsername = team.teamLeader.username === 'c1' ? 'c2' : 'c1';

                            hc.emit(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE, req, function(m) {
                                var em = messageFactory.restore(m, messageConstants.ERROR);
                                em.should.not.be.null();
                                em.error.should.equal(constants.messages.COULD_NOT_ACCEPT_REQUEST_NOT_HOST);
                                done();
                            });
                        });
                    });
                });
            });
            it('should not allow it team does not exist', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 2;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var hostId = rm.hostId;

                    var c1 = helper.createClient();
                    var c2 = helper.createClient();

                    helper.contestantJoin(c1, 'c1', sessionId, function() {
                        helper.contestantJoin(c2, 'c2', sessionId, function() {
                            var session = helper.getLatestSession();
                            var team = session.teams.all[0];
                            
                            var req = messageFactory.create(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE);
                            req.sessionId = sessionId;
                            req.hostId = hostId;
                            req.teamName = 'does not exist team name';
                            req.teamLeaderUsername = team.teamLeader.username === 'c1' ? 'c2' : 'c1';

                            hc.emit(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE, req, function(m) {
                                var em = messageFactory.restore(m, messageConstants.ERROR);
                                em.should.not.be.null();
                                em.error.should.equal(constants.messages.COULD_NOT_PROCESS_REQUEST_TEAM_NOT_FOUND);
                                done();
                            });
                        });
                    });
                });
            });
            it('should not allow it when session does not exist', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 2;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var hostId = rm.hostId;

                    var c1 = helper.createClient();
                    var c2 = helper.createClient();

                    helper.contestantJoin(c1, 'c1', sessionId, function() {
                        helper.contestantJoin(c2, 'c2', sessionId, function() {
                            var session = helper.getLatestSession();
                            var team = session.teams.all[0];
                            
                            var req = messageFactory.create(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE);
                            req.sessionId = idUtility.generateSessionId();
                            req.hostId = hostId;
                            req.teamName = team.teamName;
                            req.teamLeaderUsername = team.teamLeader.username === 'c1' ? 'c2' : 'c1';

                            session.complete();
                            
                            hc.emit(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE, req, function(m) {
                                var em = messageFactory.restore(m, messageConstants.ERROR);
                                em.should.not.be.null();
                                em.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                                done();
                            });
                        });
                    });
                });
            });
            it('should not allow it when contestant does not exist', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 2;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;
                    var hostId = rm.hostId;

                    var c1 = helper.createClient();
                    var c2 = helper.createClient();

                    helper.contestantJoin(c1, 'c1', sessionId, function() {
                        helper.contestantJoin(c2, 'c2', sessionId, function() {
                            var session = helper.getLatestSession();
                            var team = session.teams.all[0];
                            
                            var req = messageFactory.create(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE);
                            req.sessionId = sessionId;
                            req.hostId = hostId;
                            req.teamName = team.teamName;
                            req.teamLeaderUsername = 'does not exist';

                            hc.emit(messageConstants.HOST_TEAM_LEADER_SET_REQUEST_MESSAGE, req, function(m) {
                                var em = messageFactory.restore(m, messageConstants.ERROR);
                                em.should.not.be.null();
                                em.error.should.equal(constants.messages.COULD_NOT_PROCESS_REQUEST_CONTESTANT_NOT_FOUND);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
});
