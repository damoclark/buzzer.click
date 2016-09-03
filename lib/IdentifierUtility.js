var ParamCheck = require('./ParamCheck');
var Sessions = require('./Sessions');
var uuid = require('node-uuid');

/**
 * Identifier utility module.
 * @module IdentifierUtility
 */

/**
 * Represents a identifier utility.
 * @param  {Sessions} sessions
 * @public
 * @constructor
 * @throw when param sessions equates to false or is an incorrect type.
 */
function IdentifierUtility(sessions) {
    if (!new ParamCheck().isInstanceAndTypeOf(sessions, Sessions) || !sessions) {
        throw new Error('Sessions is required and must of type Sessions');
    }
    this.sessions = sessions;
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
    var random = function randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    };
    while (endlessLoopTrap < 99) {
        // build the key
        var key = '';
        for (var i = 0; i < this._keyLength; i++) {
            key += chars[random(0, chars.length)];
        }
        // if it's not in use, return;
        if (this.sessions.getById(key) == null) {
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
module.exports = IdentifierUtility;
