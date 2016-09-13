var ParamCheck = require('./ParamCheck');
var constants = require('./Constants');

/**
 * Settings module.
 * @module settings
 */

/**
 * Represents a the settings for a session.
 * @constructor
 */
function Settings() {

}

/**
 * Prototype name
 */
Settings.prototype.type = 'Settings';

Settings.prototype._hasTeams = false;
Settings.prototype._teamSize = 0;
Settings.prototype._maxTeams = 0;
Settings.prototype._teamSelectionMethod = constants.teamSelectionMethod.AUTO;
Settings.prototype._teamNameEdit = constants.teamNameEdit.ALLOW;
Settings.prototype._maxContestants = 0;
Settings.prototype._sessionName = null;
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
Object.defineProperty(Settings.prototype, 'teamSelectionMethod', {
    get: function() {
        return this._teamSelectionMethod;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'Number')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        if (constants.teamSelectionMethod.all.indexOf(val) < 0) {
            throw new Error(
                'Argument `val` is an invalid constant value.'
            );
        }
        this._teamSelectionMethod = val;
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

//Export the class
module.exports = Settings;
