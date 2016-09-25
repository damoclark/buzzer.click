var ParamCheck = require('./ParamCheck');
var constants = require('./Constants');
var unique = require('array-unique');
require('./Pollyfills');

/**
 * Settings module.
 * @module settings
 */

/**
 * Represents a the settings for a session.
 * @constructor
 */
function Settings() {
    this._teamNames = [];
}

/**
 * Prototype name
 */
Settings.prototype.type = 'Settings';
/**
 * @private
 */
Settings.prototype._hasTeams = false;
/**
 * @private
 */
Settings.prototype._teamSize = 0;
/**
 * @private
 */
Settings.prototype._maxTeams = 0;
/**
 * @private
 */
Settings.prototype._teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.RANDOM;
/**
 * @private
 */
Settings.prototype._teamNameEdit = constants.teamNameEdit.ALLOW;
/**
 * @private
 */
Settings.prototype._maxContestants = 0;
/**
 * @private
 */
Settings.prototype._sessionName = null;
/**
 * @private
 */
Settings.prototype._teamNames = [];

/**
 * Defines a property to get and set the @see {@link _hasTeams} field.
 */
Object.defineProperty(Settings.prototype, 'hasTeams', {
    get: function() {
        return this._hasTeams;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'Boolean')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this._hasTeams = val;
    }
});

/**
 * Defines a property to get and set the @see {@link _teamSize} field.
 */
Object.defineProperty(Settings.prototype, 'teamSize', {
    get: function() {
        return this._teamSize;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'Number')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this._teamSize = val;
    }
});

/**
 * Defines a property to get and set the @see {@link _maxTeams} field.
 */
Object.defineProperty(Settings.prototype, 'maxTeams', {
    get: function() {
        return this._maxTeams;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'Number')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this._maxTeams = val;
    }
});

/**
 * Defines a property to get and set the @see {@link _teamSelectionMethod} field.
 */
Object.defineProperty(Settings.prototype, 'teamLeaderSelectionMethod', {
    get: function() {
        return this._teamLeaderSelectionMethod;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'Number')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        if (constants.teamLeaderSelectionMethod.all.indexOf(val) < 0) {
            throw new Error(
                'Argument `val` is an invalid constant value.'
            );
        }
        this._teamLeaderSelectionMethod = val;
    }
});

/**
 * Defines a property to get and set the @see {@link _teamNameEdit} field.
 */
Object.defineProperty(Settings.prototype, 'teamNameEdit', {
    get: function() {
        return this._teamNameEdit;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'Number')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        if (constants.teamNameEdit.all.indexOf(val) < 0) {
            throw new Error(
                'Argument `val` is an invalid constant value.'
            );
        }
        this._teamNameEdit = val;
    }
});

/**
 * Defines a property to get and set the @see {@link _maxContestants} field.
 */
Object.defineProperty(Settings.prototype, 'maxContestants', {
    get: function() {
        return this._maxContestants;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'Number')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this._maxContestants = val;
    }
});

/**
 * Defines a property to get and set the @see {@link _sessionName} field.
 */
Object.defineProperty(Settings.prototype, 'sessionName', {
    get: function() {
        return this._sessionName;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this._sessionName = val;
    }
});

/**
 * Defines a property to get and set the @see {@link _teamNames} field.
 */
Object.defineProperty(Settings.prototype, 'teamNames', {
    get: function() {
        return this._teamNames;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'Array')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this._teamNames = val;
    }
});

/**
 * Defines a method to validate whether the settings, in their current state, are valid for use to create a session.
 * @public
 * @return {[Boolean|String]} true when settings are valid; else false and the fail reason.
 */
Settings.prototype.validate = function() {
    if (this._hasTeams) {
        if (this._teamSize < 1) {
            return [false, constants.messages.TEAM_SIZE_MUST_BE_GREATER_THAN_ZERO];
        }
        if (this._maxTeams < 1) {
            return [false, constants.messages.MAX_TEAMS_MUST_BE_GREATER_THAN_ZERO];
        }
        if (this._teamNames.length > 0) {
            var namesLowered = this._teamNames.map(function(n) {
                return n.toLowerCase();
            });
            var uniqueNames = unique(namesLowered);
            if (this._teamNames.length !== uniqueNames.length) {
                return [false, constants.messages.TEAM_NAMES_MUST_BE_UNIQUE];
            }
        }
        if (this._maxTeams === constants.UNLIMITED && this._teamSize === constants.UNLIMITED) {
            return [false, constants.messages.TEAMS_OR_TEAM_SIZE_UNLIMITED_NOT_BOTH];
        }
    } else {
        if (this._teamSize > 0) {
            return [false, constants.messages.TEAM_SIZE_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS];
        }
        if (this._maxTeams > 0) {
            return [false, constants.messages.MAX_TEAMS_MUST_BE_ZERO_WHEN_NOT_USING_TEAMS];
        }
        if (this._teamNames.length > 0) {
            return [false, constants.messages.TEAM_NAMES_MUST_NOT_BE_USED_WHEN_NOT_USING_TEAMS];
        }
    }

    if (!this._hasTeams) {
        if (this._maxContestants < 1) {
            return [false, constants.messages.MAX_CONTESTANTS_MUST_BE_ZERO_WHEN_USING_TEAMS];
        }
    } else {
        if (this._maxContestants > 0) {
            return [false, constants.messages.MAX_CONTESTANTS_MUST_BE_GREATER_THAN_ZERO];
        }
    }

    return [true];
};

//Export the class
module.exports = Settings;
