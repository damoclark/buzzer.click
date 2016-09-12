/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var ContestantBuzzerPress = require('../../../../lib/message/ContestantBuzzerPress');

describe('ContestantBuzzerPress', function() {
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new ContestantBuzzerPress();
            m.isValid().should.be.true();
        });
    });
});
