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
         * Rejoin session message constant.
         * @public
         * @constant
         */
        REJOIN_SESSION: 'RejoinSessionMessage',
        /**
         * Error message constant.
         * @public
         * @constant
         */
        ERROR: 'ErrorMessage',
        /**
         * Success message constant.
         * @public
         * @constant
         */
        SUCCESS: 'SuccessMessage',
        /**
         * Observer update message.
         * @public
         * @constant
         */
        OBSERVER_UPDATE: 'ObserverUpdateMessage',
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
        CONTESTANT_JOIN_RESPONSE: 'ContestantJoinResponseMessage'
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
}

//Export the class
module.exports = new Constants();
