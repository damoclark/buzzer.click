/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var Participants = require('../../../lib/Participants');
var Participant = require('../../../lib/Participant');

describe('Participants', function() {
    describe('#all', function() {
        it('should throw on set value', function() {
            var pc = new Participants();
            (function() {
                pc.all = [];
            }).should.throw();
        });
        it('should get value', function() {
            p = new Participant();
            p.id = 'p1';
            var pc = new Participants();
            pc.add(p);
            pc.all[0].should.equal(p);
        });
        it('should get copy of val and not reference',
            function() {
                p = new Participant();
                p.id = 'p1';
                var pc = new Participants();
                pc.add(p);
                pc.all.pop();
                pc.all[0].should.equal(p);
            });
    });
    describe('#length', function() {
        it('should throw on set value', function() {
            var pc = new Participants();
            (function() {
                pc.length = [];
            }).should.throw();
        });
        it('should get value', function() {
            p = new Participant();
            p.id = 'p1';
            var pc = new Participants();
            pc.length.should.equal(0);
            pc.add(p);
            pc.length.should.equal(1);
        });
    });
    describe('#contains(id)', function() {
        it('should return true when id does exist', function() {
            p = new Participant();
            p.id = 'p1';
            pc = new Participants();
            pc.add(p);
            pc.contains(p.id).should.be.true();
        });
        it('should return false when id does not exist', function() {
            p = new Participant();
            p.id = 'p1';
            pc = new Participants();
            pc.add(p);
            pc.contains('p2').should.be.false();
        });
    });
    describe('#add(participant)', function() {
        it('should add the given participant', function() {
            p = new Participant();
            p.id = 'p1';
            pc = new Participants();
            pc.add(p);
            pc._participants.length.should.equal(1);
            pc._participants[0].should.equal(p);
        });
        it('should error if participant with id already exists', function() {
            p = new Participant();
            p.id = 'p1';
            pc = new Participants();
            pc.add(p);
            (function() {
                pc.add(p);
            }).should.throw();
        });
    });
    describe('#remove(participant)', function() {
        it('should remove the existing participant', function() {
            p = new Participant();
            p.id = 'p1';
            pc = new Participants();
            pc.add(p);
            pc.length.should.equal(1);
            pc.remove(p).should.be.true();
            pc.length.should.equal(0);
        });
        it('should not remove the non-existing participant', function() {
            p1 = new Participant();
            p1.id = 'p1';
            p2 = new Participant();
            p2.id = 'p2';
            pc = new Participants();
            pc.add(p2);
            pc.length.should.equal(1);
            pc.remove(p1).should.be.false();
            pc.length.should.equal(1);
        });
    });
    describe('#removeById(id)', function() {
        it('should remove the existing participant', function() {
            p = new Participant();
            p.id = 'p1';
            pc = new Participants();
            pc.add(p);
            pc.length.should.equal(1);
            pc.removeById(p.id).should.be.true();
            pc.length.should.equal(0);
        });
        it('should not remove the non-existing participant', function() {
            p1 = new Participant();
            p1.id = 'p1';
            p2 = new Participant();
            p2.id = 'p2';
            pc = new Participants();
            pc.add(p2);
            pc.length.should.equal(1);
            pc.removeById(p1.id).should.be.false();
            pc.length.should.equal(1);
        });
    });
});
