/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var InquireTeamLeaderPositionMessage = require('../../../../lib/message/InquireTeamLeaderPositionMessage');

describe('InquireTeamLeaderPositionMessage', function() {
    describe('#response', function () {
        it('should set value',
            function () {
                var i = new InquireTeamLeaderPositionMessage();
                i.response = true;
                i.response.should.not.be.null();
                i.response.should.be.true();
            });
        it('should get value',
            function () {
                var i = new InquireTeamLeaderPositionMessage();
                i.data._response = true;
                i.response.should.not.be.null();
                i.response.should.be.true();
            });
        it('should not set string, should return true',
            function () {
                var i = new InquireTeamLeaderPositionMessage();
                i.response = 'test';
                i.response.should.be.true();
            });
    });
});
