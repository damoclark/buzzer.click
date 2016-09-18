/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var InquireTeamLeaderRequestResponseMessage = require('../../../../lib/message/InquireTeamLeaderRequestResponseMessage');

describe('InquireTeamLeaderRequestResponseMessage', function() {
    describe('#decision', function() {
        it('should set value',
            function() {
                var m = new InquireTeamLeaderRequestResponseMessage();
                m.decision = true;
                m.data._decision.should.be.true();
            });
        it('should get value',
            function() {
                var m = new InquireTeamLeaderRequestResponseMessage();
                m.data._decision = true;
                m.decision.should.be.true();
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new InquireTeamLeaderRequestResponseMessage();
            m.decision = true;
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new InquireTeamLeaderRequestResponseMessage();
            m.isValid().should.be.false();
        });
    });
});
