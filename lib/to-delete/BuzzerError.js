/**
 * Exception handler class for Buzzer.click
 * 
 * @param   {Integer} code     Error code number
 * @param   {String} message Error message for the user
 * @param   {String} fileName The filename where the error occurred (default to filename where called constructor)
 * @param   {Integer} lineNumber The line number where the error occurred (default to line number where called constructor)
 *
 * @extends Error
 * 
 * @returns {BuzzerError} An instance of BuzzerError
 */
var BuzzerError = function(code, message, fileName, lineNumber) {
    Error.call(this, message, fileName, lineNumber);
    this.code = code;
};

//BuzzerError extends Error
BuzzerError.prototype = Object.create(Error.prototype);

//Error codes
BuzzerError.prototype.INVALID_CODE = 1;
BuzzerError.prototype.INVALID_ID = 2;
BuzzerError.prototype.PROTOCOL_ERROR = 255;

//Error messages
BuzzerError.prototype.messages = {};
BuzzerError.prototype.messages[BuzzerError.prototype.INVALID_CODE] =
    "";
BuzzerError.prototype.messages[BuzzerError.prototype.INVALID_ID] =
    "";
BuzzerError.prototype.messages[BuzzerError.prototype.PROTOCOL_ERROR] =
    "";

/**
 * Set the error code for this error object
 * 
 * @param   {Integer} code The error code number (see codes in BuzzerError)
 *
 * @public
 * @returns {BuzzerError} A reference to this
 */
BuzzerError.prototype.setCode = function(code) {
    this.code = code;
    return this;
};

/**
 * Get the error code for this error object
 *
 * @public
 * @returns {Integer} Error code set for this object
 */
BuzzerError.prototype.getCode = function() {
    return this.code;
};

/**
 * Set the error message for this error object
 * 
 * @param   {String} message Error message string
 *
 * @public
 * @returns {BuzzerError} A reference to this
 */
BuzzerError.prototype.setMessage = function(message) {
    this.message = message;
    return this;
};

/**
 * Get the error message for this error object
 *
 * @public
 * @returns {String} Error message for this error object for user
 */
BuzzerError.prototype.getMessage = function() {
    return this.message;
};

/**
 * Set the name of this error (default to BuzzerError)
 * 
 * @param   {String} BuzzerError The name to set for this error
 *
 * @public
 * @returns {BuzzerError} A reference to this
 */
BuzzerError.prototype.setName = function(name) {
    this.name = name;
    return this;
};

/**
 * Get the name of this error object
 *
 * @public
 * @returns {String} The name of this error message (default to BuzzerError)
 */
BuzzerError.prototype.getName = function() {
    return this.name;
};

module.exports = BuzzerError;