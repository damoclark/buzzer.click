/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var CreateSessionResponseMessage = require('../../../../lib/message/CreateSessionResponseMessage');

describe('CreateSessionResponseMessage', function() {
    describe('#sessionId', function() {
        it('should set value',
            function() {
                var m = new CreateSessionResponseMessage();
                m.sessionId = 'xyz123';
                m.data._sessionId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new CreateSessionResponseMessage();
                m.data._sessionId = 'xyz123';
                m.sessionId.should.equal('xyz123');
            });
    });
    describe('#hostId', function() {
        it('should set value',
            function() {
                var m = new CreateSessionResponseMessage();
                m.hostId = 'xyz123';
                m.data._hostId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new CreateSessionResponseMessage();
                m.data._hostId = 'xyz123';
                m.hostId.should.equal('xyz123');
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new CreateSessionResponseMessage();
            m.sessionId = 'xyz123';
            m.hostId = 'xyz123';
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new CreateSessionResponseMessage();
            m.sessionId = 'xyz123';
            m.isValid().should.be.false();
        });
    });
});
