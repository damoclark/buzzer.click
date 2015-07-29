

var Hosts = require('./Hosts') ;
var Settings = require('./Settings') ;
var Clients = require('./Clients') ;
var Teams = require('./Teams') ;
var State = require('./State') ;

/**
 * Game object contains the data for this game, including other objects
 *
 * @param {Settings} settings An instance of settings with config for this game
 * 
 * @returns {Game} Instance of Game data
 */
var Game = function(settings)
{
	if (settings)
		this.setSettings(settings) ;
	this.hosts = new Hosts() ;
	this.state = new State() ;
	this.clients = new Clients() ;
	this.teams = new Teams() ;
} ;

/**
 * Set the Game objects settings
 *
 * @param {Settings} settings an instance of Settings for this game
 *
 * @public
 *
 * @returns {Game} An instance of itself
 */
Game.prototype.setSettings = function(settings)
{
	if (settings.type != 'Settings')
	{
		throw "Invalid settings object provided to Game" ;
	}
	
	this.settings = settings ;
	
	//@todo Do things based on settings provided
} ;

/**
 * Prototype name
 */
Game.prototype.type = 'Game' ;

//Export the Game class
module.exports = Game ;


