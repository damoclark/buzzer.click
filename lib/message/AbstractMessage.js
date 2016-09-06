var validate = require('jsonschema').validate;

/**
 * Abstract message class from which all socket.io message objects should derive
 * 
 */
var AbstractMessage = function() {
    /**
     * Data structure for json validation of message
     * @private
     */
    var schema = {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "id": "http://jsonschema.net",
        "type": "object",
        "properties": {
            "protocol": {
                "id": "http://jsonschema.net/protocol",
                "type": "string"
            },
            "type": {
                "id": "http://jsonschema.net/type",
                "type": "string",
                "pattern": "^" + this.type + "$"
            },
            "data": {
                "id": "http://jsonschema.net/data",
                "type": "object",
                "properties": {},
                "required": []
            }
        },
        "required": [
            "protocol",
            "type",
            "data"
        ]
    };

    //Append what is provided in the subclasses schema property to the
    //complete schema object
    schema.data = this.schema;

    //Copy prototype into this instance & disconnect from prototype
    this.data = this.data;
    this.schema = schema;

    //Add the protocol property to all message json schemas
    this.schema.properties.protocol = {
        "id": "http://jsonschema.net/protocol",
        "type": "string"
    };
    //Yes it must be provided
    this.schema.required.push('protocol');
};

/**
 * Validate the data datastructure for the instance or if provided
 * the data object that is passed to this method
 * 
 * @public 
 * @returns {Boolean} True if valid, otherwise false
 */
AbstractMessage.prototype.validate = function() {
    return validate(this.getJSON(), this.schema);
};

/**
 * Set the data for the message object to args, replacing the same values that
 * existed before
 * 
 * @param   {Object} args data to replace what is in this instance
 * @public
 * @returns {AbstractMessage} Returns itself
 */
AbstractMessage.prototype.set = function(args) {
    //console.log('inside set method, args=');
    //console.log(JSON.stringify(args));
    if (args != undefined) {
        for (var p in args) {
            this.data[p] = args[p];
        }
        //console.log('end of set method, args=');
        //console.log(JSON.stringify(this.data));
        return this.validate();
    }
    return true;
};

/**
 * Get the raw data from the message object
 * 
 * @returns {Object} Raw data object from message
 * @public
 */
AbstractMessage.prototype.get = function() {
    return this.data;
};

/**
 * Get the JSON data structure as sent over the network for this object
 *
 * @public
 * 
 * @returns {Object} JSON data structure to be sent over network
 */
AbstractMessage.prototype.getJSON = function() {
    //console.log('this.data=' + JSON.stringify(this.data));
    var j = {
        "protocol": this.protocol,
        "type": this.type,
        "data": this.data
    };
    //console.log('getJSON=');
    //console.log(JSON.stringify(j));
    return j;
};

/**
 * Get the type of this message as a string
 *
 * @public
 * @returns {String} The type of this object as a string
 */
AbstractMessage.prototype.getType = function() {
    return this.type;
};

AbstractMessage.prototype.protocol = '0.0.1';

//Export the class
module.exports = AbstractMessage;
