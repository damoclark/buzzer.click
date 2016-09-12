/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var SessionCompleted = require('../../../../lib/message/SessionCompleted');

describe('SessionCompleted', function() {
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new SessionCompleted();
            m.isValid().should.be.true();
        });
    });
});
