

var Hosts = require('./Hosts') ;
var Settings = require('./Settings') ;
var Clients = require('./Clients') ;
var Teams = require('./Teams') ;
var State = require('./State') ;

/**
 * Game object contains the data for this game, including other objects
 * 
 * @returns {Game} Instance of Game data
 */
var Game = function()
{

} ;

/**
 * Prototype name
 */
Game.prototype.type = 'Game' ;

//Export the Game class
module.exports = Game ;


