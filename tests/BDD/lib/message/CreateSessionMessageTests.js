/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var CreateSessionMessage = require('../../../../lib/message/CreateSessionMessage');
var Settings = require('../../../../lib/Settings');

describe('CreateSessionMessage', function() {
    describe('#settings', function() {
        it('should set value',
            function() {
                var m = new CreateSessionMessage();
                var s = new Settings();
                m.settings = s;
                m.data._settings.should.equal(s);
            });
        it('should get value',
            function() {
                var m = new CreateSessionMessage();
                var s = new Settings();
                m.data._settings = s;
                m.settings.should.equal(s);
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new CreateSessionMessage();
            var s = new Settings();
            m.settings = s;
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new CreateSessionMessage();
            var s = new Settings();
            s._maxTeams = 'invalid';
            m.settings = s;
            m.isValid().should.be.false();
        });
    });
});
