/**
 * Constants module.
 * @module constants
 */

/**
 * Represents a singleton class that holds constants defined for use
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
        all: [1, 0, 2]
    };
}

//Export the class
module.exports = new Constants();
