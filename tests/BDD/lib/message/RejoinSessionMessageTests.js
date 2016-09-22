/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var constants = require('../../../../lib/constants');
var RejoinSessionMessage = require('../../../../lib/message/RejoinSessionMessage');

describe('RejoinSessionMessage', function() {
    describe('#rejoinAs', function() {
        it('should set value',
            function() {
                var m = new RejoinSessionMessage();
                m.rejoinAs = constants.rejoinAs.HOST;
                m.data._rejoinAs.should.equal(constants.rejoinAs.HOST);
            });
        it('should get value',
            function() {
                var m = new RejoinSessionMessage();
                m.data._rejoinAs = constants.rejoinAs.HOST;
                m.rejoinAs.should.equal(constants.rejoinAs.HOST);
            });
    });
    describe('#sessionId', function() {
        it('should set value',
            function() {
                var m = new RejoinSessionMessage();
                m.sessionId = 'xyz123';
                m.data._sessionId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new RejoinSessionMessage();
                m.data._sessionId = 'xyz123';
                m.sessionId.should.equal('xyz123');
            });
    });
    describe('#participantId', function() {
        it('should set value',
            function() {
                var m = new RejoinSessionMessage();
                m.participantId = 'xyz123';
                m.data._participantId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new RejoinSessionMessage();
                m.data._participantId = 'xyz123';
                m.participantId.should.equal('xyz123');
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new RejoinSessionMessage();
            m.sessionId = 'xyz123';
            m.participantId = 'xyz123';
            m.rejoinAs = constants.rejoinAs.OBSERVER;
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new RejoinSessionMessage();
            m.sessionId = 'xyz123';
            m.isValid().should.be.false();
        });
    });
});
