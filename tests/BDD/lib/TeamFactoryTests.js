/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var teamFactory = require('../../../lib/TeamFactory');
var Settings = require('../../../lib/Settings');
var Teams = require('../../../lib/Teams');
var constants = require('../../../lib/Constants');
var unique = require('array-unique');

describe('TeamFactory', function() {
    describe('#create(teams, settings)', function() {
        it('should throw when settings.maxTeams is less than 1',
            function() {
                var s = new Settings();
                s.hasTeams = true;
                var tc = new Teams();
                (function() {
                    teamFactory.create(tc, s);
                }).should.throw();
            });
        it('should create the correct amount of teams',
            function() {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 5;
                s.teamSize = 5;
                s.sessionName = 's';
                var tc = new Teams();
                tc.length.should.equal(0);
                teamFactory.create(tc, s);
                tc.length.should.equal(5);
            });
        it('should not fail with a large team size',
            function() {
                var s = new Settings();
                s.hasTeams = true;
                s.maxTeams = 500;
                s.teamSize = 5;
                s.sessionName = 's';
                var tc = new Teams();
                teamFactory.create(tc, s);
                tc.length.should.equal(500);

                // ensure team names are unique
                var names = [];
                tc.all.forEach(function(t) {
                    var i = names.indexOf(function(n) {
                        return n === t.teamName;
                    });
                    i.should.equal(-1);
                    names.push(t.teamName);
                });
            });
        it('should use settings.teamNames first, before random selection', function() {
            var s = new Settings();
            s.hasTeams = true;
            s.maxTeams = 10;
            s.teamSize = 5;
            s.teamNames = ['t1', 't2', 't3', 't4', 't5'];
            s.sessionName = 's';
            var tc = new Teams();
            teamFactory.create(tc, s);
            tc.all[0].teamName.should.equal('t1');
            tc.all[1].teamName.should.equal('t2');
            tc.all[2].teamName.should.equal('t3');
            tc.all[3].teamName.should.equal('t4');
            tc.all[4].teamName.should.equal('t5');

            teamFactory._names.indexOf(tc.all[5].teamName).should.be.above(-1);
            teamFactory._names.indexOf(tc.all[6].teamName).should.be.above(-1);
            teamFactory._names.indexOf(tc.all[7].teamName).should.be.above(-1);
            teamFactory._names.indexOf(tc.all[8].teamName).should.be.above(-1);
            teamFactory._names.indexOf(tc.all[9].teamName).should.be.above(-1);
        });
        it('should only create a single team when using unlimited teams', function() {
            var s = new Settings();
            s.hasTeams = true;
            s.maxTeams = constants.UNLIMITED;
            s.teamSize = 5;
            s.sessionName = 's';
            var tc = new Teams();
            teamFactory.create(tc, s);
            tc.all.length.should.equal(1);
        });
    });
    describe('#add(teams, settings)', function() {
        it('should add a team', function() {
            var s = new Settings();
            s.hasTeams = true;
            s.maxTeams = constants.UNLIMITED;
            s.teamSize = 5;
            s.sessionName = 's';
            var tc = new Teams();
            teamFactory.create(tc, s);
            tc.all.length.should.equal(1);
            teamFactory.add(tc, s);
            tc.all.length.should.equal(2);
        });
        it('should reuse team names specified in settings', function() {
            var s = new Settings();
            s.hasTeams = true;
            s.maxTeams = constants.UNLIMITED;
            s.teamSize = 5;
            s.teamNames = ['t1', 't2'];
            s.sessionName = 's';
            var tc = new Teams();
            teamFactory.create(tc, s);
            teamFactory.add(tc, s);
            tc.all[0].teamName.should.equal('t1');
            tc.all[1].teamName.should.equal('t2');
        });
        it('should factor in team names which are already in use', function() {
            var s = new Settings();
            s.hasTeams = true;
            s.maxTeams = constants.UNLIMITED;
            s.teamSize = 5;
            s.teamNames = ['t1', 't2'];
            s.sessionName = 's';
            var tc = new Teams();
            teamFactory.create(tc, s);
            for (var i = 0; i < 1000; i++) {
                teamFactory.add(tc, s);
            }
            tc.all.length.should.equal(1001);

            var names = [];
            tc.all.forEach(function(t) {
                names.push(t.teamName);
            });
            var uniqueNames = unique(names);

            names.length.should.equal(uniqueNames.length);
        });
    });
});
