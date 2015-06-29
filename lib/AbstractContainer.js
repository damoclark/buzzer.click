
var AbstractContainer = function()
{
	//Initialise id property to 0, to be used to provide unique ids for objects
	this.id = 0 ;
} ;

AbstractContainer.prototype.objects = {} ;

/**
 * Get unique id number
 *
 * @returns {Integer} A unique integer value
 */
AbstractContainer.prototype.getNextId = function()
{
	return ++this.id ;
} ;


/**
 * Add an object to the system
 * 
 * @param   {Object} o A new object added to the system
 * 
 * @returns {AbstractContainer} Returns a copy of itself
 */
AbstractContainer.prototype.add = function(o)
{
	if (!'id' in o)
	{
		o.id = this.getNextId() ;
	}
	else if (o.id in this.objects)
	{
		throw "Trying to add object again with id " + o.id ;
	}

	//Add to our list of objects
	this.objects[o.id] = o ;
} ;

/**
 * Remove an object from the system
 * 
 * @param   {Object} o An object to be removed from the system
 * 
 * @returns {AbstractContainer} Returns a copy of itself
 */
AbstractContainer.prototype.remove = function(o)
{
	//Remove form our list of games
	if (o.id in this.objects)
	{
		delete this.objects[o.id] ;
	}
	return this ;
} ;

/**
 * Returns an object with given id
 *
 * @param   {String} id String representing the game
 *
 * @returns {Game} Returns an object represented by id
 */
AbstractContainer.prototype.get = function(id)
{
	if (id in this.objects)
		return this.objects[id] ;

	return null ;
} ;






module.exports = AbstractContainer ;
