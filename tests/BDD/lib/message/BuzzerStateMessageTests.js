/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var BuzzerStateMessage = require('../../../../lib/message/BuzzerStateMessage');
var constants = require('../../../../lib/Constants');

describe('BuzzerStateMessage', function() {
    describe('#state', function() {
        it('should set value',
            function() {
                var m = new BuzzerStateMessage();
                m.state = constants.hostBuzzerState.RESET;
                m.data._state.should.equal(constants.hostBuzzerState.RESET);
            });
        it('should get value',
            function() {
                var m = new BuzzerStateMessage();
                m.data._state = constants.hostBuzzerState.RESET;
                m.state.should.equal(constants.hostBuzzerState.RESET);
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new BuzzerStateMessage();
            m.state = constants.hostBuzzerState.RESET;
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new BuzzerStateMessage();
            m.state = 99;
            m.isValid().should.be.false();
        });
    });
});
