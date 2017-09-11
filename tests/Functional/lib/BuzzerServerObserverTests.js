/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var Settings = require('../../../lib/Settings');
var messageFactory = require('../../../lib/MessageFactory');
var successMessage = require('../../../lib/message/SuccessMessage');
var constants = require('../../../lib/Constants');
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
        describe('info request', function() {
            it('should return in a valid state for individuals contestant', function(done) {
                var s = new Settings();
                s.maxContestants = 1;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;

                    var req = messageFactory.create(messageConstants.SESSION_INFORMATION_REQUEST_MESSAGE);
                    req.sessionId = sessionId;

                    var oc = helper.createClient();

                    oc.emit(messageConstants.SESSION_INFORMATION_REQUEST_MESSAGE, req, function(rm) {
                        var irm = messageFactory.restore(rm, messageConstants.SESSION_INFORMATION_RESPONSE_MESSAGE);
                        irm.should.not.be.null();

                        should(irm.info).not.be.null();
                        should(irm.info.host).be.null();
                        should(irm.info.contestant).be.null();
                        should(irm.info.team).be.null();
                        should(irm.info.session).not.be.null();
                        should(irm.info.sessionState).be.equal('ready');
                        should(irm.info.isObserver).be.true();
                        should(irm.info.isHost).be.false();
                        should(irm.info.isContestant).be.false();
                        should(irm.info.isSessionCompleted).be.false();
                        done();
                    });
                });
            });
            it('should not allow when session does not exist', function(done) {
                var s = new Settings();
                s.maxContestants = 1;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {

                    var req = messageFactory.create(messageConstants.SESSION_INFORMATION_REQUEST_MESSAGE);
                    req.sessionId = idUtility.generateSessionId();

                    var oc = helper.createClient();

                    oc.emit(messageConstants.SESSION_INFORMATION_REQUEST_MESSAGE, req, function(rm) {
                        var em = messageFactory.restore(rm, messageConstants.ERROR);
                        em.error.should.equal(constants.messages.SESSION_COULD_NOT_BE_FOUND);
                        done();
                    });
                });
            });
            it('should allow when session is complete', function(done) {
                var s = new Settings();
                s.maxContestants = 1;

                var hc = helper.createClient();
                helper.createSession(hc, s, function(rm) {
                    var sessionId = rm.sessionId;

                    var req = messageFactory.create(messageConstants.SESSION_INFORMATION_REQUEST_MESSAGE);
                    req.sessionId = sessionId;

                    var session = helper.getLatestSession();
                    session.complete();

                    var oc = helper.createClient();

                    oc.emit(messageConstants.SESSION_INFORMATION_REQUEST_MESSAGE, req, function(rm) {
                        var irm = messageFactory.restore(rm, messageConstants.SESSION_INFORMATION_RESPONSE_MESSAGE);
                        irm.should.not.be.null();
                        done();
                    });
                });
            });
        });
    });
});
