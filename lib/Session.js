var ParamCheck = require('./ParamCheck');
var Participants = require('./Participants');
var Host = require('./Host');
var Observer = require('./Observer');
var Contestant = require('./Contestant');
var Settings = require('./Settings');
var AddContestantResponse = require('./AddContestantResponse');
var StateMachine = require('javascript-state-machine');
var Teams = require('./Teams');
var idUtility = require('./IdentifierUtility');
var constants = require('./Constants');
var teamFactory = require('./TeamFactory');

/**
 * Session module.
 * @module session
 */

/**
 * Represents a session.
 * @public
 * @param  {String} id
 * @param  {Settings} settings
 * @param  {Host} host
 * @throw when param id equates to false or is an incorrect type.
 * @throw when param settings equates to false or is an incorrect type.
 * @constructor
 */
function Session(id, settings, host) {
    if (!new ParamCheck().isInstanceAndTypeOf(id, 'String') || !id) {
        throw new Error('Id is required and must of type String');
    }
    if (!new ParamCheck().isInstanceAndTypeOf(settings, Settings) || !settings) {
        throw new Error('Settings is required and must of type Settings');
    }
    if (!new ParamCheck().isInstanceAndTypeOf(host, Host) || !host) {
        throw new Error('Host is required and must of type Host');
    }
    this._id = id;
    this._settings = settings;
    this._host = host;
    this._participants = new Participants();
    this._previousWinners = [];
    this._roundWinner = null;
    this._pendingWinContestant = null;
    if (this._settings.hasTeams) {
        this._teams = new Teams();
        teamFactory.create(this._teams, this._settings);
    }
    /* beautify ignore:start */
    /* eslint-disable */
    this._state = StateMachine.create({
        initial: 'ready',
        events: [
            { name: 'buzzerPressed', from: 'ready', to: 'pending' }, 
            { name: 'disableBuzzers', from: ['ready', 'pending'], to: 'buzzerLock' }, 
            { name: 'enableBuzzers', from: 'buzzerLock', to: 'ready' },
            { name: 'acceptBuzz', from: 'pending', to: 'ready' },
            { name: 'rejectBuzz', from: 'pending', to: 'ready' },
            { name: 'resetBuzz', from: ['pending', 'ready'], to: 'ready' },
            { name: 'complete', from: ['ready', 'pending', 'buzzerLock'], to: 'completed' },
        ]
    });
    /* eslint-enable */
    /* beautify ignore:end */
}

/**
 * Prototype name
 */
Session.prototype.type = 'Session';

/**
 * @private
 */
Session.prototype._id = null;
/**
 * @private
 */
Session.prototype._roundsPlayed = 0;
/**
 * @private
 */
Session.prototype._participants = null;
/**
 * @private
 */
Session.prototype._teams = null;
/**
 * @private
 */
Session.prototype._settings = null;
/**
 * @private
 */
Session.prototype._host = null;
/**
 * @private
 */
Session.prototype._state = null;

/**
 * @private
 */
Session.prototype._pendingWinContestant = null;

/**
 * @private
 */
Session.prototype._roundWinner = null;

/**
 * @private
 */
Session.prototype._previousWinners = [];

/**
 * Defines a property to get the @see {@link _id} field.
 * @public
 * @throws on set value.
 * @return {String} the id.
 */
