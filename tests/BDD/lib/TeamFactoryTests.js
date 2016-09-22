/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var teamFactory = require('../../../lib/TeamFactory');
var Settings = require('../../../lib/Settings');
var Teams = require('../../../lib/Teams');

describe('TeamFactory', function() {
    describe('#create(teams, settings)', function() {
        it('should throw when settings.maxTeams is less than 1',
            function() {
                var s = new Settings();
                var tc = new Teams();
                (function(){
                    teamFactory.create(tc, s);
                }).should.throw();
            });
        it('should create the correct amount of teams',
            function() {
                var s = new Settings();
                s.maxTeams = 5;
                var tc = new Teams();
                tc.length.should.equal(0);
                teamFactory.create(tc, s);
                tc.length.should.equal(5);
            });
        it('should not fail with a large team size',
            function() {
                var s = new Settings();
                s.maxTeams = 500;
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
    });
});
