/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var Team = require('../../../lib/Team');
var Contestant = require('../../../lib/Contestant');
var Participants = require('../../../lib/Participants');
var Settings = require('../../../lib/Settings');
var constants = require('../../../lib/Constants');

describe('Team', function() {
    describe('#teamName', function() {
        it('should set value',
            function() {
                var t = new Team();
                t.teamName = 'teamName_test';
                t._teamName.should.equal('teamName_test');
            });
        it('should get value',
            function() {
                var t = new Team();
                t._teamName = 'teamName_test';
                t.teamName.should.equal('teamName_test');
            });
    });
    describe('#teamLeader', function() {
        it('should set value',
            function() {
                var t = new Team();
                var c = new Contestant();
                t.teamLeader = c;
                t._teamLeader.should.equal(c);
            });
        it('should get value',
            function() {
                var t = new Team();
                var c = new Contestant();
                t._teamLeader = c;
                t.teamLeader.should.equal(c);
            });
    });
    describe('#score', function() {
        it('should throw on set value',
            function() {
                var t = new Team();
                (function() {
                    t.score = 1;
                }).should.throw();
            });
        it('should get value',
            function() {
                var p = new Team();
                p._score = 5;
                p.score.should.equal(5);
            });
    });
    describe('#contestants', function() {
        it('should throw on set value',
            function() {
                var t = new Team();
                (function() {
                    t.score = 1;
                }).should.throw();
            });
        it('should get value',
            function() {
                var p = new Team();
                var c = p.contestants;
                c.should.be.instanceOf(Participants);
            });
    });
    describe('when a contestant scores', function() {
        it('should update the teams score', function() {
            var t = new Team();

            var c1 = new Contestant();
            c1.id = 'c1';
            c1.username = 'c1';

            var c2 = new Contestant();
            c2.id = 'c2';
            c2.username = 'c2';

            t.contestants.add(c1);
            t.contestants.add(c2);

            c1.incrementScore();
            c1.score.should.equal(1);
            t.score.should.equal(1);

            c2.incrementScore();
            c2.score.should.equal(1);
            t.score.should.equal(2);
        });
    });
    describe('tryAssignTeamLeader(contestant, hostOverride)', function() {
        it('should allow it when no team leader is set', function() {
            var t = new Team();
            var c = new Contestant();
            c.id = 'c1';
            t.contestants.add(c);
            var [r, m] = t.tryAssignTeamLeader(c, false);
            r.should.be.true();
            should.not.exist(m);
        });
        it('should not allow it when a team leader is set', function() {
            var t = new Team();
            var c1 = new Contestant();
            c1.id = 'c1';
            var c2 = new Contestant();
            c2.id = 'c2';
            t.contestants.add(c1);
            t.contestants.add(c2);
            var [r, m] = t.tryAssignTeamLeader(c1, false);
            r.should.be.true();
            [r, m] = t.tryAssignTeamLeader(c2, false);
            r.should.be.false();
            m.should.equal(constants.messages.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_FULFILLED);
        });
        it('should not allow it when a contestant is not in team', function() {
            var t = new Team();
            var c1 = new Contestant();
            c1.id = 'c1';
            var c2 = new Contestant();
            c2.id = 'c2';
            t.contestants.add(c1);
            var [r, m] = t.tryAssignTeamLeader(c2, false);
            r.should.be.false();
            m.should.equal(constants.messages.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_NOT_CONTESTANT);
        });        
        it('should allow it when a team leader is set and host override is flagged', function() {
            var t = new Team();
            var c1 = new Contestant();
            c1.id = 'c1';
            var c2 = new Contestant();
            c2.id = 'c2';
            t.contestants.add(c1);
            t.contestants.add(c2);
            var [r, m] = t.tryAssignTeamLeader(c1, false);
            r.should.be.true();
            should.not.exist(m);
            [r, m] = t.tryAssignTeamLeader(c2, true);
            r.should.be.true();
            should.not.exist(m);
        });
    });
    describe('tryChangeTeamName(teamName, settings)', function() {
        it('should change name when request is valid', function() {
            var s = new Settings();
            s.hasTeams = true;
            s.teamNameEdit = constants.teamNameEdit.ALLOW;

            var t = new Team();
            var [r, em] = t.tryChangeName('test', s);
            should.not.exist(em);
            r.should.be.true();
        });
        it('should not change name when setting do not allow it', function() {
            var s = new Settings();
            s.hasTeams = true;
            s.teamNameEdit = constants.teamNameEdit.MANUAL;

            var t = new Team();
            var [r, em] = t.tryChangeName('test', s);
            em.should.equal(constants.messages.COULD_NOT_ACCEPT_TEAM_NAME_SETTINGS_NOT_ALLOW);
            r.should.be.false();
        });
        it('should not change name when name contains profanity', function() {
            var s = new Settings();
            s.hasTeams = true;
            s.teamNameEdit = constants.teamNameEdit.ALLOW;

            var t = new Team();
            var [r, em] = t.tryChangeName('You are all an ash0le', s);
            em.should.equal(constants.messages.COULD_NOT_ACCEPT_TEAM_NAME_CONTAINS_PROFANITY);
            r.should.be.false();
        });
    });
});
