var ParamCheck = require('./ParamCheck');
var Participant = require('./Participant');

/**
 * Contestant module.
 * @module contestant
 */

/**
 * Represents a contestant participant.
 * @extends Participant
 * @public
 * @constructor
 */
function Contestant() {

}

/**
 * Prototype name
 */
Contestant.prototype.type = 'Contestant';

/**
 * Contestant is a subclass of Participant.
 */
Contestant.prototype = Object.create(Participant.prototype);
Contestant.prototype.constructor = Contestant;

/**
 * @private
 */
Contestant.prototype._score = 0 ;
/**
 * @private
 */
Contestant.prototype._username = null;

/**
 * Defines a property to get and set the @see {@link _username} field.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @return {String} the username if set; else null.
 */
Object.defineProperty(Contestant.prototype, 'username', {
    get: function() {
        return this._username;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String') || !val) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this._username = val;
    }
});

/**
 * Defines a property to get the @see {@link _score} field.
 * @public
 * @readonly
 * @throws on set value.
 * @return {Number} the contestant's score.
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
 * @public
 * @see {@link score}
 */
Contestant.prototype.incrementScore = function() {
    this._score++;
    this.emit('scoreUpdate');
};

//Export the class
module.exports = Contestant;
