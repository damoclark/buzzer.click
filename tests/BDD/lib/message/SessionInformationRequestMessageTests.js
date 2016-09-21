/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var constants = require('../../../../lib/constants');
var SessionInformationRequestMessage = require('../../../../lib/message/SessionInformationRequestMessage');

describe('SessionInformationRequestMessage', function() {
    describe('#sessionId', function() {
        it('should set value',
            function() {
                var m = new SessionInformationRequestMessage();
                m.sessionId = 'xyz123';
                m.data._sessionId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new SessionInformationRequestMessage();
                m.data._sessionId = 'xyz123';
                m.sessionId.should.equal('xyz123');
            });
    });
    describe('#participantId', function() {
        it('should set value',
            function() {
                var m = new SessionInformationRequestMessage();
                m.participantId = 'xyz123';
                m.data._participantId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new SessionInformationRequestMessage();
                m.data._participantId = 'xyz123';
                m.participantId.should.equal('xyz123');
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new SessionInformationRequestMessage();
            m.sessionId = 'xyz123';
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new SessionInformationRequestMessage();
            m.isValid().should.be.false();
        });
    });
});
