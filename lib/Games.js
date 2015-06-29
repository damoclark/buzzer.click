
var AbstractContainer = require('./AbstractContainer') ;
var Chance = require('chance') ;
var chance = Chance() ;


var Games = function()
{
	AbstractContainer.call(this) ;
} ;

Games.prototype = new AbstractContainer() ;

Games.prototype.admins = {} ;

/**
 * Does Games already have the given admin id
 *
 * @param {String} adminId id to lookup
 *
 * @returns {Boolean} 
 */
Games.prototype.hasAdminId = function(adminId)
{
	return (adminId in this.admins) ;
} ;

/**
 * Add a game object to the games object
 * 
 * @param   {Game} game A new game added to the system
 * 
 * @returns {Games} Returns a copy of itself
 */
Games.prototype.add = function(game)
{
	if ('id' in game && game.id != undefined)
		throw "Trying to add game again with id " + game.id ;

	//Generate unique ids for the game
	do
	{
		game.id = chance.string
		(
			{
				length:20,
				pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
			}
		) ;
	} while(game.id in this.objects) ;
	
	//Generate unique ids for the admin
	do
	{
		game.adminId = chance.string
		(
			{
				length:20,
				pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
			}
		) ;
	} while(game.adminId in this.admins) ;

	//Add to our list of games
	this.objects[game.id] = game ;
	//Add to our list of adminId's, this game
	this.admins[game.adminId] = game ;
} ;

/**
 * Returns a game object with given admin id
 *
 * @param   {String} adminId Admin id string representing the game
 *
 * @returns {Game} Returns a game object represented by adminId
 */
Games.prototype.getByAdminId = function(adminId)
{
	if (adminId in this.admins)
		return this.admins[adminId] ;

	return null ;
} ;

//Export the Games class
module.exports = Games ;


