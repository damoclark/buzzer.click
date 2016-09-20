/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var HostTeamNameUpdateRequestMessage = require('../../../../lib/message/HostTeamNameUpdateRequestMessage');

describe('HostTeamNameUpdateRequestMessage', function() {
    describe('#teamNameFrom', function() {
        it('should set value',
            function() {
                var m = new HostTeamNameUpdateRequestMessage();
                m.teamNameFrom = 'xyz123';
                m.data._teamNameFrom.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new HostTeamNameUpdateRequestMessage();
                m.data._teamNameFrom = 'xyz123';
                m.teamNameFrom.should.equal('xyz123');
            });
    });
    describe('#teamNameTo', function() {
        it('should set value',
            function() {
                var m = new HostTeamNameUpdateRequestMessage();
                m.teamNameTo = 'xyz123';
                m.data._teamNameTo.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new HostTeamNameUpdateRequestMessage();
                m.data._teamNameTo = 'xyz123';
                m.teamNameTo.should.equal('xyz123');
            });
    });
    describe('#sessionId', function() {
        it('should set value',
            function() {
                var m = new HostTeamNameUpdateRequestMessage();
                m.sessionId = 'xyz123';
                m.data._sessionId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new HostTeamNameUpdateRequestMessage();
                m.data._sessionId = 'xyz123';
                m.sessionId.should.equal('xyz123');
            });
    });
    describe('#hostId', function() {
        it('should set value',
            function() {
                var m = new HostTeamNameUpdateRequestMessage();
                m.hostId = 'xyz123';
                m.data._hostId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new HostTeamNameUpdateRequestMessage();
                m.data._hostId = 'xyz123';
                m.hostId.should.equal('xyz123');
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new HostTeamNameUpdateRequestMessage();
            m.teamNameFrom = '123xyz';
            m.teamNameTo = 'xyz123';
            m.sessionId = '1234';
            m.hostId = '2jj';
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new HostTeamNameUpdateRequestMessage();
            m.isValid().should.be.false();
        });
    });
});
