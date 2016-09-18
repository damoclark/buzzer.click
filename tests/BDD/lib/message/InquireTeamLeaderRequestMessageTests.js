/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var InquireTeamLeaderRequestMessage = require('../../../../lib/message/InquireTeamLeaderRequestMessage');

describe('InquireTeamLeaderRequestMessage', function() {
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new InquireTeamLeaderRequestMessage();
            m.isValid().should.be.true();
        });
    });
});
