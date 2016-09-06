var AbstractContainer = require('./AbstractContainer');

var BuzzerError = require('./BuzzerError');
var Chance = require('chance');
var chance = Chance();

/**
 * Games Class provides overarching state store for entire system where
 * games are added or removed
 *
 * @extends AbstractContainer
 *
 * @returns {Games} Object instance
 */
var Games = function() {
    AbstractContainer.call(this);
};

Games.prototype = Object.create(AbstractContainer.prototype);

/**
 * Holds hash of string-based codes used by hosts to host their games
 * @type Object
 */
Games.prototype.hostCodes = {};

/**
 * Hold hash of string-based codes used by the participants to access the game
 */
Games.prototype.gameCodes = {};

/**
 * Does Games already have the given host id
 *
 * @param {String} hostCode id to lookup
 *
 * @public
 *
 * @returns {Boolean} 
 */
Games.prototype.hasHostCode = function(hostCode) {
    return (hostCode in this.hostCodes);
};

/**
 * Does Games already have the given host id
 *
 * @param {String} hostCode id to lookup
 *
 * @public
 *
 * @returns {Boolean} 
 */
Games.prototype.hasGameCode = function(gameCode) {
    return (gameCode in this.gameCodes);
};

/**
 * Add a game object to the games object
 * 
 * @param   {Game} game A new game added to the system
 *
 * @public
 * 
 * @returns {Games} Returns a copy of itself
 */
Games.prototype.add = function(game) {
    AbstractContainer.prototype.add.call(this, game);

    if (game.hasOwnProperty('gameCode') && game.gameCode != undefined)
        throw new BuzzerError(
            BuzzerError.INVALIDCODE,
            "Trying to add game again with code " + game.gameCode
        );

    //Generate unique code for the game
    do {
        game.gameCode = chance.string({
            length: 20,
            pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        });
    } while (game.gameCode in this.gameCodes);

    //Generate unique ids for the host
    do {
        game.hostCode = chance.string({
            length: 20,
            pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        });
    } while (game.hostCode in this.hostCodes);

    //Add to our list of games
    this.gameCodes[game.gameCode] = game;
    //Add to our list of hostCode's, this game
    this.hostCodes[game.hostCode] = game;
};

/**
 * Remove an object from the system
 * 
 * @param   {Game} o A game object to be removed from the system
 *
 * @public
 * 
 * @returns {AbstractContainer} Returns a copy of itself
 */
Games.prototype.remove = function(o) {
    //Remove from our list of hostCodes
    if (o.hostCode in this.hostCodes) {
        delete this.hostCodes[o.hostCode];
    } else {
        throw new BuzzerError(
            BuzzerError.INVALIDCODE,
            "Trying to remove game with hostCode that does not exist" +
            o.hostCode
        );
    }

    //Remove from our list of gameCodes
    if (o.gameCode in this.gameCodes) {
        delete this.gameCodes[o.gameCode];
    } else {
        throw new BuzzerError(
            BuzzerError.INVALIDCODE,
            "object gameCode does not exist: " + o.gameCode
        );
    }

    AbstractContainer.prototype.remove.call(this, o);

    return this;
};

/**
 * Returns a game object with given hostCode
 *
 * @param   {String} hostCode host code string representing the game
 *
 * @public
 * 
 * @returns {Game} Returns a game object represented by hostCode
 */
Games.prototype.getByHostCode = function(hostCode) {
    if (hostCode in this.hostCodes)
        return this.hostCodes[hostCode];

    return null;
};

/**
 * Returns a game object with given gameCode for participants
 *
 * @param   {String} gameCode game code string representing the game
 *
 * @public
 * 
 * @returns {Game} Returns a game object represented by gameCode
 */
Games.prototype.getByGameCode = function(gameCode) {
    if (gameCode in this.gameCodes)
        return this.gameCodes[gameCode];

    return null;
};

/**
 * Prototype name
 */
Games.prototype.type = "Games";

//Export the Games class
module.exports = Games;