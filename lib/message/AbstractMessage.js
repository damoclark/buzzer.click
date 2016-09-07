var Validator = require('jsonschema').Validator;

/**
 * Abstract message class from which all socket.io message objects should derive.
 * @abstract
 * @protected
 */
var AbstractMessage = function() {

    /**
     * Holds the message payload.
     */
    this.data = {};

    /**
     * Pulls definition from prototype.
     */
    this.protocol = this.protocol;

    /**
     * Pulls definition from prototype.
     */
    this.type = this.type;

    /**
     * Define the abstract message schema
     */
    this.schema = {
        'id': '/Message',
        'type': 'object',
        'properties': {
            'protocol': {
                'id': 'http://jsonschema.net/protocol',
                'type': 'string'
            },
            'type': {
                'id': 'http://jsonschema.net/type',
                'type': 'string',
                'pattern': '^' + this.type + '$'
            },
            'data': {
                '$ref': '/MessagePayload'
            }
        },
        //'additionalProperties': false,
        'required': [
            'protocol',
            'type',
            'data'
        ]
    };
};

/**
 * @private
 */
AbstractMessage.prototype.data = null;

/**
 * Data structure for json validation of message
 * @private
 */
AbstractMessage.prototype.schema = null;

/**
 * Validate the data data structure for the instance or if provided
 * the data object that is passed to this method
 *
 * @public
 * @returns {ValidatorResult}
 */
AbstractMessage.prototype.validate = function() {
    var v = new Validator();
    v.addSchema(this.messagePayloadSchema, '/MessagePayload');
    var result = v.validate(this, this.schema);
    return result;
};

/**
 * Validate the data data structure for the instance or if provided
 * the data object that is passed to this method
 *
 * @public
 * @returns {Boolean} true if valid, otherwise false
 */
AbstractMessage.prototype.isValid = function() {
    return this.validate().errors.length === 0;
}

AbstractMessage.prototype.protocol = '0.0.1';

//Export the class
module.exports = AbstractMessage;
