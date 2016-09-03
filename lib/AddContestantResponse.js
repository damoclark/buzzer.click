var ParamCheck = require('./ParamCheck');

/**
 * Add contestant response module.
 * @module AddContestantResponse
 */

/**
 * Represents an add contestant response.
 * @constructor
 */
function AddContestantResponse() {
    this._wasSuccessful = false;
    this._errorMessage = null;
}

/**
 * Prototype name
 */
AddContestantResponse.prototype.type = 'AddContestantResponse';

AddContestantResponse.prototype._wasSuccessful = false;
AddContestantResponse.prototype._errorMessage = null;

/**
 * Defines a property to get and set the @see {@link _wasSuccessful} field.
 */
Object.defineProperty(AddContestantResponse.prototype, 'wasSuccessful', {
    get: function() {
        return this._wasSuccessful;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'Boolean')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this._wasSuccessful = val;
    }
});

/**
 * Defines a property to get and set the @see {@link _errorMessage} field.
 */
Object.defineProperty(AddContestantResponse.prototype, 'errorMessage', {
    get: function() {
        return this._errorMessage;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this._errorMessage = val;
    }
});

//Export the class
module.exports = AddContestantResponse;
