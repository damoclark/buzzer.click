/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var BuzzerActionCommandMessage = require('../../../../lib/message/BuzzerActionCommandMessage');
var constants = require('../../../../lib/Constants');

describe('BuzzerActionCommandMessage', function() {
    describe('#action', function() {
        it('should set value',
            function() {
                var m = new BuzzerActionCommandMessage();
                m.action = constants.buzzerActionCommands.RESET;
                m.data._action.should.equal(constants.buzzerActionCommands.RESET);
            });
        it('should get value',
            function() {
                var m = new BuzzerActionCommandMessage();
                m.data._action = constants.buzzerActionCommands.RESET;
                m.action.should.equal(constants.buzzerActionCommands.RESET);
            });
    });
    describe('#sessionId', function() {
        it('should set value',
            function() {
                var m = new BuzzerActionCommandMessage();
                m.sessionId = 'xyz123';
                m.data._sessionId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new BuzzerActionCommandMessage();
                m.data._sessionId = 'xyz123';
                m.sessionId.should.equal('xyz123');
            });
    });
    describe('#hostId', function() {
        it('should set value',
            function() {
                var m = new BuzzerActionCommandMessage();
                m.hostId = 'xyz123';
                m.data._hostId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new BuzzerActionCommandMessage();
                m.data._hostId = 'xyz123';
                m.hostId.should.equal('xyz123');
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new BuzzerActionCommandMessage();
            m.action = constants.buzzerActionCommands.RESET;
            m.hostId = 'xyz123';
            m.sessionId = 'yyy123';
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new BuzzerActionCommandMessage();
            m.action = 99;
            m.isValid().should.be.false();
        });
    });
});
