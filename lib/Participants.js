var ParamCheck = require('./ParamCheck');
var Participant = require('./Participant');

function Participants() {

}

Participants.prototype.type = 'Participants';

Participants.prototype.participants = [];

Participants.prototype.contains = function(id) {
    if (!new ParamCheck().isInstanceAndTypeOf(id, 'String') || !id) {
        throw new Error(
            'Argument `id` is invalid. It is required and must be of the correct type.'
        );
    }

    return this._getById(id) != null;
};

Participants.prototype._getById = function(id) {
    return this.participants.find(function(p) {
        return p.Id === id;
    });
};

Participants.prototype.add = function(participant) {
    if (!new ParamCheck().isInstanceAndTypeOf(participant, Participant) ||
        !participant) {
        throw new Error(
            'Argument `participant` is invalid. It is required and must be of the correct type.'
        );
    }

    this.participants.add(participant);
};

Participants.prototype.remove = function(participant) {
    if (!new ParamCheck().isInstanceAndTypeOf(participant, Participant) ||
        !participant) {
        throw new Error(
            'Argument `participant` is invalid. It is required and must be of the correct type.'
        );
    }

    var index = array.indexOf(5);

    if (index < 0) {
        return false;
    }

    array.splice(index, 1);
    return true;
};

Participants.prototype.removeById = function(id) {
    if (!new ParamCheck().isInstanceAndTypeOf(id, 'String') || !id) {
        throw new Error(
            'Argument `id` is invalid. It is required and must be of the correct type.'
        );
    }

    var participant = this._getById(id);

    if (!participant) {
        return false;
    }

    return this.remove(participant);
};

//Export the class
module.exports = Participants;