Object.defineProperty(Session.prototype, 'id', {
    get: function() {
        return this._id;
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a property to get the @see {@link _roundsPlayed} field.
 * @public
 * @throws on set value.
 * @return {Number} the rounds played.
 */
Object.defineProperty(Session.prototype, 'roundsPlayed', {
    get: function() {
        return this._roundsPlayed;
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a property to get the @see {@link _winners} field.
 * @public
 * @throws on set value.
 * @return {Array{String}} the round winner collection.
 */
Object.defineProperty(Session.prototype, 'previousWinners', {
    get: function() {
        return this._previousWinners;
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a property to get the @see {@link _roundWinner} field.
 * @public
 * @throws on set value.
 * @return {String} the round winner.
 */
Object.defineProperty(Session.prototype, 'roundWinner', {
    get: function() {
        return this._roundWinner;
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a property to get the @see {@link _pendingWinContestant.username} field.
 * @public
 * @throws on set value.
 * @return {String} the pending winner.
 */
Object.defineProperty(Session.prototype, 'pendingWinner', {
    get: function() {
        return this._pendingWinContestant ? this._pendingWinContestant.username : null;
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a property to get the @see {@link _settings} field.
 * @public
 * @throws on set value.
 * @return {Settings} the settings.
 */
Object.defineProperty(Session.prototype, 'settings', {
    get: function() {
        return this._settings;
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a property to get whether the session is completed.
 * @public
 * @throws on set value.
 * @return {Boolean} true if the session is completed; else false.
 */
Object.defineProperty(Session.prototype, 'isSessionCompleted', {
    get: function() {
        return this._state.current === 'completed';
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a property to get a collection of observers.
 * @public
 * @throws on set value.
 * @return {Observer[]} a collection of observers.
 */
Object.defineProperty(Session.prototype, 'observers', {
    get: function() {
        return this._participants.all.filter(function(p) {
            return p instanceof Observer;
        });
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a property to get a collection of contestants.
 * @public
 * @throws on set value.
 * @return {Contestant[]} a collection of contestants.
 */
Object.defineProperty(Session.prototype, 'contestants', {
    get: function() {
        return this._participants.all.filter(function(p) {
            return p instanceof Contestant;
        });
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a property to the @see {@link _teams} field.
 * @public
 * @throws on set value.
 * @return {Teams} instance.
 */
Object.defineProperty(Session.prototype, 'teams', {
    get: function() {
        return this._teams;
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a property to get the host of the session.
 * @public
 * @throws on set value.
 * @return {Host} the host.
 */
Object.defineProperty(Session.prototype, 'host', {
    get: function() {
        return this._host;
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a property to current session state.
 * @public
 * @throws on set value.
 * @return {String} the current session state.
 */
Object.defineProperty(Session.prototype, 'currentState', {
    get: function() {
        return this._state.current;
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a method to increment the rounds played.
 * @public
 * @see {@link roundsPlayed}
 */
Session.prototype.incrementRoundsPlayed = function() {
    this._roundsPlayed++;
};

/**
 * Defines a method to add a contestant to the session.
 * @public
 * @param  {Contestant} contestant
 * @throw when param contestant equates to false or is an incorrect type.
 * @return {AddContestantResponse} a complex response of success or not.
 */
Session.prototype.addContestant = function(contestant, inquireTeamLeaderCallback) {
    if (!new ParamCheck().isInstanceAndTypeOf(contestant, Contestant) || !contestant) {
        throw new Error(
            'Argument `contestant` is invalid. It is required and must be of the correct type.'
        );
    }

    var response = new AddContestantResponse();

    if (this.contestants.find(function(c) {
            return c.username.toUpperCase() === contestant.username.toUpperCase();
        }) != null) {
        response.setNotSuccessful(constants.messages.USERNAME_TAKEN);
        return response;
    }

    if (this.settings.hasTeams) {
        if (!new ParamCheck().isInstanceAndTypeOf(inquireTeamLeaderCallback, 'Function')) {
            throw new Error('Argument `inquireTeamLeaderCallback` is invalid. It is required and must be of the correct type.');
        }

        var [success, message] = teams.addContestant(contestant, this.settings, inquireTeamLeaderCallback);

        if (success) {
            this._participants.add(contestant);
            response.setSuccessful();
        } else {
            response.setNotSuccessful(message);
        }
    } else {
        if (this.contestants.length >= this.settings.maxContestants) {
            response.setNotSuccessful(constants.messages.MAXIMUM_SESSION_SIZED_REACHED);
            return response;
        }

        contestant.id = idUtility.generateParticipantId();
        this._participants.add(contestant);
        response.setSuccessful();
    }

    return response;
};

/**
 * Defines a method to complete the session.
 * @public
 * @throw when session state cannot transition to complete.
 * @return {AddContestantResponse} a complex response of success or not.
 */
Session.prototype.complete = function() {
    this._state.complete();
};

/**
 * Defines a method to subscribe for state change events.
 * @public
 * @throw when session state cannot transition to complete.
 * @return {AddContestantResponse} a complex response of success or not.
 */
Session.prototype.subscribeForStateChange = function(event, callback) {
    var $this = this;
    this._state[event] = function(event, from, to) {
        callback($this, event, from, to);
    };
};

/**
 * Defines a method which tries to register a buzzer press for the given
 * contestant id.
 * @public
 * @return {Boolean} true when the buzzer press was accepted; else false.
 */
Session.prototype.tryBuzzerPressRegister = function(contestantId) {
    var contestant = this.contestants.find(function(c) {
        return c.id === contestantId;
    });

    if (contestant == null) {
        return false;
    }

    if (this._state.can('buzzerPressed')) {
        this._pendingWinContestant = contestant;
        this._state.buzzerPressed();
        return true;
    }

    return false;
};

Session.prototype.tryBuzzerAction = function(action) {
    if (constants.buzzerActionCommands.all.indexOf(action) < 0) {
        return false;
    }

    switch (action) {
        case constants.buzzerActionCommands.ACCEPT:
            if (this._state.can('acceptBuzz')) {
                this._pendingWinContestant.incrementScore();
                if (this.roundWinner) {
                    this.previousWinners.push(this.roundWinner);
                }
                this._roundWinner = this._pendingWinContestant.username;
                this._state.acceptBuzz();
                return true;
            }
            break;
        case constants.buzzerActionCommands.REJECT:
            if (this._state.can('rejectBuzz')) {
                this._pendingWinContestant = null;
                this._state.rejectBuzz();
                return true;
            }
            break;
        case constants.buzzerActionCommands.RESET:
            if (this._state.can('resetBuzz')) {
                this._pendingWinContestant = null;
                this._state.resetBuzz();
                return true;
            }
            break;
        case constants.buzzerActionCommands.DISABLE:
            if (this._state.can('disableBuzzers')) {
                this._pendingWinContestant = null;
                this._state.disableBuzzers();
                return true;
            }
            break;
        case constants.buzzerActionCommands.ENABLE:
            if (this._state.can('enableBuzzers')) {
                this._pendingWinContestant = null;
                this._state.enableBuzzers();
                return true;
            }
            break;
    }

    return false;
};

//Export the class
module.exports = Session;
