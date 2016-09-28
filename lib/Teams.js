var ParamCheck = require('./ParamCheck');
var Team = require('./Team');
var Contestant = require('./Contestant');
var Settings = require('./Settings');
var constants = require('./Constants');
var random = require('random-js')();
var idUtility = require('./IdentifierUtility');

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
    return this.getByTeamName(teamName) != null;
};

/**
 * Defines a method which gets a team by the team name.
 * @see{@link Team}.
 * @public
 * @param  {String} teamName
 * @throw when param teamName equates to false or is an incorrect type.
 * @return {Team} the team with the matching name; else null.
 */
Teams.prototype.getByTeamName = function(teamName) {
    if (!new ParamCheck().isInstanceAndTypeOf(teamName, 'String') || !teamName) {
        throw new Error(
            'Argument `teamName` is invalid. It is required and must be of the correct type.');
    }
    var t = this._teams.find(function(t) {
        return t.teamName.toUpperCase() === teamName.toUpperCase();
    });
    return t ? t : null;
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
    if (this.getByTeamName(team.teamName) != null) {
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
    var team = this.getByTeamName(teamName);
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
 * @param  {Settings} settings
 * @param  {Function} inquireTeamLeaderCallback
 * @param  {String} teamName optional|required when settings.teamSelectionMethod = PLAYER_CHOICE.
 * @throw when param contestant equates to false or is an incorrect type.
 * @throw when param settings equates to false or is an incorrect type.
 * @throw when param inquireTeamLeaderCallback equates to false or is an incorrect type.
 * @throw when param teamName is required and equates to false or is an incorrect type.
 * @throw when @see {@link Settings.hasTeams} is false.
 * @return {[Boolean, String]} the result.
 */
Teams.prototype.addContestant = function(contestant, settings, inquireTeamLeaderCallback, teamName) {
    if (!new ParamCheck().isInstanceAndTypeOf(contestant, Contestant) || !contestant) {
        throw new Error('Argument `contestant` is invalid. It is required and must be of the correct type.');
    }
    if (!new ParamCheck().isInstanceAndTypeOf(settings, Settings) || !settings) {
        throw new Error('Argument `contestant` is invalid. It is required and must be of the correct type.');
    }
    if (!new ParamCheck().isInstanceAndTypeOf(inquireTeamLeaderCallback, 'Function')) {
        throw new Error('Argument `inquireTeamLeaderCallback` is invalid. It is required and must be of the correct type.');
    }
    if (!settings.hasTeams) {
        throw new Error('The settings for this session does not state teams.');
    }
    if (!teamName && settings.teamSelectionMethod === constants.teamSelectionMethod.PLAYER_CHOICE) {
        throw new Error(
            'Argument `teamName` is invalid. It is required and must be of the correct type.'
        );
    }

    // find team with least amount of members
    var targetTeam = null;

    if (settings.teamSelectionMethod === constants.teamSelectionMethod.SMALLEST_TEAM) {
        this._teams.forEach(function(t) {
            if (!targetTeam) {
                targetTeam = t;
                return;
            }
            if (t.contestants.length < targetTeam.contestants.length) {
                targetTeam = t;
            }
        });
    } else {
        targetTeam = this.getByTeamName(teamName);
    }

    // will they fit?
    if (targetTeam.contestants.length >= settings.teamSize) {
        // is this a session with unlimited teams?
        if (settings.maxTeams !== constants.UNLIMITED) {
            return [false, constants.messages.TEAMS_ARE_FULL];
        }

        targetTeam = require('./TeamFactory').add(this, settings);
    }
    contestant.id = idUtility.generateParticipantId();
    targetTeam.contestants.add(contestant);

    // team leader?
    if (settings.teamLeaderSelectionMethod === constants.teamLeaderSelectionMethod.PLAYER_CHOICE && !targetTeam.teamLeader) {
        inquireTeamLeaderCallback();
    }

    // if team is full and team leader selection is random - allocate
    if (settings.teamLeaderSelectionMethod === constants.teamLeaderSelectionMethod.RANDOM &&
        targetTeam.contestants.length >= settings.teamSize) {
        var cc = targetTeam.contestants.all;
        c = cc[random.integer(0, cc.length - 1)];
        targetTeam.teamLeader = c;
    }

    return [true];
};

/**
 * Defines a method which gets a team by contestant.
 * @see{@link Team}.
 * @see{@link Contestant}.
 * @public
 * @param  {Contestant} contestant
 * @throw when param contestant equates to false or is an incorrect type.
 * @return {Team} the team the contest belongs to; else null.
 */
Teams.prototype.getByContestant = function(contestant) {
    if (!new ParamCheck().isInstanceAndTypeOf(contestant, Contestant) || !contestant) {
        throw new Error(
            'Argument `contestant` is invalid. It is required and must be of the correct type.'
        );
    }

    var teams = this.all;
    var team = null;
    var found = false;
    for (var i = 0; i < teams.length; i++) {
        team = teams[i];
        if (team.contestants.contains(contestant.id)) {
            found = true;
            break;
        }
    }

    return found ? team : null;
};

/**
 * Defines a method which gets all teams which are available for a contestant to join.
 * @see{@link Team}.
 * @see{@link Contestant}.
 * @public
 * @param  {Settings} settings
 * @return {Array[Team]} the teams a contestant may join.
 */
Teams.prototype.getAvailable = function(settings) {
    if (!new ParamCheck().isInstanceAndTypeOf(settings, Settings) || !settings) {
        throw new Error('Argument `settings` is invalid. It is required and must be of the correct type.');
    }

    return this.all.filter(function(t) {
        if (settings.teamSize === constants.UNLIMITED) {
            return true;
        }
        return t.contestants.length < settings.teamSize;
    });
};

//Export the class
module.exports = Teams;
