var ParamCheck = require('./ParamCheck');
var Participants = require('./Participants');
var Host = require('./Host');
var Observer = require('./Observer');
var Contestant = require('./Contestant');
var Settings = require('./Settings');
var AddContestantResponse = require('./AddContestantResponse');

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
 * @param  {contestant} Contestant
 * @throw when param contestant equates to false or is an incorrect type.
 * @return {AddContestantResponse} a complex response of success or not.
 */
Session.prototype.addContestant = function(contestant) {
    if (!new ParamCheck().isInstanceAndTypeOf(contestant, Contestant) || !contestant) {
        throw new Error(
            'Argument `contestant` is invalid. It is required and must be of the correct type.'
        );
    }

    var response = new AddContestantResponse();

    //TODO implement this method
    throw new Error('Not implemented');
};

//Export the class
module.exports = Session;
