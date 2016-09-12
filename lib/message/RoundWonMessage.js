var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * Represents message which is use to convey winner information for when a session round is won.
 * @extends AbstractMessage
 * @returns {ErrorMessage}
 */
var RoundWonMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * RoundWonMessage is a subclass of AbstractMessage.
 */
RoundWonMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
RoundWonMessage.prototype.type = 'RoundWonMessage';

/**
 * Sets or gets the username.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the error.
 * @return {String} the error.
 */
Object.defineProperty(RoundWonMessage.prototype, 'username', {
    get: function() {
        return this.data._username;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._username = val;
    }
});

/**
 * Sets or gets the teamName.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the error.
 * @return {String} the error.
 */
Object.defineProperty(RoundWonMessage.prototype, 'teamName', {
    get: function() {
        return this.data._teamName;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._teamName = val;
    }
});

/**
 * Data structure for json validation of message data property
 * @private
 */
RoundWonMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_username': {
            'type': 'string'
        },
        '_teamName': {
            'type': 'string'
        }
    },
    'required': [
        '_username',
    ]
};

module.exports = RoundWonMessage;
