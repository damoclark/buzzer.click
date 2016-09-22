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
    describe('#sessionId', function() {
        it('should set value',
            function() {
                var m = new SetTeamNameRequestMessage();
                m.sessionId = 'xyz123';
                m.data._sessionId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new SetTeamNameRequestMessage();
                m.data._sessionId = 'xyz123';
                m.sessionId.should.equal('xyz123');
            });
    });
    describe('#contestantId', function() {
        it('should set value',
            function() {
                var m = new SetTeamNameRequestMessage();
                m.contestantId = 'xyz123';
                m.data._contestantId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new SetTeamNameRequestMessage();
                m.data._contestantId = 'xyz123';
                m.contestantId.should.equal('xyz123');
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new SetTeamNameRequestMessage();
            m.teamName = 'xyz123';
            m.sessionId = '1234';
            m.contestantId = '2jj';
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new SetTeamNameRequestMessage();
            m.isValid().should.be.false();
        });
    });
});
