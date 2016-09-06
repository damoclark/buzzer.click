var ParamCheck = require('./ParamCheck');

/**
 * Add contestant response module.
 * @module AddContestantResponse
 */

/**
 * Represents an add contestant response.
 * @public
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

/**
 * @private
 */
AddContestantResponse.prototype._wasSuccessful = false;
/**
 * @private
 */
AddContestantResponse.prototype._errorMessage = null;

/**
 * Defines a property to get and set the @see {@link _wasSuccessful} field.
 * @readonly
 * @public
 * @throws on set value.
 * @return {Boolean} true if the contestant was successfully added; else, false.
 */
Object.defineProperty(AddContestantResponse.prototype, 'wasSuccessful', {
    get: function() {
        return this._wasSuccessful;
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a property to get and set the @see {@Link _errorMessage} field.
 * @readonly
 * @public
 * @throws on set value.
 * @return {String} the error message when the response is not @see {@Link wasSuccessful}.
 */
Object.defineProperty(AddContestantResponse.prototype, 'errorMessage', {
    get: function() {
        return this._errorMessage;
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a method to set the response as successful.
 * @public
 * @See {@Link wasSuccessful}
 */
AddContestantResponse.prototype.setSuccessful = function() {
    this._wasSuccessful = true;
    this._errorMessage = null;
};

/**
 * Defines a method to set the response as not successful.
 * @public
 * @param  {errorMessage} String
 * @See{@Link errorMessage}
 * @See{@Link wasSuccessful}
 * @throw when param errorMessage equates to false or is an incorrect type.
 */
AddContestantResponse.prototype.setNotSuccessful = function(errorMessage) {
    if (!new ParamCheck().isInstanceAndTypeOf(errorMessage, 'String') || !errorMessage) {
        throw new Error(
            'Argument `errorMessage` is invalid. It is required and must be of the correct type.'
        );
    }
    this._wasSuccessful = false;
    this._errorMessage = errorMessage;
};

//Export the class
module.exports = AddContestantResponse;
