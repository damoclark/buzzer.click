var ParamCheck = require('./ParamCheck');
var Sessions = require('./Sessions');

function IdentifierUtility(sessions) {
    if (!new ParamCheck().isInstanceAndTypeOf(sessions, Sessions)) {
        throw new Error('Sessions is required and must of type Sessions');
    }
    this.sessions = sessions;
}

IdentifierUtility.prototype.type = 'IdentifierUtility';

IdentifierUtility.prototype._keyLength = 6;

Object.defineProperty(IdentifierUtility.prototype, 'keyLength', {
    get: function() {
        return this._keyLength;
    },
    set: function(val) {
        throw new Error('Property is read only.');
    }
});

IdentifierUtility.prototype.generateSessionId = function() {
    // Note: characters that can be confussing have been removed.
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

//Export the class
module.exports = IdentifierUtility;
