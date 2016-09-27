/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var HostSettingsUpdateMessage = require('../../../../lib/message/HostSettingsUpdateMessage');

describe('HostSettingsUpdateMessage', function() {
    describe('#sessionName', function() {
        it('should set value',
            function() {
                var m = new HostSettingsUpdateMessage();
                m.sessionName = 'xyz123';
                m.data._sessionName.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new HostSettingsUpdateMessage();
                m.data._sessionName = 'xyz123';
                m.sessionName.should.equal('xyz123');
            });
    });
    describe('#maxTeams', function() {
        it('should set value',
            function() {
                var m = new HostSettingsUpdateMessage();
                m.maxTeams = 5;
                m.data._maxTeams.should.equal(5);
            });
        it('should get value',
            function() {
                var m = new HostSettingsUpdateMessage();
                m.data._maxTeams = 5;
                m.maxTeams.should.equal(5);
            });
    });
    describe('#teamSize', function() {
        it('should set value',
            function() {
                var m = new HostSettingsUpdateMessage();
                m.teamSize = 5;
                m.data._teamSize.should.equal(5);
            });
        it('should get value',
            function() {
                var m = new HostSettingsUpdateMessage();
                m.data._teamSize = 5;
                m.teamSize.should.equal(5);
            });
    });
    describe('#maxContestants', function() {
        it('should set value',
            function() {
                var m = new HostSettingsUpdateMessage();
                m.maxContestants = 5;
                m.data._maxContestants.should.equal(5);
            });
        it('should get value',
            function() {
                var m = new HostSettingsUpdateMessage();
                m.data._maxContestants = 5;
                m.maxContestants.should.equal(5);
            });
    });
    describe('#sessionId', function() {
        it('should set value',
            function() {
                var m = new HostSettingsUpdateMessage();
                m.sessionId = 'xyz123';
                m.data._sessionId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new HostSettingsUpdateMessage();
                m.data._sessionId = 'xyz123';
                m.sessionId.should.equal('xyz123');
            });
    });
    describe('#hostId', function() {
        it('should set value',
            function() {
                var m = new HostSettingsUpdateMessage();
                m.hostId = 'xyz123';
                m.data._hostId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new HostSettingsUpdateMessage();
                m.data._hostId = 'xyz123';
                m.hostId.should.equal('xyz123');
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new HostSettingsUpdateMessage();
            m.sessionId = '1234';
            m.hostId = '2jj';
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new HostSettingsUpdateMessage();
            m.isValid().should.be.false();
        });
    });
});
