/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var SetTeamNameRequestMessage = require('../../../../lib/message/SetTeamNameRequestMessage');

describe('SetTeamNameRequestMessage', function() {
    describe('#teamName', function() {
        it('should set value',
            function() {
                var m = new SetTeamNameRequestMessage();
                m.teamName = 'xyz123';
                m.data._teamName.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new SetTeamNameRequestMessage();
                m.data._teamName = 'xyz123';
                m.teamName.should.equal('xyz123');
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new SetTeamNameRequestMessage();
            m.teamName = 'xyz123';
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new SetTeamNameRequestMessage();
            m.isValid().should.be.false();
        });
    });
});
