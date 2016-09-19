/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var Contestant = require('../../../lib/Contestant');

describe('Contestant', function() {
    describe('#username', function() {
        it('should set value',
            function() {
                var c = new Contestant();
                c.username = 'username_test';
                c._username.should.equal('username_test');
            });
        it('should get value',
            function() {
                var c = new Contestant();
                c._username = 'username_test';
                c.username.should.equal('username_test');
            });
    });
    describe('#score', function() {
        it('should throw on set value',
            function() {
                var c = new Contestant();
                (function() {
                    c.score = false;
                }).should.throw();
            });
        it('should get value',
            function() {
                var c = new Contestant();
                c._score = 1;
                c.score.should.equal(1);
            });
    });
    describe('#incrementScore()', function() {
        it('should increment the contestant\'s score',
            function() {
                var c = new Contestant();
                c.incrementScore();
                c.score.should.equal(1);
            });
        it('should emit scoreUpdate event', function(done) {
            var c = new Contestant();
            c.on('scoreUpdate', function() {
                done();
            });
            c.incrementScore();
        });            
    });
});
