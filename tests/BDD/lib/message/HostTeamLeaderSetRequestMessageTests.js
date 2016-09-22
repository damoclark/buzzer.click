/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var HostTeamLeaderSetRequestMessage = require('../../../../lib/message/HostTeamLeaderSetRequestMessage');

describe('HostTeamLeaderSetRequestMessage', function() {
    describe('#teamName', function() {
        it('should set value',
            function() {
                var m = new HostTeamLeaderSetRequestMessage();
                m.teamName = 'xyz123';
                m.data._teamName.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new HostTeamLeaderSetRequestMessage();
                m.data._teamName = 'xyz123';
                m.teamName.should.equal('xyz123');
            });
    });
    describe('#teamLeaderUsername', function() {
        it('should set value',
            function() {
                var m = new HostTeamLeaderSetRequestMessage();
                m.teamLeaderUsername = 'xyz123';
                m.data._teamLeaderUsername.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new HostTeamLeaderSetRequestMessage();
                m.data._teamLeaderUsername = 'xyz123';
                m.teamLeaderUsername.should.equal('xyz123');
            });
    });
    describe('#sessionId', function() {
        it('should set value',
            function() {
                var m = new HostTeamLeaderSetRequestMessage();
                m.sessionId = 'xyz123';
                m.data._sessionId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new HostTeamLeaderSetRequestMessage();
                m.data._sessionId = 'xyz123';
                m.sessionId.should.equal('xyz123');
            });
    });
    describe('#hostId', function() {
        it('should set value',
            function() {
                var m = new HostTeamLeaderSetRequestMessage();
                m.hostId = 'xyz123';
                m.data._hostId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new HostTeamLeaderSetRequestMessage();
                m.data._hostId = 'xyz123';
                m.hostId.should.equal('xyz123');
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new HostTeamLeaderSetRequestMessage();
            m.teamName = '123xyz';
            m.teamLeaderUsername = 'xyz123';
            m.sessionId = '1234';
            m.hostId = '2jj';
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new HostTeamLeaderSetRequestMessage();
            m.isValid().should.be.false();
        });
    });
});
