var AbstractMessage = require('../AbstractMessage');

/**
 * This message is from server to client and provides the contestant buzzer press event
 * No getter or setter, this message is only a trigger
 *
 * @param {Object} args The data for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {ContestantBuzzerPress} An instance
 */
var ContestantBuzzerPress = function(args) {
    AbstractMessage.call(this, args);
    this.set(args);
    this.data.press = true; //set the press data event to true when object is created, to conform to jsonschema validation
};

/**
 * ContestantBuzzerPress is a subclass of AbstractMessage
 */
ContestantBuzzerPress.prototype = Object.create(AbstractMessage.prototype);

/**
 * The type of this class
 * @public 
 */
ContestantBuzzerPress.prototype.type = 'ContestantBuzzerPress';

/**
 * Data structure for this message
 * @private
 */
ContestantBuzzerPress.prototype.data = {};

/**
 * Data structure for json validation of message data property
 * @private
 */
ContestantBuzzerPress.prototype.schema = {
    "id": "http://jsonschema.net/data",
    "type": "object",
    "properties": {
        "press": {
            "id": "http://jsonschema.net/data/press",
            "type": "boolean"
        }
    },
    "required": [
        "press"
    ]
};

module.exports = ContestantBuzzerPress;