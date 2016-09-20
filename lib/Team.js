var ParamCheck = require('./ParamCheck');
var Participants = require('./Participants');
var Contestant = require('./Contestant');
var Settings = require('./Settings');
var Filter = require('bad-words');
var constants = require('./Constants');

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
    var self = this;
    this._contestants.on('add', function(contestant) {
        contestant.on('scoreUpdate', function() {
            self._incrementScore();
        });
    });
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
    /*
     * @internal
     */
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
 * @private
 * @see {@link score}
 */
Team.prototype._incrementScore = function() {
    this._score++;
};

/**
 * Defines a method to try assign a team leader.
 * @see{@link Contestant}.
 * @public
 * @param  {Contestant} contestant
 * @param  {Boolean} hostOverride when set will ignore the current team leader and overwrite.
 * @throw when param contestant equates to false or is an incorrect type.
 * @throw when param hostOverride is an incorrect type.
 * @return {Boolean,String} whether the operation was successful, and when not, the
 * error message as to why it failed.
 */
Team.prototype.tryAssignTeamLeader = function(contestant, hostOverride) {
    if (!new ParamCheck().isInstanceAndTypeOf(contestant, Contestant) || !contestant) {
        throw new Error(
            'Argument `contestant` is invalid. It is required and must be of the correct type.'
        );
    }
    if (!new ParamCheck().isInstanceAndTypeOf(hostOverride, 'Boolean')) {
        throw new Error(
            'Argument `hostOverride` is invalid. It is required and must be of the correct type.'
        );
    }

    if (this.teamLeader && !hostOverride) {
        return [false, constants.messages.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_FULFILLED];
    }

    if (!this.contestants.contains(contestant.id)) {
        return [false, constants.messages.COULD_NOT_PROMOTE_TO_TEAM_LEADER_POSITION_NOT_CONTESTANT];
    }

    this.teamLeader = contestant;
    return [true];
};

/**
 * Defines a method to try update the team name.
 * @see{@link Settings}.
 * @public
 * @param  {String} teamName
 * @param  {Settings} settings
 * @throw when param teamName equates to false or is an incorrect type.
 * @throw when param settings equates to false or is an incorrect type.
 * @return {Boolean,String} whether the operation was successful, and when not, the
 * error message as to why it failed.
 */
Team.prototype.tryChangeName = function(teamName, settings, hostOverride) {
    if (!new ParamCheck().isInstanceAndTypeOf(teamName, 'String') || !teamName) {
        throw new Error(
            'Argument `teamName` is invalid. It is required and must be of the correct type.'
        );
    }
    if (!new ParamCheck().isInstanceAndTypeOf(settings, Settings)) {
        throw new Error(
            'Argument `settings` is invalid. It is required and must be of the correct type.'
        );
    }
    if (!new ParamCheck().isInstanceAndTypeOf(hostOverride, 'Boolean')) {
        throw new Error(
            'Argument `hostOverride` is invalid. It is required and must be of the correct type.'
        );
    }    

    if (!hostOverride && settings.teamNameEdit !== constants.teamNameEdit.ALLOW) {
        return [false, constants.messages.COULD_NOT_ACCEPT_TEAM_NAME_SETTINGS_NOT_ALLOW];
    }

    if (!hostOverride) {
        filter = new Filter();

        if (filter.isProfane(teamName)) {
            return [false, constants.messages.COULD_NOT_ACCEPT_TEAM_NAME_CONTAINS_PROFANITY];
        }
    }

    this.teamName = teamName;
    return [true];
};

/**
 * Defines a method to get a contestant, who belong to the team, by their username.
 * @param  {String} username
 * @throw when param username equates to false or is an incorrect type.
 * @return {Contestant} the contestant when found; else null.
 */
Team.prototype.getContestantByUsername = function(username) {
    if (!new ParamCheck().isInstanceAndTypeOf(username, 'String') || !username) {
        throw new Error(
            'Argument `username` is invalid. It is required and must be of the correct type.'
        );
    }

    var contestant = this.contestants.all.filter(function(c) {
        return c.username.toUpperCase() === username.toUpperCase();
    });

    return contestant[0] ? contestant[0] : null;
};

//Export the class
module.exports = Team;
