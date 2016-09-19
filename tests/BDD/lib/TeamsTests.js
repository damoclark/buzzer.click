/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var Teams = require('../../../lib/Teams');
var Team = require('../../../lib/Team');
var teamFactory = require('../../../lib/teamFactory');
var Settings = require('../../../lib/Settings');
var Contestant = require('../../../lib/Contestant');
var constants = require('../../../lib/Constants');

function generateContestants(numberToGenerate) {
    var contestants = [];
    for (var i = 0; i < numberToGenerate; i++) {
        var c = new Contestant();
        c.username = 'c' + i;
        contestants.push(c);
    }
    contestants.length.should.equal(numberToGenerate);
    return contestants;
}

describe('Teams', function() {
    describe('#contains(teamName)', function() {
        it('should return true when team with teamName does exist', function() {
            t = new Team();
            t.teamName = 'tameName test';
            tc = new Teams();
            tc.add(t);
            tc.contains(t.teamName).should.be.true();
        });
        it('should return false when no team with teamName does exist', function() {
            t = new Team();
            t.teamName = 'tameName test';
            tc = new Teams();
            tc.add(t);
            tc.contains('other team name').should.be.false();
        });
    });
    describe('#all', function() {
        it('should throw on set value', function() {
            var tc = new Teams();
            (function() {
                tc.all = [];
            }).should.throw();
        });
        it('should get value', function() {
            t = new Team();
            tc = new Teams();
            tc.add(t);
            tc.all[0].should.equal(t);
        });
        it('should get copy of val and not reference', function() {
            t = new Team();
            tc = new Teams();
            tc.add(t);
            tc.all.pop();
            tc.all[0].should.equal(t);
        });
    });
    describe('#length', function() {
        it('should throw on set value', function() {
            var tc = new Teams();
            (function() {
                tc.length = [];
            }).should.throw();
        });
        it('should get value', function() {
            t = new Team();
            var tc = new Teams();
            tc.length.should.equal(0);
            tc.add(t);
            tc.length.should.equal(1);
        });
    });
    describe('#add(team)', function() {
        it('should add the given team', function() {
            t = new Team();
            tc = new Teams();
            tc.add(t);
            tc.length.should.equal(1);
            tc.all[0].should.equal(t);
        });
        it('should error if team with teamName already exists', function() {
            t = new Team();
            t.teamName = 't1';
            tc = new Teams();
            tc.add(t);
            (function() {
                tc.add(t);
            }).should.throw();
        });
    });
    describe('#remove(team)', function() {
        it('should remove the existing team', function() {
            t = new Team();
            t.teamName = 't1';
            tc = new Teams();
            tc.add(t);
            tc.length.should.equal(1);
            tc.remove(t).should.be.true();
            tc.length.should.equal(0);
        });
        it('should not remove the non-existing team', function() {
            t1 = new Team();
            t1.teamName = 't1';
            t2 = new Team();
            t2.teamName = 't2';
            tc = new Teams();
            tc.add(t2);
            tc.length.should.equal(1);
            tc.remove(t1).should.be.false();
            tc.length.should.equal(1);
        });
    });
    describe('#removeByTeamName(team)', function() {
        it('should remove the existing team', function() {
            t = new Team();
            t.teamName = 't1';
            tc = new Teams();
            tc.add(t);
            tc.length.should.equal(1);
            tc.removeByTeamName(t.teamName).should.be.true();
            tc.length.should.equal(0);
        });
        it('should ignore team name case', function() {
            t = new Team();
            t.teamName = 'abc1';
            tc = new Teams();
            tc.add(t);
            tc.length.should.equal(1);
            tc.removeByTeamName('ABC1').should.be.true();
            tc.length.should.equal(0);
        });
        it('should not remove the non-existing team', function() {
            t1 = new Team();
            t1.teamName = 't1';
            t2 = new Team();
            t2.teamName = 't2';
            tc = new Teams();
            tc.add(t2);
            tc.length.should.equal(1);
            tc.removeByTeamName(t1.teamName).should.be.false();
            tc.length.should.equal(1);
        });
    });
    describe('addContestant(contestant, settings, inquireTeamLeaderCallback, inquireTeamNameCallback)', function() {
        it('should give contestant an id', function() {
            var s = new Settings();
            s.hasTeams = true;
            s.maxTeams = 1;
            s.teamSize = 1;

            var tc = new Teams();
            teamFactory.create(tc, s);

            var c = new Contestant();
            c.username = 'Username';
            should(c.id).be.null();

            tc.addContestant(c, s, function() {
                return false;
            });

            should(c.id).not.be.null();
        });
        describe('when teams are full', function() {
            it('should return a valid response', function() {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;

                var t = new Team();
                t.teamName = 't1';

                var tc = new Teams();
                tc.add(t);

                var c1 = new Contestant();
                c1.username = 'c1';
                var c2 = new Contestant();
                c2.username = 'c1';

                var [r, em] = tc.addContestant(c1, s, function() {});
                r.should.be.true();
                should.not.exist(em);

                [r, em] = tc.addContestant(c1, s, function() {});
                r.should.be.false();
                em.should.equal(constants.messages.TEAMS_ARE_FULL);
            });
        });
        describe('when teamLeader selection is PLAYER_CHOICE', function() {
            it('should inquire for team leader', function() {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.PLAYER_CHOICE;

                var tc = new Teams();
                teamFactory.create(tc, s);

                var c1 = new Contestant();
                c1.username = 'c1';

                var inquired = false;

                var [r] = tc.addContestant(c1, s, function() {
                    inquired = true;
                });
                r.should.be.true();
                inquired.should.be.true();
            });
            it('should not inquire for team leader', function() {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 2;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.PLAYER_CHOICE;

                var t = new Team();
                t.teamName = 't1';

                var tc = new Teams();
                tc.add(t);

                var c1 = new Contestant();
                c1.username = 'c1';

                var c2 = new Contestant();
                c2.username = 'c2';

                var [r] = tc.addContestant(c1, s, function() {});
                r.should.be.true();
                tc.all[0].teamLeader = c1;

                var didNotInquire = true;
                tc.addContestant(c2, s, function() {
                    didNotInquire = false;
                });
                didNotInquire.should.be.true();

                t.teamLeader.should.equal(c1);
            });
            it('should not add contestant as teamLeader', function() {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 1;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.PLAYER_CHOICE;

                var t = new Team();
                t.teamName = 't1';

                var tc = new Teams();
                tc.add(t);

                var c1 = new Contestant();
                c1.username = 'c1';

                var [r] = tc.addContestant(c1, s, function() {});
                r.should.be.true();

                should(t.teamLeader).be.null();
            });
        });
        describe('when teamLeader selection is RANDOM', function() {
            it('should not inquire for team leader', function() {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 1;
                s.teamSize = 2;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var t = new Team();
                t.teamName = 't1';

                var tc = new Teams();
                tc.add(t);

                var c1 = new Contestant();
                c1.username = 'c1';

                var notInquired = true;

                var [r] = tc.addContestant(c1, s, function() {
                    notInquired = false;
                    return false;
                });
                r.should.be.true();
                notInquired.should.be.true();
            });
            it('should automatically add team leader when team is filled', function() {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 2;
                s.teamSize = 2;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var tc = new Teams();
                teamFactory.create(tc, s);

                var cc = generateContestants(4);

                cc.forEach(function(c) {
                    tc.addContestant(c, s, function() {});
                });

                tc.length.should.equal(2);
                tc.all.forEach(function(t) {
                    should(t.teamLeader).not.be.null();
                });
            });
            it('should not automatically add team leader when team is not filled', function() {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 2;
                s.teamSize = 3;
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;

                var tc = new Teams();
                teamFactory.create(tc, s);

                var cc = generateContestants(4);

                cc.forEach(function(c) {
                    tc.addContestant(c, s, function() {});
                });

                tc.length.should.equal(2);
                tc.all.forEach(function(t) {
                    should(t.teamLeader).be.null();
                });
            });
        });
    });
    describe('getByContestant(contestant)', function() {
        it('should get team of contestant', function() {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 5;
                s.teamSize = 1;

                var tc = new Teams();
                teamFactory.create(tc, s);

                var cc = generateContestants(5);

                cc.forEach(function(c) {
                    var [r] = tc.addContestant(c, s, function() {});
                    r.should.be.true();
                });

                var t = tc.getByContestant(cc[4]);
                t.should.not.be.null();
                t.contestants.getById(cc[4].id).should.equal(cc[4]);
        });
        it('should not get team of contestant', function() {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 5;
                s.teamSize = 1;

                var tc = new Teams();
                teamFactory.create(tc, s);

                var cc = generateContestants(1);
                cc[0].id = 'c1';

                var t = tc.getByContestant(cc[0]);
                should(t).be.null();
        });
    });
});
