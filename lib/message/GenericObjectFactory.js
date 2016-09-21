/**
 * Generic object factory
 * @module GenericObjectFactory
 */

/**
 * Represents a generic object factory
 * @public
 * @constructor
 */
function GenericObjectFactory() {

}

/**
 * Prototype name
 */
GenericObjectFactory.prototype.type = 'GenericObjectFactory';

/**
 * Represents a method which converts a given obj to a generic representation
 */
GenericObjectFactory.prototype.create = function(obj, target) {
    var wf = null;
    wf = function(o, t) {
        var io = (typeof t !== 'undefined') ? t : {};
        for (var f in o) {
            if (f === '_id' || f === '_events' || f === '_eventsCount') {
                continue;
            }
            var val = o[f];
            if (f.startsWith('_')) {
                f = f.substring(1);
            }
            if (val && typeof val === 'object') {
                io[f] = wf(val);
            } else {
                io[f] = val;
            }
        }
        return io;
    };
    return wf(obj, target);
};

//Export the class
module.exports = new GenericObjectFactory();
