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
 * Sets or gets the error.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the error.
 * @return {String} the error.
 */
Object.defineProperty(ErrorMessage.prototype, 'error', {
    get: function() {
        return this.data._error;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._error = val;
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
        '_error': {
            'type': 'string'
        },
    },
    'required': [
        '_error',
    ]
};

module.exports = ErrorMessage;
