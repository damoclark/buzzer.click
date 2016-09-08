/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var SuccessMessage = require('../../../../lib/message/SuccessMessage');

describe('SuccessMessage', function() {
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new SuccessMessage();
            m.isValid().should.be.true();
        });
    });
});
