/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var Team = require('../../../lib/Team');
var Contestant = require('../../../lib/Contestant');
var Participants = require('../../../lib/Participants');

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
});
