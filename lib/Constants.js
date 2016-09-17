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
     * Is an object which holds the game states.
     * @public
     */
    this.gameStates = {
        /**
         * Game state pending buzzer was pressed and is now waiting for host determination.
         * @public
         * @constant
         */
        PENDING: 'pending',
        /**
         * Game state buzzer lock - no contestant can press buzzer.
         * @public
         * @constant
         */
        BUZZER_LOCK: 'buzzerLock',
        /**
         * Game state ready, wait for buzzer press, disable buzzers or complete session.
         * @public
         * @constant
         */
        READY: 'ready',
        /**
         * Game state completed, the session is now over.
         * @public
         * @constant
         */
        COMPLETED: 'completed'
    };
    /**
     * Is an object which holds team leader selection method constants.
     * @public
     */
    this.teamLeaderSelectionMethod = {
        /**
         * Manual team leader selection.
         * @public
         * @constant
         */
        RANDOM: 0,
        /**
         * Auto team selection.
         * @public
         * @constant
         */
        PLAYER_CHOICE: 1,
        /**
         * A special constants which holds all constant values.
         * @constant
         */
        all: [0, 1]
    };
    /**
     * Is an object which holds team name edit constants.
     * @public
     */
    this.teamNameEdit = {
        /**
         * Team names are automatically assigned.
         * @public
         * @constant
         */
        AUTO: 0,
        /**
         * Teams name are automatically assigned, but editable by team leader.
         * @public
         * @constant
         */
        ALLOW: 1,
        /**
         * Teams name manually set by the host.
         * @public
         * @constant
         */
        MANUAL: 2,
        /**
         * A special constants which holds all constant values.
         * @constant
         */
        all: [0, 1, 2]
    };
    /**
     * Is an object which holds host buzzer action commands.
     * @public
     */
    this.buzzerActionCommands = {
        /**
         * Buzzer input is accepted.
         * @public
         * @constant
         */
        ACCEPT: 0,
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
         * Buzzer inputs are to be disabled.
         * @public
         * @constant
         */
        DISABLE: 3,
        /**
         * Buzzer inputs are to be enabled.
         * @public
         * @constant
         */
        ENABLE: 4,
        /**
         * A special constants which holds all constant values.
         * @constant
         */
        all: [0, 1, 2, 3, 4]
    };
    /**
     * Is an object which holds sock message type name constants.
     * @public
     */
    this.socketMessageNames = {
        /**
         * Buzzer action command message.
         * @public
         * @constant
         */
        BUZZER_ACTION_COMMAND: 'BuzzerActionCommandMessage',
        /**
         * Contestant contestant buzzer press message.
         * @public
         * @constant
         */
        CONTESTANT_BUZZER_PRESS: 'ContestantBuzzerPressMessage',
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
         * Create session message.
         * @public
         * @constant
         */
        CREATE_SESSION: 'CreateSessionMessage',
        /**
         * Create session response message.
         * @public
         * @constant
         */
        CREATE_SESSION_RESPONSE: 'CreateSessionResponseMessage',
        /**
         * Error message.
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
         * Rejoin session message.
         * @public
         * @constant
         */
        REJOIN_SESSION: 'RejoinSessionMessage',
        /**
         * Round won message.
         * @public
         * @constant
         */
        ROUND_WON_MESSAGE: 'RoundWonMessage',
        /**
         * Session complete message.
         * @public
         * @constant
         */
        SESSION_COMPLETE: 'SessionComplete',
        /**
         * Session completed message.
         * @public
         * @constant
         */
        SESSION_COMPLETED: 'SessionCompleted',
        /**
         * Success message.
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
         * Message: Username has already been taken.
         * @public
         * @constant
         */
        USERNAME_TAKEN: 'Username has already been taken.',
        /**
         * Message: Could not complete session, as  you are not the host.
         * @public
         * @constant
         */
        COULD_NOT_COMPLETE_SESSION_NOT_HOST: 'Could not complete session, as you are not the host.',
        /**
         * Message: Could not accept buzzer press, as you are not a contestant.
         * @public
         * @constant
         */
        COULD_NOT_ACCEPT_BUZZER_PRESS_NOT_CONTESTANT: 'Could not accept buzzer press, as you are not a contestant.',
        /**
         * Message: Could not accept request, as you are not the host.
         * @public
         * @constant
         */
        COULD_NOT_ACCEPT_REQUEST_NOT_HOST: 'Could not accept request, as you are not the host.',
        /**
         * Message: Could process the request, as it is not valid for the current game state.
         * @public
         * @constant
         */
        COULD_NOT_PROCESS_REQUEST_GAME_STATE_WILL_NOT_ALLOW: 'Could process the request, as it is not valid for the current game state.',
        /**
         * Message: Buzzer press was not accepted by session.
         * @public
         * @constant
         */
        BUZZER_PRESS_NOT_ACCEPTED: 'Buzzer press was not accepted by session.',
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

        TEAMS_ARE_FULL: 'Teams are full'
    };
}

//Export the class
module.exports = new Constants();
