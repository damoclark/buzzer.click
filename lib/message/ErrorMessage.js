var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * This message is from client to server or server to client as specifies an error, usually in the form of a response.
 * @extends AbstractMessage
 * @returns {ErrorMessage}
 */
var ErrorMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * ErrorMessage is a subclass of AbstractMessage.
 */
ErrorMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class.
 * @public
 */
ErrorMessage.prototype.type = 'ErrorMessage';


/**
 * Sets or gets the message.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the message.
 * @return {String} the message.
 */
Object.defineProperty(ErrorMessage.prototype, 'message', {
    get: function() {
        return this.data._message;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._message = val;
    }
});

/**
 * Data structure for json validation of message data property
 * @private
 */
ErrorMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_message': {
            'type': 'string'
        },
    },
    'required': [
        '_message',
    ]
};

module.exports = ErrorMessage;
