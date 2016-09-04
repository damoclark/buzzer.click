/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var Teams = require('../../../lib/Teams');
var Team = require('../../../lib/Team');

describe('Teams', function() {
    describe('#contains(teamName)', function() {
        it('should return true when team with teamName does exist', function() {
            t = new Team();
            t.teamName = 'tameName test';
            collection = new Teams();
            collection._teams.push(t);
            collection.contains(t.teamName).should.be.true();
        });
        it('should return false when no team with teamName does exist', function() {
            t = new Team();
            t.teamName = 'tameName test';
            collection = new Teams();
            collection._teams.push(t);
            collection.contains('other team name').should.be.false();
        });
    });
    describe('#all', function() {
        it('should throw on set value', function() {
            var collection = new Teams();
            (function() {
                collection.all = [];
            }).should.throw();
        });
        it('should get value', function() {
            t = new Team();
            collection = new Teams();
            collection._teams.push(t);
            collection.all[0].should.equal(t);
        });
        it('should get copy of val and not reference', function() {
            t = new Team();
            collection = new Teams();
            collection._teams.push(t);
            collection.all.pop();
            collection.all[0].should.equal(t);
        });
    });
    describe('#add(team)', function() {
        it('should add the given team', function() {
            t = new Team();
            collection = new Teams();
            collection.add(t);
            collection._teams.length.should.equal(1);
            collection._teams[0].should.equal(t);
        });
        it('should error if team with teamName already exists', function() {
            t = new Team();
            t.teamName = 't1';
            collection = new Teams();
            collection.add(t);
            (function() {
                collection.add(t);
            }).should.throw();
        });
    });
    describe('#remove(team)', function() {
        it('should remove the existing team', function() {
            t = new Team();
            t.teamName = 't1';
            collection = new Teams();
            collection.add(t);
            collection._teams.length.should.equal(1);
            collection.remove(t).should.be.true();
            collection._teams.length.should.equal(0);
        });
        it('should not remove the non-existing team', function() {
            t1 = new Team();
            t1.teamName = 't1';
            t2 = new Team();
            t2.teamName = 't2';
            collection = new Teams();
            collection.add(t2);
            collection._teams.length.should.equal(1);
            collection.remove(t1).should.be.false();
            collection._teams.length.should.equal(1);
        });
    });
    describe('#removeByTeamName(id)', function() {
        it('should remove the existing team', function() {
            t = new Team();
            t.teamName = 't1';
            collection = new Teams();
            collection.add(t);
            collection._teams.length.should.equal(1);
            collection.removeByTeamName(t.teamName).should.be.true();
            collection._teams.length.should.equal(0);
        });
        it('should not remove the non-existing team', function() {
            t1 = new Team();
            t1.teamName = 't1';
            t2 = new Team();
            t2.teamName = 't2';
            collection = new Teams();
            collection.add(t2);
            collection._teams.length.should.equal(1);
            collection.removeByTeamName(t1.teamName).should.be.false();
            collection._teams.length.should.equal(1);
        });
    });
    describe('#removeByTeamName(id)', function() {
        //TODO implement tests
    });
});
