var AbstractMessage = require('../AbstractMessage');

/**
 * This message is a generic confirmation from the last request
 * You can set a confirmation code where 0 is OK, and other numbers represent
 * different error states.  There is also a string message field which can be
 * used to present an error message to the user.
 *
 * @param {Integer} code The confirmation code (if undefined, then 0 - OK)
 * @param {String} message The confirmation message string (if undefined, then "")
 * @param {Object} args The data for this message object
 *
 * @extends AbstractMessage
 *
 * @returns {ConfirmMessage} An instance
 */
var ConfirmMessage = function (args) {
    AbstractMessage.call(this, args);
    this.set(args);
    //If a code has been set that is non-zero, see if a matching message string
    //exists in messages and if so, automatically set message to this string
    //unless the message has already been manually set
    if (this.data.confirm.code && this.messages.hasOwnProperty(this.data.confirm
        .code) && this.data.confirm.message == '')
        this.data.confirm.message = this.messages[code];
};

/**
 * ConfirmMessage is a subclass of AbstractMessage
 */
ConfirmMessage.prototype = Object.create(AbstractMessage.prototype);

/**
 * Set the code and message based on the values from a BuzzerError instance
 *
 * @param {BuzzerError} error An error instance to use for code and message
 * @write-only
 * @throws on get value
 * @public
 */
Object.defineProperty(ConfirmMessage, "buzzerError", {
    get: function () { throw new Error('Property is write-only.'); },
    set: function (error) {
            //this.data.confirm._code = error.getCode();
            this.message = error.getMessage();
    }
});

/**
 * Set the confirmation code for this message object
 *
 * @param {Integer} code The confirmation code value (if not set default 0 - OK)
 * 
 * @public
 *
 * @returns {ConfirmMessage} Returns instance of self
 */
Object.defineProperty(ConfirmMessage, "code", {
    get: function () { return this.data.confirm._code },
    set: function (code) {
        if (code !== undefined) {
            this.data.confirm._code = code;
            if (this.data.confirm.hasOwnProperty(code) && this.data.confirm._message ==
                '')
                this.data.confirm._message = this._messages[code];
        }
        return this;
    }
});

/**
 * Set the confirmation message for this message object.  No message means OK
 *
 * @param {Integer} code The confirmation code value (if not set default 0 - OK)
 * @public
 *
 * @returns {ConfirmMessage} Returns instance of self
 */
Object.defineProperty(ConfirmMessage, "message", {
    get: function () {
        return this.data.confirm._message;
    },
    set: function (message) {
        if (message !== undefined)
            this.data.confirm._message = message;
        return this;
    }
});


/**
 * The type of this class
 * @public 
 */
ConfirmMessage.prototype.type = 'ConfirmMessage';

/**
 * Data structure for this message
 * @private
 */
ConfirmMessage.prototype.data = {
    "confirm": {
        "_code": 0,
        "_message": ""
    }
};

/**
 * Data structure for json validation of message data property
 * @private
 */
ConfirmMessage.prototype.schema = {
    "id": "http://jsonschema.net/data",
    "type": "object",
    "properties": {
        "confirm": {
            "id": "http://jsonschema.net/data/confirm",
            "type": "object",
            "properties": {
                "_code": {
                    "id": "http://jsonschema.net/data/confirm/_code",
                    "type": "integer"
                },
                "_message": {
                    "id": "http://jsonschema.net/data/confirm/_message",
                    "type": "string"
                }
            },
            "required": ['_code', '_message']
        }
    },
    "required": ['confirm']
};

module.exports = ConfirmMessage;