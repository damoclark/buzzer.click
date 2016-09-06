/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var TeamLeaderPositionInquiryResponseMessage = require('../../../../lib/message/TeamLeaderPositionInquiryResponseMessage');

describe('TeamLeaderPositionInquiryMessage', function() {
    describe('#response', function () {
        it('should set value',
            function () {
                var t = new TeamLeaderPositionInquiryResponseMessage();
                t.response = true;
                t.data._accepted.should.not.be.null();
                t.data._accepted.should.not.be.false();
                t.data._accepted.should.be.true();
            });
        it('should get value',
            function () {
                var t = new TeamLeaderPositionInquiryResponseMessage();
                t.data._accepted = true;
                t.response.should.not.be.null();
                t.response.should.not.be.false();
                t.response.should.be.true();
            });
        it('should not set string value, return true instead',
            function () {
                var t = new TeamLeaderPositionInquiryResponseMessage();
                t.data.response = 'test';
                t.response.should.not.be.null();
                t.response.should.be.true();
            });
    });
});
