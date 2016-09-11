var AbstractMessage = require('./AbstractMessage');
var ParamCheck = require('../ParamCheck');

/**
 * Represent a message which to response to a @see {@link ContestantJoinRequestMessage}.
 * @extends AbstractMessage
 * @returns {ContestantJoinResponseMessage}
 */
var ContestantJoinResponseMessage = function(args) {
    AbstractMessage.call(this, args);
};

/**
 * ContestantJoinResponseMessage is a subclass of AbstractMessage
 */
ContestantJoinResponseMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class
 * @public
 */
ContestantJoinResponseMessage.prototype.type = 'ContestantJoinResponseMessage';

/**
 * Sets or gets the contestant id.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the contestant id.
 * @return {String} the contestant id.
 */
Object.defineProperty(ContestantJoinResponseMessage.prototype, 'contestantId', {
    get: function() {
        return this.data._contestantId;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._contestantId = val;
    }
});

/**
 * Sets or gets the was successful flag.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {Boolean} the was successful flag.
 * @return {Boolean} the was successful flag.
 */
Object.defineProperty(ContestantJoinResponseMessage.prototype, 'wasSuccessful', {
    get: function() {
        return this.data._wasSuccessful;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'Boolean')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._wasSuccessful = val;
    }
});

/**
 * Sets or gets the failed request reason.
 * @public
 * @throw on set val when param equates to false or is an incorrect type.
 * @param {String} the failed request reason.
 * @return {String} the failed request reason.
 */
Object.defineProperty(ContestantJoinResponseMessage.prototype, 'failedRequestReason', {
    get: function() {
        return this.data._failedRequestReason;
    },
    set: function(val) {
        if (!new ParamCheck().isInstanceAndTypeOf(val, 'String')) {
            throw new Error(
                'Argument `val` is invalid. It is required and must be of the correct type.'
            );
        }
        this.data._failedRequestReason = val;
    }
});

/**
 * Data structure for json validation of message data property
 * @private
 */
ContestantJoinResponseMessage.prototype.messagePayloadSchema = {
    'id': '/MessagePayload',
    'type': 'object',
    'properties': {
        '_contestantId': {
            'type': 'string'
        },
        '_wasSuccessful': {
            'type': 'boolean'
        },
        '_failedRequestReason': {
            'type': 'string'
        },
    },
    'required': [
        '_wasSuccessful'
    ]
};

module.exports = ContestantJoinResponseMessage;
