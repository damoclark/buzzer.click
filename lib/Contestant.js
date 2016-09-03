var ParamCheck = require('./ParamCheck');
var Participant = require('./Participant');

/**
 * Contestant module.
 * @extends Participant
 * @module contestant
 */

/**
 * Represents a contestant participant.
 * @constructor
 */
function Contestant() {

}

Contestant.prototype.type = 'Contestant';

Contestant.prototype = Object.create(Participant.prototype);
Contestant.prototype.constructor = Contestant;

Contestant.prototype._score = 0 ;
Contestant.prototype._username = null;

/**
 * Defines a property to get and set the @see {@link _username} field.
 */
Object.defineProperty(Contestant.prototype, 'username', {
    get: function() {
        return this._username;
    },
    set: function(username) {
        if (!new ParamCheck().isInstanceAndTypeOf(username, 'String')) {
            throw new Error(
                'Argument `username` is invalid. It is required and must be of the correct type.'
            );
        }
        this._username = username;
    }
});

/**
 * Defines a property to get the contestant's score.
 * @readonly
 * @throws on set value.
 * @return the contestant's score.
 */
Object.defineProperty(Contestant.prototype, 'score', {
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
 * Defines a method to increment the contestant's score.
 * @see {@link score}
 */
Contestant.prototype.incrementScore = function() {
    this._score++;
};

//Export the class
module.exports = Contestant;
