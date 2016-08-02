/**
 * Settings object contains configuration options for this game
 *
 * @returns {Settings} Instance of Settings
 */
var Settings = function() {

};

/**
 * Set the name for this game
 *
 * @param {String} name - The name of the game
 *
 * @public
 */
Settings.prototype.setName = function(name) {
    if (name) {
        this.data.name = name;
    }
    return this;
};

/**
 * Get the name for this game
 *
 * @public
 */
Settings.prototype.getName = function() {
    return this.data.name;
};

/**
 * Set whether to use teams
 *
 * @param {Boolean} teams - Whether to use teams in this game
 *
 * @public
 */
Settings.prototype.setTeams = function(teams) {
    this.data.teams = teams === true ? true : false;
    return this;
};

/**
 * Does this game have teams
 *
 * @public
 *
 * @returns {Boolean} True if has teams, otherwise false
 */
Settings.prototype.hasTeams = function() {
    return this.data.teams;
};

/**
 * Set whether game has a time limit to answer question
 *
 * @param {Integer} time - If null or 0, then no time limit, otherwise
 * specify time in seconds to answer question
 *
 * @public
 */
Settings.prototype.setTimeLimit = function(time) {
    this.data.time = (typeof time === 'number') && time !== 0 ? time : 0;
    return this;
};

/**
 * Does this game have a time limit to answer question
 *
 * @public
 *
 * @returns {Integer} 0 If no time limit, otherwise number of
 * seconds per question
 */
Settings.prototype.getTimeLimit = function() {
    return this.data.time;
};

/**
 * Set whether teams or contestants can chnage thier name
 *
 * @param {Boolean} nameChange - Whether team or contentant can change
 * thier name
 *
 * @public
 */
Settings.prototype.setNameChange = function(nameChange) {
    this.data.nameChange = nameChange === true ? true : false;
    return this;
};

/**
 * Does this allow teams or contestants to change their name
 *
 * @public
 *
 * @returns {Boolean} True if name changing is allowed, otherwise false
 */
Settings.prototype.getNameChange = function() {
    return this.data.nameChange;
};

/**
 * Set default options for Settings
 */
Settings.prototype.data = {
    teams: true,
    name: null,
    time: 0,
    nameChange: false
};

/**
 * Prototype name
 */
Settings.prototype.type = 'Settings';

//Export the class
module.exports = Settings;
