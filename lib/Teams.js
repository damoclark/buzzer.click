var ParamCheck = require('./ParamCheck');
var Team = require('./Team');
var Contestant = require('./Contestant');
var Settings = require('./Settings');
var constants = require('./Constants');

/**
 * Teams module.
 * @module teams
 */

/**
 * Represents a @see {@link Team} collection.
 * @public
 * @constructor
 */
function Teams() {
    this._teams = [];
}

/**
 * Prototype name
 */
Teams.prototype.type = 'Teams';

/**
 * @private
 */
Teams.prototype._teams = [];

/**
 * Defines a method which checks if the a team is registered with the given name.
 * @param  {String} teamName
 * @throw when param teamName equates to false or is an incorrect type.
 * @return {Boolean} True if the teamName matches an existing team; else false.
 */
Teams.prototype.contains = function(teamName) {
    if (!new ParamCheck().isInstanceAndTypeOf(teamName, 'String') || !teamName) {
        throw new Error(
            'Argument `teamName` is invalid. It is required and must be of the correct type.'
        );
    }
    return this._getByTeamName(teamName) != null;
};

/**
 * @private
 */
Teams.prototype._getByTeamName = function(name) {
    return this._teams.find(function(t) {
        return t.teamName.toUpperCase() === name.toUpperCase();
    });
};

/**
 * Defines a property to get all teams.
 * @public
 * @throws on set value.
 * @return {Team[]} a collection of teams.
 */
Object.defineProperty(Teams.prototype, 'all', {
    get: function() {
        return this._teams.slice();
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a property to length.
 * @public
 * @throws on set value.
 * @return {Number} the amount of teams.
 */
Object.defineProperty(Teams.prototype, 'length', {
    get: function() {
        return this._teams.length;
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a method which adds (registers) a team with the teams collection.
 * @public
 * @param  {Team} team
 * @throw when param team equates to false or is an incorrect type.
 * @throw when the team's name is already registered.
 */
Teams.prototype.add = function(team) {
    if (!new ParamCheck().isInstanceAndTypeOf(team, Team) || !team) {
        throw new Error(
            'Argument `team` is invalid. It is required and must be of the correct type.'
        );
    }
    if (this._getByTeamName(team.teamName) != null) {
        throw new Error('Team with teamName of `' + team.teamName + '` has already be added.');
    }
    this._teams.push(team);
};

/**
 * Defines a method which removes a team from the teams collection.
 * @public
 * @param  {Team} team
 * @throw when param team equates to false or is an incorrect type.
 * @return {Boolean} true if the team was removed successfully; else false.
 */
Teams.prototype.remove = function(team) {
    if (!new ParamCheck().isInstanceAndTypeOf(team, Team) || !team) {
        throw new Error(
            'Argument `team` is invalid. It is required and must be of the correct type.'
        );
    }
    var index = this._teams.indexOf(team);
    if (index < 0) {
        return false;
    }
    this._teams.splice(index, 1);
    return true;
};

/**
 * Defines a method which removes a team from the teams collection by their
 * @see{@link team.teamName}.
 * @public
 * @param  {Team} team
 * @throw when param teamName equates to false or is an incorrect type.
 * @return {Boolean} true if the team was removed successfully; else false.
 */
Teams.prototype.removeByTeamName = function(teamName) {
    if (!new ParamCheck().isInstanceAndTypeOf(teamName, 'String') || !teamName) {
        throw new Error(
            'Argument `teamName` is invalid. It is required and must be of the correct type.'
        );
    }
    var team = this._getByTeamName(teamName);
    if (!team) {
        return false;
    }
    return this.remove(team);
};

/**
 * Defines a method which adds a contestant to a team.
 * @see{@link Team}.
 * @see{@link Contestant}.
 * @public
 * @param  {Contestant} contestant
 * @throw when param contestant equates to false or is an incorrect type.
 * @return {AddContestantResponse} an add contestant result.
 */
Teams.prototype.addContestant = function(contestant, settings, inquireTeamLeaderCallback, inquireTeamNameCallback) {
    if (!new ParamCheck().isInstanceAndTypeOf(contestant, Contestant) || !contestant) {
        throw new Error('Argument `contestant` is invalid. It is required and must be of the correct type.');
    }
    if (!new ParamCheck().isInstanceAndTypeOf(settings, Settings) || !settings) {
        throw new Error('Argument `contestant` is invalid. It is required and must be of the correct type.');
    }
    if (!new ParamCheck().isInstanceAndTypeOf(inquireTeamLeaderCallback, 'Function')) {
        throw new Error('Argument `inquireTeamLeaderCallback` is invalid. It is required and must be of the correct type.');
    }
    if (!new ParamCheck().isInstanceAndTypeOf(inquireTeamNameCallback, 'Function')) {
        throw new Error('Argument `inquireTeamNameCallback` is invalid. It is required and must be of the correct type.');
    }
    if (!settings.hasTeams) {
        throw new Error('The settings for this session does not state teams.');
    }

    // find team with least amount of members

    var targetTeam = null;

    this._teams.forEach(function(t) {
        if (!targetTeam) {
            targetTeam = t;
            return;
        }
        if (t.length < targetTeam.length) {
            targetTeam = t;
        }
    });

    if (targetTeam.contestants.length >= settings.teamSize) {
        return [false, constants.messages.TEAMS_ARE_FULL];
    }

    targetTeam.contestants.add(contestant);

    if (settings.teamLeaderSelectionMethod === constants.teamLeaderSelectionMethod.PLAYER_CHOICE && !targetTeam.teamLeader) {
        if (inquireTeamLeaderCallback()) {
            targetTeam.teamLeader = contestant;

            // TODO check for rename
        }
    }

    // TODO - if team is full and team leader selection is random - allocate

    return [true];
};

//Export the class
module.exports = Teams;
