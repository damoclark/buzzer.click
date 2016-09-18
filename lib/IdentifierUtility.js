var ParamCheck = require('./ParamCheck');
var uuid = require('node-uuid');
var random = require('random-js')();

/**
 * Identifier utility module.
 * @module IdentifierUtility
 */

/**
 * Represents a identifier utility.
 * @public
 * @constructor
 */
function IdentifierUtility() {

}

/**
 * Prototype name
 */
IdentifierUtility.prototype.type = 'IdentifierUtility';

/**
 * @private
 */
IdentifierUtility.prototype._keyLength = 6;

/**
 * This field is global, as it needs to be used across all instances.
 * @private
 * @global
 */
IdentifierUtility.prototype._sessionKeysInUse = [];

/**
 * Defines a property to get the session id key length.
 * @public
 * @readonly
 * @throws on set value.
 * @return {Number} the key length.
 */
Object.defineProperty(IdentifierUtility.prototype, 'keyLength', {
    get: function() {
        return this._keyLength;
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a method to register session ids that are in use, but were not generated
 * by the current application.
 * @public
 * @param  {String[]} ids
 * @throw when param ids is an incorrect type.
 */
IdentifierUtility.prototype.registerSessionIdsInUse = function(ids) {
    if (!new ParamCheck().isInstanceAndTypeOf(ids, 'Array')) {
        throw new Error(
            'Argument `ids` is invalid. It is required and must be of the correct type.'
        );
    }
    for (var i = 0; i < ids.length; i++) {
        if (this._sessionKeysInUse.indexOf(ids[i]) < 0) {
            this._sessionKeysInUse.push(ids[i]);
        }
    }
};

/**
 * Defines a method to release a registered session id allowing it to be reused.
 * @public
 * @param  {String} id
 * @throw when param id equates to false or is an incorrect type.
 */
IdentifierUtility.prototype.releaseSessionId = function(id) {
    if (!new ParamCheck().isInstanceAndTypeOf(id, 'String') || !id) {
        throw new Error(
            'Argument `id` is invalid. It is required and must be of the correct type.'
        );
    }
    var index = this._sessionKeysInUse.indexOf(id);
    if (index >= 0) {
        this._sessionKeysInUse.splice(index, 1);
    }
};

/**
 * Defines a method which generates a new session id. A session id will not contain
 * characters which are confusing, such as 0 and O or 1 and I.
 * @public
 * @return {String} a new session id which is unique and @see{@link keyLength} in length.
 */
IdentifierUtility.prototype.generateSessionId = function() {
    // Note: characters that can be confusing have been removed.
    var chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'P', 'R',
        'S', 'T', 'W', 'X', 'Y', 'Z', '2', '4', '5', '7', '8'
    ];
    var endlessLoopTrap = 0;
    var keysInUse = this._sessionKeysInUse;
    var keyInUse = function(k) {
        return keysInUse.find(function(sk) {
            return sk === k;
        });
    };
    while (endlessLoopTrap < 99) {
        // build the key
        var key = '';
        for (var i = 0; i < this._keyLength; i++) {
            key += chars[random.integer(0, chars.length - 1)];
        }
        // if it's not in use, return;
        if (!keyInUse(key)) {
            this._sessionKeysInUse.push(key);
            return key;
        }
        endlessLoopTrap++;
    }
    throw new Error(
        'Could not generate a key. Ensure key length is not too short.'
    );
};

/**
 * Defines a method which generates a new participant id, which is actually just a UUID.
 * @public
 * @return {String} a new participant id (UUID).
 */
IdentifierUtility.prototype.generateParticipantId = function() {
    return uuid.v1();
};

//Export the class
module.exports = new IdentifierUtility();
