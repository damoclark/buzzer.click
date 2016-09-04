var ParamCheck = require('./ParamCheck');
var Participant = require('./Participant');

/**
 * Participants module.
 * @module participants
 */

/**
 * Represents a @see {@link Participant} collection.
 * @public
 * @constructor
 */
function Participants() {
    this._participants = [];
}

/**
 * Prototype name
 */
Participants.prototype.type = 'Participants';

/**
 * @private
 */
Participants.prototype._participants = [];

/**
 * Defines a method which checks if the a participant is registered with the given id.
 * @param  {String} id
 * @throw when param id equates to false or is an incorrect type.
 * @return {Boolean} true if the id matches an existing participant; else false.
 */
Participants.prototype.contains = function(id) {
    if (!new ParamCheck().isInstanceAndTypeOf(id, 'String') || !id) {
        throw new Error(
            'Argument `id` is invalid. It is required and must be of the correct type.');
    }
    return this._getById(id) != null;
};

/**
 * @private
 */
Participants.prototype._getById = function(id) {
    return this._participants.find(function(p) {
        return p.id === id;
    });
};

/**
 * Defines a property to get all participants.
 * @public
 * @throws on set value.
 * @return {Participant[]} a collection of participants.
 */
Object.defineProperty(Participants.prototype, 'all', {
    get: function() {
        return this._participants.slice();
    },
    /* eslint-disable no-unused-vars */
    set: function(val) {
        /* eslint-enable no-unused-vars */
        throw new Error('Property is readonly.');
    }
});

/**
 * Defines a method which adds (registers) a participant with the participants collection.
 * @public
 * @param  {Participant} participant
 * @throw when param participant equates to false or is an incorrect type.
 * @throw when the participant's id is already registered.
 */
Participants.prototype.add = function(participant) {
    if (!new ParamCheck().isInstanceAndTypeOf(participant, Participant) || !participant) {
        throw new Error(
            'Argument `participant` is invalid. It is required and must be of the correct type.'
        );
    }
    if (this._getById(participant.id) != null) {
        throw new Error('Participant with id of `' + participant.id + '` has already be added.');
    }
    this._participants.push(participant);
};

/**
 * Defines a method which removes a participant from the participants collection.
 * @public
 * @param  {Participant} participant
 * @throw when param participant equates to false or is an incorrect type.
 * @return {Boolean} true if the participant was removed successfully; else false.
 */
Participants.prototype.remove = function(participant) {
    if (!new ParamCheck().isInstanceAndTypeOf(participant, Participant) || !participant) {
        throw new Error(
            'Argument `participant` is invalid. It is required and must be of the correct type.'
        );
    }
    var index = this._participants.indexOf(participant);
    if (index < 0) {
        return false;
    }
    this._participants.splice(index, 1);
    return true;
};

/**
 * Defines a method which removes a participant from the participants collection by their
 * @see{@link participant.id}.
 * @public
 * @param  {Participant} participant
 * @throw when param id equates to false or is an incorrect type.
 * @return {Boolean} true if the participant was removed successfully; else false.
 */
Participants.prototype.removeById = function(id) {
    if (!new ParamCheck().isInstanceAndTypeOf(id, 'String') || !id) {
        throw new Error(
            'Argument `id` is invalid. It is required and must be of the correct type.');
    }
    var participant = this._getById(id);
    if (!participant) {
        return false;
    }
    return this.remove(participant);
};

//Export the class
module.exports = Participants;
