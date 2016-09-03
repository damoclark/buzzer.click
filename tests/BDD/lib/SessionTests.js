/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var Session = require('../../../lib/Session');
var Settings = require('../../../lib/Settings');
var Host = require('../../../lib/Host');
var Contestant = require('../../../lib/Contestant');
var Observer = require('../../../lib/Observer');
var AddContestantResponse = require('../../../lib/AddContestantResponse');

var id = 'id_test';
var settings = new Settings();
var host = new Host();

describe('Session', function() {
    describe('#id', function() {
        it('should throw on set value',
            function() {
                var s = new Session(id, settings, host);
                (function() {
                    s.id = 'SomeId';
                }).should.throw();
            });
        it('should get value',
            function() {
                var s = new Session(id, settings, host);
                s.id.should.equal('id_test');
            });
    });
    describe('#roundsPlayed', function() {
        it('should throw on set value',
            function() {
                var s = new Session(id, settings, host);
                (function() {
                    s.roundsPlayed = 'SomeId';
                }).should.throw();
            });
        it('should get value',
            function() {
                var s = new Session(id, settings, host);
                s._roundsPlayed = 1;
                s.roundsPlayed.should.equal(1);
            });
    });
    describe('#isSessionCompleted', function() {
        //TODO: add tests. Requires FSM.
    });
    describe('#observers', function() {
        it('should throw on set value',
            function() {
                var s = new Session(id, settings, host);
                (function() {
                    s.observers = [];
                }).should.throw();
            });
        it('should get value',
            function() {
                var s = new Session(id, settings, host);
                var observer = new Observer();
                observer.id = 'ob1';
                var contestant = new Contestant();
                contestant.id = 'con1';
                s._participants.add(observer);
                s._participants.add(contestant);
                s.observers.length.should.equal(1);
                s.observers[0].should.equal(observer);
            });
    });
    describe('#contestants', function() {
        it('should throw on set value',
            function() {
                var s = new Session(id, settings, host);
                (function() {
                    s.contestants = [];
                }).should.throw();
            });
        it('should get value',
            function() {
                var s = new Session(id, settings, host);
                var observer = new Observer();
                observer.id = 'ob1';
                var contestant = new Contestant();
                contestant.id = 'con1';
                s._participants.add(observer);
                s._participants.add(contestant);
                s.contestants.length.should.equal(1);
                s.contestants[0].should.equal(contestant);
            });
    });
    describe('#host', function() {
        it('should throw on set value',
            function() {
                var s = new Session(id, settings, host);
                (function() {
                    s.host = host;
                }).should.throw();
            });
        it('should get value',
            function() {
                var s = new Session(id, settings, host);
                s.host.should.equal(host);
            });
    });
    describe('#incrementRoundsPlayed()', function() {
        it('should increment rounds played',
            function() {
                var s = new Session(id, settings, host);
                s._roundsPlayed = 1;
                s.incrementRoundsPlayed();
                s.roundsPlayed.should.equal(2);
            });
    });
    describe('#addContestant(contestant)', function() {
        //TODO: add tests. Requires method to be completed.
    });
});
