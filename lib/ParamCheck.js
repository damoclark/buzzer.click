/**
 * Param check module.
 * @module ParamCheck
 */

/**
 * Represents a param checker.
 * @public
 * @constructor
 */
function ParamCheck() {}

/**
 * Prototype name
 */
ParamCheck.prototype.type = 'IdentifierUtility';

/**
 * Defines a method which will check the given obj is not undefined, null, or not
 * specified typeOrName.
 * @public
 * @param  {*} obj
 * @param  {String|Function} typeOrName
 * @example
 * // built-in type
 * var result1 = new ParamCheck().isInstanceAndTypeOf(1, 'Number');
 * // User defined type
 * var result2 = new ParamCheck().isInstanceAndTypeOf(new ParamCheck(), ParamCheck);
 * @return {Boolean} true when obj is defined, not null and matches the type specified by typeOrName.
 */
ParamCheck.prototype.isInstanceAndTypeOf = function(obj, typeOrName) {
    if (typeof obj === 'undefined' || obj == null) {
        return false;
    }

    if (Object.prototype.toString.call(typeOrName).slice(8, -1) === 'String') {
        return Object.prototype.toString.call(obj).slice(8, -1) === typeOrName;
    }

    return (obj instanceof typeOrName);
};

//Export the class
module.exports = ParamCheck;
