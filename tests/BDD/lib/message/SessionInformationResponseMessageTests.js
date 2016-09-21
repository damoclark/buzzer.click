/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var SessionInformationResponseMessage = require('../../../../lib/message/SessionInformationResponseMessage');
var Session = require('../../../../lib/Session');
var Settings = require('../../../../lib/Settings');
var Host = require('../../../../lib/Host');
var idUtility = require('../../../../lib/IdentifierUtility');

var settings = new Settings();

var host = new Host();
host.id = idUtility.generateParticipantId();

var session = new Session(idUtility.generateSessionId(), settings, host);

describe('SessionInformationResponseMessage', function() {
    describe('#info', function() {
        it('should get value',
            function() {
                var m = new SessionInformationResponseMessage();
                m.populate(host, null, session);
                m.info.should.be.Object();
            });
        it('should not have ids',
            function() {
                var m = new SessionInformationResponseMessage();
                m.populate(host, null, session);
                m.info.host.should.not.be.null();
                should.not.exist(m.info.host.id);
            });
        it('should promote private field _ to public field',
            function() {
                var m = new SessionInformationResponseMessage();
                m.populate(host, null, session);
                should.not.exist(m.info._host);
                should.not.exist(m.info._session);
                should.exist(m.info.host);
                should.exist(m.info.session);
                should.exist(m.info.session.settings.teamLeaderSelectionMethod);
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new SessionInformationResponseMessage();
            m.populate(host, null, session);
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new SessionInformationResponseMessage();
            m.isValid().should.be.false();
        });
    });
});
