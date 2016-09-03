/**
 * Constants module.
 * @module constants
 */

function Constants()  {
    this.teamSelectionMethod = {
        MANUAL: 0,
        AUTO: 1,
        all: [1, 0]
    };
    this.teamNameEdit = {
        ALLOW: 0,
        LOCKED: 1,
        all: [1, 0]
    };
    this.hostBuzzerResetState = {
        ACCEPTED: 0,
        REJECT: 1,
        RESET: 2,
        all: [1, 0, 2]
    };
}

//Export the class
module.exports = new Constants();
