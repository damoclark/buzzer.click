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
                it('should allow when request is valid', function(done) {
                    var s = new Settings();
                    s.hasTeams = true;
                    s.maxTeams = 1;
                    s.teamSize = 1;
                    s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

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
                    s.hasTeams = true;
                    s.maxTeams = 1;
                    s.teamSize = 1;
                    s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {

                        // listen for observer update
                        hc.on(messageConstants.OBSERVER_UPDATE, function(m) {
                            var om = messageFactory.restore(m, messageConstants.OBSERVER_UPDATE);
                            om.should.not.be.null();
                            om.gameState.contestants.length.should.equal(1);
                            om.gameState.contestants[0].username.should.equal(
                                'Test Person');
                            om.gameState.teams.length.should.equal(1);
                            om.gameState.teams[0].contestants.length.should.equal(1);
                            om.gameState.teams[0].contestants[0].username.should.equal(
                                'Test Person');
                            done();
                        });

                        var cc = helper.createClient();
                        helper.contestantJoin(cc, 'Test Person', rm.sessionId);
                    });
                });
                it('should not allow when session is full', function(done) {
                    var s = new Settings();
                    s.hasTeams = true;
                    s.maxTeams = 1;
                    s.teamSize = 1;
                    s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

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
                                        constants.messages.TEAMS_ARE_FULL
                                    );
                                    done();
                                });
                        });
                    });
                });
                it('should subscribe contestant to contestant room', function(done) {
                    var s = new Settings();
                    s.hasTeams = true;
                    s.maxTeams = 1;
                    s.teamSize = 1;
                    s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

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
                    s.hasTeams = true;
                    s.maxTeams = 1;
                    s.teamSize = 1;
                    s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

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
                    s.hasTeams = true;
                    s.maxTeams = 1;
                    s.teamSize = 1;
                    s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

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
                    s.hasTeams = true;
                    s.maxTeams = 1;
                    s.teamSize = 1;
                    s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

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
                    s.hasTeams = true;
                    s.maxTeams = 1;
                    s.teamSize = 2;
                    s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

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
                it('should inquire about team leader position', function(done) {
                    var s = new Settings();
                    s.hasTeams = true;
                    s.maxTeams = 1;
                    s.teamSize = 2;
                    s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.PLAYER_CHOICE;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {
                        var cc = helper.createClient();

                        // Join
                        var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                        rqm.sessionId = rm.sessionId;
                        rqm.username = 'Test Person';

                        cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                            var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);
                            rm.enquireForTeamLeaderPosition.should.be.true();
                            done();
                        });
                    });
                });
                it('should not inquire about team leader position', function(done) {
                    var s = new Settings();
                    s.hasTeams = true;
                    s.maxTeams = 1;
                    s.teamSize = 2;
                    s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                    var hc = helper.createClient();
                    helper.createSession(hc, s, function(rm) {
                        var cc = helper.createClient();

                        // Join
                        var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                        rqm.sessionId = rm.sessionId;
                        rqm.username = 'Test Person';

                        cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                            var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);
                            rm.enquireForTeamLeaderPosition.should.be.false();
                            done();
                        });
                    });
                });
                describe('when team leader selection method is RANDOM', function() {
                    it('should fulfill team leader position when team is full', function(done) {
                        var s = new Settings();
                        s.hasTeams = true;
                        s.maxTeams = 1;
                        s.teamSize = 2;
                        s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                        var hc = helper.createClient();
                        helper.createSession(hc, s, function(rm) {
                            var sessionId = rm.sessionId;
                            var cc1 = helper.createClient();
                            var cc2 = helper.createClient();

                            helper.contestantJoin(cc1, 'c1', sessionId, function() {
                                helper.contestantJoin(cc2, 'c2', sessionId,
                                    function() {
                                        var s = helper.getLatestSession();
                                        var t = s.teams.all[0];
                                        t.teamLeader.username.should.equalOneOf(
                                            'c1', 'c2');
                                        done();
                                    });
                            });
                        });
                    });
                    it('should not fulfill team leader position when team is not full', function(
                        done) {
                        var s = new Settings();
                        s.hasTeams = true;
                        s.maxTeams = 1;
                        s.teamSize = 3;
                        s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                        var hc = helper.createClient();
                        helper.createSession(hc, s, function(rm) {
                            var sessionId = rm.sessionId;
                            var cc1 = helper.createClient();
                            var cc2 = helper.createClient();

                            helper.contestantJoin(cc1, 'c1', sessionId, function() {
                                helper.contestantJoin(cc2, 'c2', sessionId,
                                    function() {
                                        var s = helper.getLatestSession();
                                        var t = s.teams.all[0];
                                        should(t.teamLeader).be.null();
                                        done();
                                    });
                            });
                        });
                    });
                });
            });
        });
        describe('team leader inquiry response', function() {
            it('should set team leader', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 2;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.PLAYER_CHOICE;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var cc = helper.createClient();
                    var sessionId = rm.sessionId;

                    // Join
                    var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                    rqm.sessionId = sessionId;
                    rqm.username = 'Test Person';

                    cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);
                        rm.enquireForTeamLeaderPosition.should.be.true();

                        rqm = messageFactory.create(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE);
                        rqm.sessionId = sessionId;
                        rqm.contestantId = rm.contestantId;
                        rqm.decision = true;

                        cc.emit(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE, rqm,
                            function(m) {
                                var sm = messageFactory.restore(m, messageConstants.SUCCESS);
                                sm.should.not.be.null();
                                var s = helper.getLatestSession();
                                var t = s.teams.all[0];
                                t.teamLeader.username.should.equal('Test Person');
                                done();
                            });
                    });
                });
            });
            it('should not set team leader', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 2;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.PLAYER_CHOICE;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var cc = helper.createClient();
                    var sessionId = rm.sessionId;

                    // Join
                    var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                    rqm.sessionId = sessionId;
                    rqm.username = 'Test Person';

                    cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);
                        rm.enquireForTeamLeaderPosition.should.be.true();

                        rqm = messageFactory.create(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE);
                        rqm.sessionId = sessionId;
                        rqm.contestantId = rm.contestantId;
                        rqm.decision = false;

                        cc.emit(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE, rqm,
                            function(m) {
                                var sm = messageFactory.restore(m, messageConstants.SUCCESS);
                                sm.should.not.be.null();
                                var s = helper.getLatestSession();
                                var t = s.teams.all[0];
                                should(t.teamLeader).be.null();
                                done();
                            });
                    });
                });
            });
            it('should not allow when session does not exist', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 2;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.PLAYER_CHOICE;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var cc = helper.createClient();
                    var sessionId = rm.sessionId;

                    // Join
                    var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                    rqm.sessionId = sessionId;
                    rqm.username = 'Test Person';

                    cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);
                        rm.enquireForTeamLeaderPosition.should.be.true();

                        rqm = messageFactory.create(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE);
                        rqm.sessionId = idUtility.generateSessionId();
                        rqm.contestantId = rm.contestantId;
                        rqm.decision = true;

                        cc.emit(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE, rqm,
                            function(m) {
                                var rm = messageFactory.restore(m, messageConstants.ERROR);
                                rm.should.not.be.null();
                                rm.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                                done();
                            });
                    });
                });
            });
            it('should not allow when session is completed', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 2;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.PLAYER_CHOICE;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var cc = helper.createClient();
                    var sessionId = rm.sessionId;

                    // Join
                    var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                    rqm.sessionId = sessionId;
                    rqm.username = 'Test Person';

                    cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);
                        rm.enquireForTeamLeaderPosition.should.be.true();

                        rqm = messageFactory.create(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE);
                        rqm.sessionId = sessionId;
                        rqm.contestantId = rm.contestantId;
                        rqm.decision = true;

                        helper.getLatestSession().complete();

                        cc.emit(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE, rqm,
                            function(m) {
                                var rm = messageFactory.restore(m, messageConstants.ERROR);
                                rm.should.not.be.null();
                                rm.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                                done();
                            });
                    });
                });
            });
            it('should not allow when contestant does not exist', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 2;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.PLAYER_CHOICE;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var cc = helper.createClient();
                    var sessionId = rm.sessionId;

                    // Join
                    var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                    rqm.sessionId = sessionId;
                    rqm.username = 'Test Person';

                    cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);
                        rm.enquireForTeamLeaderPosition.should.be.true();

                        rqm = messageFactory.create(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE);
                        rqm.sessionId = sessionId;
                        rqm.contestantId = idUtility.generateParticipantId();
                        rqm.decision = true;

                        cc.emit(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE, rqm,
                            function(m) {
                                var em = messageFactory.restore(m, messageConstants.ERROR);
                                em.should.not.be.null();
                                em.error.should.equal(constants.messages.COULD_NOT_ACCEPT_TEAM_LEADER_RESPONSE_NOT_CONTESTANT);
                                done();
                            });
                    });
                });
            });
            it('should not set team leader when position fulfilled (aka race condition)', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 2;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.PLAYER_CHOICE;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var cc1 = helper.createClient();
                    var cc2 = helper.createClient();
                    var sessionId = rm.sessionId;

                    // Join
                    var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                    rqm.sessionId = sessionId;
                    rqm.username = 'Test Person';

                    cc1.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);
                        rm.enquireForTeamLeaderPosition.should.be.true();

                        var cc1Id = rm.contestantId;

                        helper.contestantJoin(cc2, 'Test Person2', sessionId, function(m) {
                            rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);
                            rm.enquireForTeamLeaderPosition.should.be.true();

                            rqm = messageFactory.create(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE);
                            rqm.sessionId = sessionId;
                            rqm.contestantId = rm.contestantId;
                            rqm.decision = true;

                            cc2.emit(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE,
                                rqm,
                                function(m) {
                                    var sm = messageFactory.restore(m,
                                        messageConstants.SUCCESS);
                                    sm.should.not.be.null();
                                    rqm.contestantId = cc1Id;

                                    cc1.emit(messageConstants.INQUIRE_TEAM_LEADER_RESPONSE_MESSAGE,
                                        rqm,
                                        function(m) {
                                            var em = messageFactory.restore(
                                                m, messageConstants.ERROR
                                            );
                                            em.should.not.be.null();
                                            em.error.should.equal(constants
                                                .messages.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_FULFILLED
                                            );
                                            done();
                                        });
                                });
                        });
                    });
                });
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
            it('should not allow when contestant does not exist', function(done) {
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
        describe('team name change request', function() {
            it('should allow it when request is valid', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var cc = helper.createClient();
                    var sessionId = rm.sessionId;

                    // Join
                    var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                    rqm.sessionId = sessionId;
                    rqm.username = 'Test Person';

                    cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);

                        var req = messageFactory.create(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE);
                        req.sessionId = sessionId;
                        req.contestantId = rm.contestantId;
                        req.teamName = 'New team name';

                        cc.emit(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE, req,
                            function(m) {
                                var sm = messageFactory.restore(m, messageConstants.SUCCESS);
                                sm.should.not.be.null();

                                var session = helper.getLatestSession();
                                session.teams.all[0].teamName.should.equal(
                                    'New team name');
                                done();
                            });
                    });
                });
            });
            it('should not allow it when team name is already used', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 2;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var cc = helper.createClient();
                    var sessionId = rm.sessionId;

                    // Join
                    var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                    rqm.sessionId = sessionId;
                    rqm.username = 'Test Person';

                    cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);

                        var session = helper.getLatestSession();
                        var contestant = session.contestants[0];
                        var team = session.teams.getByContestant(contestant);
                        var otherTeam = session.teams.all.filter(function(t) {
                            return t !== team;
                        })[0];

                        var req = messageFactory.create(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE);
                        req.sessionId = sessionId;
                        req.contestantId = rm.contestantId;
                        req.teamName = otherTeam.teamName;

                        cc.emit(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE, req,
                            function(m) {
                                var em = messageFactory.restore(m, messageConstants.ERROR);
                                em.should.not.be.null();
                                em.error.should.equal(constants.messages.COULD_NOT_ACCEPT_TEAM_NAME_IN_USE);
                                done();
                            });
                    });
                });
            });
            it('should allow it when team name does not change', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var cc = helper.createClient();
                    var sessionId = rm.sessionId;

                    // Join
                    var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                    rqm.sessionId = sessionId;
                    rqm.username = 'Test Person';

                    cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);

                        var session = helper.getLatestSession();
                        var contestant = session.contestants[0];
                        var team = session.teams.getByContestant(contestant);

                        var req = messageFactory.create(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE);
                        req.sessionId = sessionId;
                        req.contestantId = rm.contestantId;
                        req.teamName = team.teamName;

                        cc.emit(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE, req,
                            function(m) {
                                var sm = messageFactory.restore(m, messageConstants.SUCCESS);
                                sm.should.not.be.null();
                                done();
                            });
                    });
                });
            });            
            it('should not allow it when not team leader', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 2;
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var cc = helper.createClient();
                    var sessionId = rm.sessionId;

                    // Join
                    var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                    rqm.sessionId = sessionId;
                    rqm.username = 'Test Person';

                    cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);

                        var req = messageFactory.create(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE);
                        req.sessionId = sessionId;
                        req.contestantId = rm.contestantId;
                        req.teamName = 'New team name';

                        cc.emit(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE, req,
                            function(m) {
                                var em = messageFactory.restore(m, messageConstants.ERROR);
                                em.should.not.be.null();
                                em.error.should.equal(constants.messages.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_NOT_CONTESTANT_TEAM_OR_TEAM_LEADER);

                                var session = helper.getLatestSession();
                                session.teams.all[0].teamName.should.not.equal(
                                    'New team name');
                                done();
                            });
                    });
                });
            });
            it('should not allow it when session does not exist', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var cc = helper.createClient();
                    var sessionId = rm.sessionId;

                    // Join
                    var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                    rqm.sessionId = sessionId;
                    rqm.username = 'Test Person';

                    cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);

                        var req = messageFactory.create(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE);
                        req.sessionId = idUtility.generateSessionId();
                        req.contestantId = rm.contestantId;
                        req.teamName = 'New team name';

                        cc.emit(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE, req,
                            function(m) {
                                var em = messageFactory.restore(m, messageConstants.ERROR);
                                em.should.not.be.null();
                                em.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                                done();
                            });
                    });
                });
            });
            it('should not allow it when contestant does not exist', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var cc = helper.createClient();
                    var sessionId = rm.sessionId;

                    // Join
                    var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                    rqm.sessionId = sessionId;
                    rqm.username = 'Test Person';

                    cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);

                        var req = messageFactory.create(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE);
                        req.sessionId = sessionId;
                        req.contestantId = idUtility.generateParticipantId();
                        req.teamName = 'New team name';

                        cc.emit(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE, req,
                            function(m) {
                                var em = messageFactory.restore(m, messageConstants.ERROR);
                                em.should.not.be.null();
                                em.error.should.equal(constants.messages.COULD_NOT_ACCEPT_TEAM_NAME_REQUEST_NOT_CONTESTANT_TEAM_OR_TEAM_LEADER);
                                done();
                            });
                    });
                });
            });
            it('should not allow it when session is complete', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var cc = helper.createClient();
                    var sessionId = rm.sessionId;

                    // Join
                    var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                    rqm.sessionId = sessionId;
                    rqm.username = 'Test Person';

                    cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);

                        var session = helper.getLatestSession();
                        session.complete();

                        var req = messageFactory.create(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE);
                        req.sessionId = sessionId;
                        req.contestantId = rm.contestantId;
                        req.teamName = 'New team name';

                        cc.emit(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE, req,
                            function(m) {
                                var em = messageFactory.restore(m, messageConstants.ERROR);
                                em.should.not.be.null();
                                em.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED);
                                done();
                            });
                    });
                });
            });
            it('should not allow it when setting do not allow it', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.MANUAL;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var cc = helper.createClient();
                    var sessionId = rm.sessionId;

                    // Join
                    var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                    rqm.sessionId = sessionId;
                    rqm.username = 'Test Person';

                    cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);

                        var req = messageFactory.create(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE);
                        req.sessionId = sessionId;
                        req.contestantId = rm.contestantId;
                        req.teamName = 'New team name';

                        cc.emit(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE, req,
                            function(m) {
                                var em = messageFactory.restore(m, messageConstants.ERROR);
                                em.should.not.be.null();
                                em.error.should.equal(constants.messages.COULD_NOT_ACCEPT_TEAM_NAME_SETTINGS_NOT_ALLOW);
                                done();
                            });
                    });
                });
            });
            it('should not allow it when team name contains profanity', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var cc = helper.createClient();
                    var sessionId = rm.sessionId;

                    // Join
                    var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                    rqm.sessionId = sessionId;
                    rqm.username = 'Test Person';

                    cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);

                        var req = messageFactory.create(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE);
                        req.sessionId = sessionId;
                        req.contestantId = rm.contestantId;
                        req.teamName = 'The word penis is funny #YOLO';

                        cc.emit(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE, req,
                            function(m) {
                                var em = messageFactory.restore(m, messageConstants.ERROR);
                                em.should.not.be.null();
                                em.error.should.equal(constants.messages.COULD_NOT_ACCEPT_TEAM_NAME_CONTAINS_PROFANITY);
                                done();
                            });
                    });
                });
            });
            it('should update observers when accepted', function(done) {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var cc = helper.createClient();
                    var sessionId = rm.sessionId;

                    // Join
                    var rqm = messageFactory.create(messageConstants.CONTESTANT_JOIN_REQUEST);
                    rqm.sessionId = sessionId;
                    rqm.username = 'Test Person';

                    cc.on(messageConstants.OBSERVER_UPDATE, function(m) {
                        var om = messageFactory.restore(m, messageConstants.OBSERVER_UPDATE);
                        if (om.gameState.teams && om.gameState.teams.length) {
                            if (om.gameState.teams[0].teamName === 'New team name') {
                                done();
                            }
                        }
                    });

                    cc.emit(messageConstants.CONTESTANT_JOIN_REQUEST, rqm, function(m) {
                        var rm = messageFactory.restore(m, messageConstants.CONTESTANT_JOIN_RESPONSE);

                        var req = messageFactory.create(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE);
                        req.sessionId = sessionId;
                        req.contestantId = rm.contestantId;
                        req.teamName = 'New team name';

                        cc.emit(messageConstants.SET_TEAM_NAME_REQUEST_MESSAGE, req,
                            function(m) {
                                var sm = messageFactory.restore(m, messageConstants.SUCCESS);
                                sm.should.not.be.null();
                            });
                    });
                });
            });
        });
    });
});
