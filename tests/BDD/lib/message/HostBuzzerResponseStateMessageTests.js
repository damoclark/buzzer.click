/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var HostBuzzerResponseStateMessage = require('../../../../lib/message/HostBuzzerResponseStateMessage');
var constants = require('../../../../lib/Constants');

describe('BuzzerStateMessage', function() {
    describe('#state', function() {
        it('should set value',
            function() {
                var m = new HostBuzzerResponseStateMessage();
                m.state = constants.hostBuzzerResponseState.RESET;
                m.data._state.should.equal(constants.hostBuzzerResponseState.RESET);
            });
        it('should get value',
            function() {
                var m = new HostBuzzerResponseStateMessage();
                m.data._state = constants.hostBuzzerResponseState.RESET;
                m.state.should.equal(constants.hostBuzzerResponseState.RESET);
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new HostBuzzerResponseStateMessage();
            m.state = constants.hostBuzzerResponseState.RESET;
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new HostBuzzerResponseStateMessage();
            m.state = 99;
            m.isValid().should.be.false();
        });
    });
});
