var ParamCheck = require('./ParamCheck');
var Participants = require('./Participants');
var Host = require('./Host');
var Observer = require('./Observer');
var Contestant = require('./Contestant');
var Settings = require('./Settings');

/**
 * Session module.
 * @module session
 */

/**
 * Represents a session.
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
        throw new Error('Host is required and must of type Hettings');
    }           
    this._id = id;
    this._settings = settings;
    this._host = host;
    this._participants = new Participants();
}

/**
 * Prototype name
 */
Session.prototype.type = 'Session';

Session.prototype._id = null;
Session.prototype._roundsPlayed = 0;
Session.prototype._participants = null;
Session.prototype._teams = null;
Session.prototype._settings = null;
Session.prototype._host = null;
Session.prototype._state = null;

/**
 * Defines a property to get the @see {@link _id} field.
 * @throws on set value.
 * @return the id.
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
 * @throws on set value.
 * @return the rounds played.
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
 * Defines a property to get the @see {@link _settings} field.
 * @throws on set value.
 * @return the settings.
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
 * @throws on set value.
 * @return true if the session is completed; else false.
 */
Object.defineProperty(Session.prototype, 'isSessionCompleted', {
    get: function() {
        //TODO: Implement this function. Requires FSM
        throw new Error('Not implemented');
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a property to get a collection of observers
 * @throws on set value.
 * @return a collection of observers
 */
Object.defineProperty(Session.prototype, 'observers', {
    get: function() {
        return this._participants.all.filter(function(p){
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
 * Defines a property to get a collection of contestants
 * @throws on set value.
 * @return a collection of contestants
 */
Object.defineProperty(Session.prototype, 'contestants', {
    get: function() {
        return this._participants.all.filter(function(p){
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
 * Defines a property to get the host of the session.
 * @throws on set value.
 * @return the host
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
 * Defines a method to increment the rounds played.
 * @see {@link roundsPlayed}
 */
Session.prototype.incrementRoundsPlayed = function() {
    this._roundsPlayed++;
};

//Export the class
module.exports = Session;

/*
+ addContestant(contestant: Contestant): AddContestantResponse
*/
