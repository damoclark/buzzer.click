var ParamCheck = require('./ParamCheck');
var Participants = require('./Participants');
var Contestant = require('./Contestant');

/**
 * Team module.
 * @module team
 */

/**
 * Represents a team
 * @constructor
 */
function Team() {
    this._contestants = new Participants();
}

/**
 * Prototype name
 */
Team.prototype.type = 'Team';

/**
 * @private
 */
Team.prototype._teamName = null;
/**
 * @private
 */
Team.prototype._teamLeader = null;
/**
 * @private
 */
Team.prototype._contestants = null;
/**
 * @private
 */
Team.prototype._score = 0;

/**
 * Defines a property to get and set the @see {@link _teamName} field.
 * @return {String} the the team name, if set; else, null.
 */
Object.defineProperty(Team.prototype, 'teamName', {
    get: function() {
        return this._teamName;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `id` is invalid. It is required and must be of the correct type.'
            );
        }
        this._teamName = val;
    }
});

/**
 * Defines a property to get and set the @see {@link _teamLeader} field.
 * @return {String} the the team leader, if set; else, null.
 */
Object.defineProperty(Team.prototype, 'teamLeader', {
    get: function() {
        return this._teamLeader;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, Contestant)) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this._teamLeader = val;
    }
});

/**
 * Defines a property to get the @see {@link _score} field.
 * @throws on set value.
 * @return the team score.
 */
Object.defineProperty(Team.prototype, 'score', {
    get: function() {
        return this._score;
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a property to get the @see {@link _contestants} field.
 * @throws on set value.
 * @return the contestants collection.
 */
Object.defineProperty(Team.prototype, 'contestants', {
    get: function() {
        return this._contestants;
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a method to increment the team's score.
 * @public
 * @see {@link score}
 */
Team.prototype.incrementScore = function() {
    this._score++;
};

//Export the class
module.exports = Team;
