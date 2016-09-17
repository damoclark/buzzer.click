/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var ObserverUpdateMessage = require('../../../../lib/message/ObserverUpdateMessage');
var Session = require('../../../../lib/Session');
var Settings = require('../../../../lib/Settings');
var Host = require('../../../../lib/Host');
var idUtility = require('../../../../lib/IdentifierUtility');

var settings = new Settings();

var host = new Host();
host.id = idUtility.generateParticipantId();

var session = new Session(idUtility.generateSessionId(), settings, host);

describe('ObserverUpdateMessage', function() {
    describe('#gameState', function() {
        it('should get value',
            function() {
                var m = new ObserverUpdateMessage();
                m.populate(session);
                m.gameState.should.be.Object();
            });
        it('should not have ids',
            function() {
                var m = new ObserverUpdateMessage();
                m.populate(session);
                should.not.exist(m.gameState.id);
                should.not.exist(m.gameState.host.id);
            });
        it('should promote private field _ to public field',
            function() {
                var m = new ObserverUpdateMessage();
                m.populate(session);
                should.not.exist(m.gameState._host);
                should.not.exist(m.gameState._settings);
                should.exist(m.gameState.host);
                should.exist(m.gameState.settings);
                should.exist(m.gameState.settings.teamLeaderSelectionMethod);
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new ObserverUpdateMessage();
            m.populate(session);
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new ObserverUpdateMessage();
            m.isValid().should.be.false();
        });
    });
});
