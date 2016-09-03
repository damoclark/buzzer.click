var ParamCheck = require('./ParamCheck');

/**
 * Represents a collection of {Session}s.
 *
 * @returns {Sessions} Instance of Sessions
 */
function Sessions() {

}

/**
 * Prototype name
 */
Sessions.prototype.type = 'Sessions';

Sessions.prototype.sessions = [];

Sessions.prototype.add = function(host, settings) {
    // if (!new ParamCheck().isInstanceAndTypeOf(host, Host) || !host) {
    //     throw new Error(
    //         'Argument `host` is invalid. It is required and must be of the correct type.'
    //     );
    // }
    // if (!new ParamCheck().isInstanceAndTypeOf(settings, Settings) || !
    //     settings) {
    //     throw new Error(
    //         'Argument `settings` is invalid.  It is required and must be of the correct type.'
    //     );
    // }
    //sessions.add(new Session());
};

Sessions.prototype.getById = function(id) {
    if (!new ParamCheck().isInstanceAndTypeOf(id, 'String') || !id) {
        throw new Error(
            'Argument `id` is invalid. It is required and must be of the correct type.'
        );
    }
    return null;
}

//Export the class
module.exports = Sessions;



/*
IdentifierUtility
--
+ generateSessionId(): String
+ generateSessionParticipantId(): String
// This is a comment
// (--) This is a section break
// Line break (\n) enter in-between text for line break
*/