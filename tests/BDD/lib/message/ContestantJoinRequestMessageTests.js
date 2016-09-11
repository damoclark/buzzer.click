/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var ContestantJoinRequestMessage = require('../../../../lib/message/ContestantJoinRequestMessage');

describe('ContestantJoinRequestMessage', function() {
    describe('#username', function() {
        it('should set value',
            function() {
                var m = new ContestantJoinRequestMessage();
                m.username = 'test123';
                m.data._username.should.equal('test123');
            });
        it('should get value',
            function() {
                var m = new ContestantJoinRequestMessage();
                m.data._username = 'test123';
                m.username.should.equal('test123');
            });
    });
    describe('#sessionId', function() {
        it('should set value',
            function() {
                var m = new ContestantJoinRequestMessage();
                m.sessionId = 'xyz123';
                m.data._sessionId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new ContestantJoinRequestMessage();
                m.data._sessionId = 'xyz123';
                m.sessionId.should.equal('xyz123');
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new ContestantJoinRequestMessage();
            m.sessionId = 'xyz123';
            m.username = 'xyz123';
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new ContestantJoinRequestMessage();
            m.sessionId = 'xyz123';
            m.isValid().should.be.false();
        });
    });
});
