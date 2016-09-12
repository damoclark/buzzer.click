/**
 * Constants module.
 * @module constants
 */

/**
 * Represents a singleton object that holds constants defined for use
 * within the application.
 * @public
 * @constructor
 */
function Constants() {
    /**
     * Is an object which holds team selection method constants.
     * @public
     */
    this.teamSelectionMethod = {
        /**
         * Manual team selection.
         * @public
         * @constant
         */
        MANUAL: 0,
        /**
         * Auto team selection.
         * @public
         * @constant
         */
        AUTO: 1,
        /**
         * A special constants which holds all constant values.
         * @constant
         */
        all: [1, 0]
    };
    /**
     * Is an object which holds team name edit constants.
     * @public
     */
    this.teamNameEdit = {
        /**
         * Allow team name editing.
         * @public
         * @constant
         */
        ALLOW: 0,
        /**
         * Lock team name editing.
         * @public
         * @constant
         */
        LOCKED: 1,
        /**
         * A special constants which holds all constant values.
         * @constant
         */
        all: [1, 0]
    };
    /**
     * Is an object which holds host buzzer state constants.
     * @public
     */
    this.hostBuzzerState = {
        /**
         * Buzzer input is accepted.
         * @public
         * @constant
         */
        ACCEPTED: 0,
        /**
         * Buzzer input is rejected.
         * @public
         * @constant
         */
        REJECT: 1,
        /**
         * Buzzer inputs are to reset.
         * @public
         * @constant
         */
        RESET: 2,
        /**
         * A special constants which holds all constant values.
         * @constant
         */
        all: [0, 1, 2]
    };
    /**
     * Is an object which holds sock message type name constants.
     * @public
     */
    this.socketMessageNames = {
        /**
         * Contestant buzzer state message.
         * @public
         * @constant
         */
        BUZZER_STATE_MESSAGE: 'BuzzerStateMessage',
        /**
         * Contestant contestant buzzer press.
         * @public
         * @constant
         */
        CONTESTANT_BUZZER_PRESS: 'ContestantBuzzerPress',
        /**
         * Contestant join response message.
         * @public
         * @constant
         */
        CONTESTANT_JOIN_REQUEST: 'ContestantJoinRequestMessage',
        /**
         * Contestant join request message.
         * @public
         * @constant
         */
        CONTESTANT_JOIN_RESPONSE: 'ContestantJoinResponseMessage',
        /**
         * Create session message constant.
         * @public
         * @constant
         */
        CREATE_SESSION: 'CreateSessionMessage',
        /**
         * Create session response message constant.
         * @public
         * @constant
         */
        CREATE_SESSION_RESPONSE: 'CreateSessionResponseMessage',
        /**
         * Error message constant.
         * @public
         * @constant
         */
        ERROR: 'ErrorMessage',
        /**
         * Observer update message.
         * @public
         * @constant
         */
        OBSERVER_UPDATE: 'ObserverUpdateMessage',
        /**
         * Rejoin session message constant.
         * @public
         * @constant
         */
        REJOIN_SESSION: 'RejoinSessionMessage',
        /**
         * Contestant round won message.
         * @public
         * @constant
         */
        ROUND_WON_MESSAGE: 'RoundWonMessage',
        /**
         * Contestant session complete message.
         * @public
         * @constant
         */
        SESSION_COMPLETE: 'SessionComplete',
        /**
         * Contestant session completed message.
         * @public
         * @constant
         */
        SESSION_COMPLETED: 'SessionCompleted',
        /**
         * Success message constant.
         * @public
         * @constant
         */
        SUCCESS: 'SuccessMessage'
    };
    /**
     * Is an object which holds rejoin as constants.
     * @public
     */
    this.rejoinAs = {
        /**
         * Rejoin as host.
         * @public
         * @constant
         */
        HOST: 1,
        /**
         * Rejoin as contestant.
         * @public
         * @constant
         */
        CONTESTANT: 2,
        /**
         * Rejoin as observer.
         * @public
         * @constant
         */
        OBSERVER: 3
    };
    /**
     * Is an object which holds messages.
     * @public
     */
    this.messages = {
        /**
         * Message: Maximum session sized reached.
         * @public
         * @constant
         */
        MAXIMUM_SESSION_SIZED_REACHED: 'Maximum session sized reached.',
        /**
         * Message: Session could not be found or is completed.
         * @public
         * @constant
         */
        SESSION_COULD_NOT_BE_FOUND_OR_IS_COMPLETED: 'Session could not be found or is completed.',
        /**
         * Message: Could not rejoin as host, as you are not the host!
         * @public
         * @constant
         */
        COULD_NOT_REJOIN_NOT_HOST: 'Could not rejoin as host, as you are not the host!',
        /**
         * Message: Could not rejoin a contestant, as you are not a contestant!
         * @public
         * @constant
         */
        COULD_NOT_REJOIN_NOT_CONTESTANT: 'Could not rejoin a contestant, as you are not a contestant!',
        /**
         * Message: Could not rejoin, as `join as` constant is unknown.
         * @public
         * @constant
         */
        COULD_NOT_REJOIN_UNKNOWN: 'Could not rejoin, as `join as` constant is unknown.',
    };
}

//Export the class
module.exports = new Constants();
