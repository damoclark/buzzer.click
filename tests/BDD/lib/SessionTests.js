/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var Session = require('../../../lib/Session');
var Settings = require('../../../lib/Settings');
var Host = require('../../../lib/Host');
var Contestant = require('../../../lib/Contestant');
var Observer = require('../../../lib/Observer');
var constants = require('../../../lib/Constants');
var idUtility = require('../../../lib/IdentifierUtility');

var id = 'id_test';
var settings = new Settings();
var host = new Host();

describe('Session', function() {
    afterEach(function() {
        settings = new Settings();
        host = new Host();
    });
    describe('#constructor', function() {
        it('should create teams', function() {
            settings.hasTeams = true;
            settings.maxTeams = 5;
            settings.teamSize = 5;
            var s = new Session(id, settings, host);
            s.teams.length.should.equal(5);
        });
        it('should not create teams', function() {
            settings.hasTeams = false;
            var s = new Session(id, settings, host);
            should(s.teams).be.null();
        });
    });
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
    describe('#previousWinners', function() {
        it('should throw on set value',
            function() {
                var s = new Session(id, settings, host);
                (function() {
                    s.previousWinners = ['SomeWinner'];
                }).should.throw();
            });
        it('should get value',
            function() {
                var s = new Session(id, settings, host);
                s._previousWinners = ['Winner1', 'Winner2'];
                s.previousWinners.should.be.Array();
                s.previousWinners.length.should.equal(2);
                s.previousWinners[0].should.equal('Winner1');
            });
    });
    describe('#roundWinner', function() {
        it('should throw on set value',
            function() {
                var s = new Session(id, settings, host);
                (function() {
                    s.roundWinner = 'SomeWinner';
                }).should.throw();
            });
        it('should get value',
            function() {
                var s = new Session(id, settings, host);
                s._roundWinner = 'Winner1';
                s.roundWinner.should.equal('Winner1');
            });
    });
    describe('#isSessionCompleted', function() {
        var s = new Session(id, settings, host);
        s.isSessionCompleted.should.be.false();
        s.complete();
        s.isSessionCompleted.should.be.true();
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
    describe('#currentState', function() {
        it('should get value',
            function() {
                var s = new Session(id, settings, host);
                s.currentState.should.equal('ready');
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
        it('should not allow a contestant username with bad words', function() {
            settings.maxContestants = 2;

            var s = new Session(id, settings, host);

            var c = new Contestant();
            c.username = 'Penis #YOLO';

            var response = s.addContestant(c);
            response.should.not.be.null();
            response.wasSuccessful.should.be.false();
            response.errorMessage.should.equal(constants.messages.USERNAME_CONTAINS_PROFANITY);
        });
        describe('when in individual mode', function() {
            it('should add contestant when session is not full', function() {
                settings.maxContestants = 2;
                var c1 = new Contestant();
                c1.username = 'c1';
                var c2 = new Contestant();
                c2.username = 'c2';
                var s = new Session(id, settings, host);
                var response = s.addContestant(c1);
                response.should.not.be.null();
                response.wasSuccessful.should.be.true();
                response = s.addContestant(c2);
                response.should.not.be.null();
                response.wasSuccessful.should.be.true();
            });
            it('should not add contestant when session is full', function() {
                settings.maxContestants = 2;
                var c1 = new Contestant();
                c1.username = 'c1';
                var c2 = new Contestant();
                c2.username = 'c2';
                var c3 = new Contestant();
                c3.username = 'c3';
                var s = new Session(id, settings, host);
                s.addContestant(c1);
                s.addContestant(c2);
                var response = s.addContestant(c3);
                response.should.not.be.null();
                response.wasSuccessful.should.be.false();
            });
            it('should not add contestant when username is already taken', function() {
                settings.maxContestants = 2;
                var c1 = new Contestant();
                c1.username = 'c1';
                var c2 = new Contestant();
                c2.username = 'c1';
                var s = new Session(id, settings, host);
                s.addContestant(c1);
                var response = s.addContestant(c2);
                response.should.not.be.null();
                response.wasSuccessful.should.be.false();
                response.errorMessage.should.be.equal(constants.messages.USERNAME_TAKEN);
            });
            it('BUG# username case should not matter', function() {
                settings.maxContestants = 2;
                var c1 = new Contestant();
                c1.username = 'abc1';
                var c2 = new Contestant();
                c2.username = 'ABC1';
                var s = new Session(id, settings, host);
                s.addContestant(c1);
                var response = s.addContestant(c2);
                response.should.not.be.null();
                response.wasSuccessful.should.be.false();
                response.errorMessage.should.be.equal(constants.messages.USERNAME_TAKEN);
            });
            it('should allow unlimited contestants when max is set to constants.UNLIMITED', function() {
                settings.maxContestants = constants.UNLIMITED;
                var s = new Session(id, settings, host);
                for (var i = 0; i < 1000; i++) {
                    var c = new Contestant();
                    c.username = 'c' + i;
                    var response = s.addContestant(c);
                    response.wasSuccessful.should.be.true();
                }
            });
        });
        describe('when in team mode', function() {
            it('should add contestant when teams is not full', function() {
                settings.hasTeams = true;
                settings.maxTeams = 2;
                settings.teamSize = 1;
                var c1 = new Contestant();
                c1.username = 'c1';
                var c2 = new Contestant();
                c2.username = 'c2';
                var s = new Session(id, settings, host);
                var response = s.addContestant(c1);
                response.should.not.be.null();
                response.wasSuccessful.should.be.true();
                response = s.addContestant(c2);
                response.should.not.be.null();
                response.wasSuccessful.should.be.true();
            });
            it('should not add contestant when teams are full', function() {
                settings.hasTeams = true;
                settings.maxTeams = 2;
                settings.teamSize = 1;
                var c1 = new Contestant();
                c1.username = 'c1';
                var c2 = new Contestant();
                c2.username = 'c2';
                var c3 = new Contestant();
                c3.username = 'c3';
                var s = new Session(id, settings, host);
                var response = s.addContestant(c1);
                response.should.not.be.null();
                response.wasSuccessful.should.be.true();
                response = s.addContestant(c2);
                response.should.not.be.null();
                response.wasSuccessful.should.be.true();
                response = s.addContestant(c3);
                response.should.not.be.null();
                response.wasSuccessful.should.be.false();
                response.errorMessage.should.be.equal(constants.messages.TEAMS_ARE_FULL);
            });
            it('should not add contestant when username is already taken', function() {
                settings.hasTeams = true;
                settings.maxTeams = 2;
                settings.teamSize = 1;
                var c1 = new Contestant();
                c1.username = 'c1';
                var c2 = new Contestant();
                c2.username = 'c1';
                var s = new Session(id, settings, host);
                s.addContestant(c1);
                var response = s.addContestant(c2);
                response.should.not.be.null();
                response.wasSuccessful.should.be.false();
                response.errorMessage.should.be.equal(constants.messages.USERNAME_TAKEN);
            });
        });
    });
    describe('#subscribeForStateChange(event, callback)', function() {
        it('should subscribe callback to the correct event', function(done) {
            var c = new Contestant();
            c.username = 'testUser';

            settings.maxContestants = 1;
            var s = new Session(id, settings, host);

            var r = s.addContestant(c);
            r.wasSuccessful.should.be.true();

            s.subscribeForStateChange('onpending', function(session, event, from, to) {
                session.should.equal(s);
                event.should.equal('buzzerPressed');
                from.should.equal('ready');
                to.should.equal('pending');
                done();
            });

            s.tryBuzzerPressRegister(c.id).should.be.true();
        });
    });
    describe('tryBuzzerPressRegister(contestantId)', function() {
        it('should register when state is ready', function() {
            var c = new Contestant();
            c.username = 'testUser';

            settings.maxContestants = 1;
            var s = new Session(id, settings, host);

            s.addContestant(c).wasSuccessful.should.be.true();
            s.currentState.should.equal('ready');
            s.tryBuzzerPressRegister(c.id).should.be.true();
            s.currentState.should.equal('pending');

        });
        it('should not register when state is not ready', function() {
            var c1 = new Contestant();
            c1.username = 'testUser1';

            var c2 = new Contestant();
            c2.username = 'testUser2';

            settings.maxContestants = 2;
            var s = new Session(id, settings, host);

            s.addContestant(c1).wasSuccessful.should.be.true();
            s.addContestant(c2).wasSuccessful.should.be.true();

            s.currentState.should.equal('ready');
            s.tryBuzzerPressRegister(c1.id).should.be.true();
            s.currentState.should.equal('pending');

            s.tryBuzzerPressRegister(c2.id).should.be.false();
        });
        it('should not register when contestant does not exist', function() {
            var c = new Contestant();
            c.username = 'testUser';

            settings.maxContestants = 1;
            var s = new Session(id, settings, host);

            s.addContestant(c).wasSuccessful.should.be.true();
            s.currentState.should.equal('ready');
            s.tryBuzzerPressRegister(idUtility.generateParticipantId()).should.be.false();
            s.currentState.should.equal('ready');
        });
        it('should not replace previous round winner with pending contestant', function() {
            var c1 = new Contestant();
            c1.username = 'testUser1';

            var c2 = new Contestant();
            c2.username = 'testUser2';

            settings.maxContestants = 2;
            var s = new Session(id, settings, host);

            s.addContestant(c1).wasSuccessful.should.be.true();
            s.addContestant(c2).wasSuccessful.should.be.true();

            s.tryBuzzerPressRegister(c1.id).should.be.true();
            s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.true();
            s.roundWinner.should.equal('testUser1');

            s.tryBuzzerPressRegister(c2.id).should.be.true();
            s.roundWinner.should.equal('testUser1');
        });
        it('should not add previous round winner to winners list', function() {
            var c1 = new Contestant();
            c1.username = 'testUser1';

            var c2 = new Contestant();
            c2.username = 'testUser2';

            settings.maxContestants = 2;
            var s = new Session(id, settings, host);

            s.addContestant(c1).wasSuccessful.should.be.true();
            s.addContestant(c2).wasSuccessful.should.be.true();

            s.tryBuzzerPressRegister(c1.id).should.be.true();
            s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.true();
            s.roundWinner.should.equal('testUser1');

            s.tryBuzzerPressRegister(c2.id).should.be.true();
            s.previousWinners.length.should.equal(0);
        });
    });
    describe('tryBuzzerAction(action)', function() {
        describe('action->ACCEPT', function() {
            it('should allow when game state is pending', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                settings.maxContestants = 1;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.true();
            });
            it('should not allow when game state is not pending', function() {
                settings.maxContestants = 2;
                var s = new Session(id, settings, host);

                s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.false();
            });
            it('should update contestant\'s score', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                var c2 = new Contestant();
                c2.username = 'testUser2';

                settings.maxContestants = 2;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();
                s.addContestant(c2).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.true();
                s.roundWinner.should.equal('testUser1');
                c1.score.should.equal(1);
            });
            it('should update contestant\'s team score', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                settings.hasTeams = true;
                settings.maxTeams = 1;
                settings.teamSize = 1;

                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.true();
                s.roundWinner.should.equal('testUser1');

                c1.score.should.equal(1);
                s.teams.all[0].score.should.equal(1);
            });
            it('should add previous round winner to winners list', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                var c2 = new Contestant();
                c2.username = 'testUser2';

                settings.maxContestants = 2;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();
                s.addContestant(c2).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.true();

                s.tryBuzzerPressRegister(c2.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.true();

                s.previousWinners.length.should.equal(1);
                s.previousWinners[0].should.equal('testUser1');
            });
            it('should change game state back to ready', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                settings.maxContestants = 1;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.true();

                s.currentState.should.equal(constants.gameStates.READY);
            });
            it('should clear pending winner', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                var c2 = new Contestant();
                c2.username = 'testUser2';

                settings.maxContestants = 2;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();
                s.addContestant(c2).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.true();
                should(s.pendingWinner).be.null();
            });
        });
        describe('action->REJECT', function() {
            it('should allow when game state is pending', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                settings.maxContestants = 1;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.REJECT).should.be.true();
            });
            it('should not allow when game state is not pending', function() {
                settings.maxContestants = 1;
                var s = new Session(id, settings, host);

                s.tryBuzzerAction(constants.buzzerActionCommands.REJECT).should.be.false();
            });
            it('should not replace round winner with pending contestant', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                var c2 = new Contestant();
                c2.username = 'testUser2';

                settings.maxContestants = 2;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();
                s.addContestant(c2).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.true();

                s.tryBuzzerPressRegister(c2.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.REJECT).should.be.true();

                should(s.roundWinner).be.null();
                s.previousWinners.pop().should.equal('testUser1');
            });
            it('should not update pending contestant\'s score', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                var c2 = new Contestant();
                c2.username = 'testUser2';

                settings.maxContestants = 2;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();
                s.addContestant(c2).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.true();

                s.tryBuzzerPressRegister(c2.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.REJECT).should.be.true();

                c1.score.should.equal(1);
                c2.score.should.equal(0);
            });
            it('should add round winner to previous winners list', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                var c2 = new Contestant();
                c2.username = 'testUser2';

                settings.maxContestants = 2;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();
                s.addContestant(c2).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.true();

                s.tryBuzzerPressRegister(c2.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.REJECT).should.be.true();

                should(s.roundWinner).be.null();
                s.previousWinners.pop().should.equal('testUser1');
            });
            it('should change game state back to ready', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                settings.maxContestants = 2;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.REJECT).should.be.true();

                s.currentState.should.equal(constants.gameStates.READY);
            });
        });
        describe('action->RESET', function() {
            it('should allow when game state is ready', function() {
                settings.maxContestants = 1;
                var s = new Session(id, settings, host);
                s.tryBuzzerAction(constants.buzzerActionCommands.RESET).should.be.true();
            });
            it('should allow when game state is pending', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                settings.maxContestants = 1;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.RESET).should.be.true();
            });
            it('should not replace previous round winner with pending contestant', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                var c2 = new Contestant();
                c2.username = 'testUser2';

                settings.maxContestants = 2;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();
                s.addContestant(c2).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.true();

                s.tryBuzzerPressRegister(c2.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.RESET).should.be.true();

                should(s.roundWinner).be.null();
                s.previousWinners.pop().should.equal('testUser1');
            });
            it('should add previous round winner to winners list', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                var c2 = new Contestant();
                c2.username = 'testUser2';

                settings.maxContestants = 2;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();
                s.addContestant(c2).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.true();

                s.tryBuzzerPressRegister(c2.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.RESET).should.be.true();

                should(s.roundWinner).be.null();
                s.previousWinners.pop().should.equal('testUser1');
            });
            it('should change game state back to ready', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                settings.maxContestants = 1;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.RESET).should.be.true();

                s.currentState.should.equal(constants.gameStates.READY);
            });
        });
        describe('action->DISABLE', function() {
            it('should allow when game state is ready', function() {
                settings.maxContestants = 1;
                var s = new Session(id, settings, host);
                s.tryBuzzerAction(constants.buzzerActionCommands.DISABLE).should.be.true();
            });
            it('should allow when game state is pending', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                settings.maxContestants = 1;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.DISABLE).should.be.true();
            });
            it('should not replace previous round winner with pending contestant', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                var c2 = new Contestant();
                c2.username = 'testUser2';

                settings.maxContestants = 2;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();
                s.addContestant(c2).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.true();

                s.tryBuzzerPressRegister(c2.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.DISABLE).should.be.true();

                should(s.roundWinner).be.null();
                s.previousWinners.pop().should.equal('testUser1');
            });
            it('should add previous round winner to winners list', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                var c2 = new Contestant();
                c2.username = 'testUser2';

                settings.maxContestants = 2;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();
                s.addContestant(c2).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.ACCEPT).should.be.true();

                s.tryBuzzerPressRegister(c2.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.DISABLE).should.be.true();

                should(s.roundWinner).be.null();
                s.previousWinners.pop().should.equal('testUser1');
            });
            it('should change game state to buzzerLock', function() {
                var c1 = new Contestant();
                c1.username = 'testUser1';

                settings.maxContestants = 1;
                var s = new Session(id, settings, host);

                s.addContestant(c1).wasSuccessful.should.be.true();

                s.tryBuzzerPressRegister(c1.id).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.DISABLE).should.be.true();

                s.currentState.should.equal(constants.gameStates.BUZZER_LOCK);
            });
        });
        describe('action->ENABLE', function() {
            it('should allow when game state is buzzerLock', function() {
                settings.maxContestants = 1;
                var s = new Session(id, settings, host);

                s.tryBuzzerAction(constants.buzzerActionCommands.DISABLE).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.ENABLE).should.be.true();
            });
            it('should not allow when game state is not buzzerLock', function() {
                settings.maxContestants = 1;
                var s = new Session(id, settings, host);

                s.tryBuzzerAction(constants.buzzerActionCommands.ENABLE).should.be.false();
            });
            it('should change game state to ready', function() {
                settings.maxContestants = 1;
                var s = new Session(id, settings, host);

                s.tryBuzzerAction(constants.buzzerActionCommands.DISABLE).should.be.true();
                s.tryBuzzerAction(constants.buzzerActionCommands.ENABLE).should.be.true();
                s.currentState.should.equal(constants.gameStates.READY);
            });
        });
    });
    describe('#pendingWinner', function() {
        it('should return the pending winner', function() {
            var c = new Contestant();
            c.username = 'testUser';

            settings.maxContestants = 1;
            var s = new Session(id, settings, host);

            s.addContestant(c).wasSuccessful.should.be.true();
            s.currentState.should.equal('ready');
            s.tryBuzzerPressRegister(c.id).should.be.true();
            s.currentState.should.equal('pending');

            s.pendingWinner.should.equal('testUser');
        });
        it('should not return the pending winner', function() {
            var c = new Contestant();
            c.username = 'testUser';

            settings.maxContestants = 1;
            var s = new Session(id, settings, host);

            s.addContestant(c).wasSuccessful.should.be.true();
            s.currentState.should.equal('ready');
            should(s.pendingWinner).be.null();
        });
    });
    describe('#updateSessionName(name)', function() {
        it('should update session name', function() {
            settings.maxContestants = 1;
            settings.sessionName = 'session1';
            var s = new Session(id, settings, host);
            s.updateSessionName('session2');
            settings.sessionName.should.equal('session2');
        });
    });
    describe('#updateMaxContestants(maxContestants)', function() {
        it('should update max contestants', function() {
            settings.maxContestants = 1;
            settings.sessionName = 'session1';

            var s = new Session(id, settings, host);
            var [r, e] = s.updateMaxContestants(2);
            r.should.be.true();
            should.not.exist(e);
            settings.maxContestants.should.equal(2);
        });
        it('should not allow below current connected amount', function() {
            settings.maxContestants = 5;
            settings.sessionName = 'session1';

            var s = new Session(id, settings, host);

            var c1 = new Contestant();
            c1.username = 'testUser1';
            s.addContestant(c1).wasSuccessful.should.be.true();

            var c2 = new Contestant();
            c2.username = 'testUser2';
            s.addContestant(c2).wasSuccessful.should.be.true();

            var [r, e] = s.updateMaxContestants(1);
            r.should.be.false();
            e.should.equal(constants.messages.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ALREADY_CONNECTED);

            settings.maxContestants.should.equal(5);
        });
    });
    describe('#updateTeamSize(teamSize)', function() {
        it('should update team size', function() {
            settings.hasTeams = true;
            settings.teamSize = 1;
            settings.maxTeams = 1;
            settings.sessionName = 'session1';

            var s = new Session(id, settings, host);
            var [r, e] = s.updateTeamSize(2);
            r.should.be.true();
            should.not.exist(e);
            settings.teamSize.should.equal(2);
        });
        it('should not allow below current setting', function() {
            settings.hasTeams = true;
            settings.teamSize = 5;
            settings.maxTeams = 1;
            settings.sessionName = 'session1';

            var s = new Session(id, settings, host);
            var [r, e] = s.updateTeamSize(4);
            r.should.be.false();
            e.should.equal(constants.messages.TEAM_SIZE_MUST_BE_GREATER_THAN_ALREADY_SET);
        });
    });
    describe('#updateMaxTeams(maxTeams)', function() {
        it('should update max teams', function() {
            settings.hasTeams = true;
            settings.teamSize = 1;
            settings.maxTeams = 1;
            settings.sessionName = 'session1';

            var s = new Session(id, settings, host);
            var [r, e] = s.updateMaxTeams(2);
            r.should.be.true();
            should.not.exist(e);
            settings.maxTeams.should.equal(2);
        });
        it('should add teams', function() {
            settings.hasTeams = true;
            settings.teamSize = 1;
            settings.maxTeams = 1;
            settings.sessionName = 'session1';

            var s = new Session(id, settings, host);
            var [r, e] = s.updateMaxTeams(5);
            r.should.be.true();
            should.not.exist(e);

            s.teams.length.should.equal(5);
        });
        it('should not allow below current setting', function() {
            settings.hasTeams = true;
            settings.teamSize = 1;
            settings.maxTeams = 5;
            settings.sessionName = 'session1';

            var s = new Session(id, settings, host);
            var [r, e] = s.updateMaxTeams(4);
            r.should.be.false();
            e.should.equal(constants.messages.MAX_TEAMS_MUST_BE_GREATER_THAN_ALREADY_SET);
        });
        it('should not allow if teams are PLAYER_CHOICE', function() {
            settings.hasTeams = true;
            settings.teamSize = 5;
            settings.maxTeams = 5;
            settings.teamSelectionMethod = constants.teamSelectionMethod.PLAYER_CHOICE;
            settings.sessionName = 'session1';

            var s = new Session(id, settings, host);
            var [r, e] = s.updateMaxTeams(6);
            r.should.be.false();
            e.should.equal(constants.messages.MAX_TEAMS_CANNOT_BE_CHANGED_WHEN_PLAYER_CHOICE);
        });

    });
});
