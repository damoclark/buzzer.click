/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var ContestantJoinResponseMessage = require('../../../../lib/message/ContestantJoinResponseMessage');

describe('ContestantJoinResponseMessage', function() {
    describe('#wasSuccessful', function() {
        it('should set value',
            function() {
                var m = new ContestantJoinResponseMessage();
                m.wasSuccessful = true;
                m.data._wasSuccessful.should.be.true();
            });
        it('should get value',
            function() {
                var m = new ContestantJoinResponseMessage();
                m.data._wasSuccessful = true;
                m.wasSuccessful.should.be.true();
            });
    });
    describe('#enquireForTeamLeaderPosition', function() {
        it('should set value',
            function() {
                var m = new ContestantJoinResponseMessage();
                m.enquireForTeamLeaderPosition = true;
                m.data._enquireForTeamLeaderPosition.should.be.true();
            });
        it('should get value',
            function() {
                var m = new ContestantJoinResponseMessage();
                m.data._enquireForTeamLeaderPosition = true;
                m.enquireForTeamLeaderPosition.should.be.true();
            });
    });    
    describe('#failedRequestReason', function() {
        it('should set value',
            function() {
                var m = new ContestantJoinResponseMessage();
                m.failedRequestReason = 'session full';
                m.data._failedRequestReason.should.equal('session full');
            });
        it('should get value',
            function() {
                var m = new ContestantJoinResponseMessage();
                m.data._failedRequestReason = 'session full';
                m.failedRequestReason.should.equal('session full');
            });
    });    
    describe('#contestantId', function() {
        it('should set value',
            function() {
                var m = new ContestantJoinResponseMessage();
                m.contestantId = 'xyz123';
                m.data._contestantId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new ContestantJoinResponseMessage();
                m.data._contestantId = 'xyz123';
                m.contestantId.should.equal('xyz123');
            });
    });
    describe('#mustChooseTeam', function() {
        it('should set value',
            function() {
                var m = new ContestantJoinResponseMessage();
                m.mustChooseTeam = true;
                m.data._mustChooseTeam.should.be.true();
            });
        it('should get value',
            function() {
                var m = new ContestantJoinResponseMessage();
                m.data._mustChooseTeam = true;
                m.mustChooseTeam.should.be.true();
            });
    }); 
    describe('#teams', function() {
        it('should set value',
            function() {
                var m = new ContestantJoinResponseMessage();
                m.teams = ['t1', 't2'];
                m.data._teams[0].should.equal('t1');
            });
        it('should get value',
            function() {
                var m = new ContestantJoinResponseMessage();
                m.data._teams = ['t1', 't2'];
                m.teams[0].should.equal('t1');
            });
    });            
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new ContestantJoinResponseMessage();
            m.wasSuccessful = true;
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new ContestantJoinResponseMessage();
            m.isValid().should.be.false();
        });
    });
});
