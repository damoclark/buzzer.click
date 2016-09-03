var ParamCheck = require('./ParamCheck');

/**
 * Sessions module.
 * @module sessions
 */

/**
 * Represents a @see {@link: Session} collection.
 * @constructor
 */
function Sessions() {
    this._sessions= [];
}

/**
 * Prototype name
 */
Sessions.prototype.type = 'Sessions';

Sessions.prototype._sessions = [];

Sessions.prototype.add = function(host, settings) {
    // if (!new ParamCheck().isInstanceAndTypeOf(host, Host) || !host) {
    //     throw new Error(
    //         'Argument `host` is invalid. It is required and must be of the correct type.');
    //     );
    // }
    // if (!new ParamCheck().isInstanceAndTypeOf(settings, Settings) || !
    //     settings) {
    //     throw new Error(
    //         'Argument `settings` is invalid. It is required and must be of the correct type.');
    //     );
    // }
    // sessions.add(new Session());
};

/**
 * Defines a method which gets a registered session by @see{@link: session.id}.
 * @param  {id} String
 * @throw when param id equates to false or is an incorrect type.
 * @return session matching the given id; or, null.
 */
Sessions.prototype.getById = function(id) {
    if (!new ParamCheck().isInstanceAndTypeOf(id, 'String') || !id) {
        throw new Error(
            'Argument `id` is invalid. It is required and must be of the correct type.'
        );
    }
    return this._sessions.find(function(s) {
        return s.id === id;
    });
}

//Export the class
module.exports = Sessions;



/*

Sessions
--
- sessions: Array[Session]
--
+ add(host: Host, settings: SessionSettings)
+ getById(sessionId: String): Session
+ purgeCompleted(): void

// This is a comment
// (--) This is a section break
// Line break (\n) enter in-between text for line break
*/