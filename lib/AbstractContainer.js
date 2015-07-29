

/**
 * An abstract container object prototype for state information for the server
 */
var AbstractContainer = function()
{
	//Initialise id property to 0, to be used to provide unique ids for objects
	this.id = 0 ;
} ;

AbstractContainer.prototype.objects = {} ;

/**
 * Get unique id number
 *
 * @private
 * @returns {Integer} A unique integer value
 */
AbstractContainer.prototype.getNextId = function()
{
	return ++this.id ;
} ;


/**
 * Does System already have the given id
 *
 * @param {String} id id to lookup
 * @public
 *
 * @returns {Boolean} 
 */
AbstractContainer.prototype.hasId = function(id)
{
	return (id in this.objects) ;
} ;

/**
 * Add an object to the system
 * 
 * @param   {Object} o A new object added to the system
 * @public
 * 
 * @returns {AbstractContainer} Returns a copy of itself
 */
AbstractContainer.prototype.add = function(o)
{
	if (!o.hasOwnProperty('id'))
	//if (!'id' in o)
	{
		o.id = this.getNextId() ;
	}
	else if (this.objects.hasOwnProperty(o.id))
	{
		throw "Trying to add object that already been added with id " + o.id ;
	}
	else
	{
		throw "Trying to add object that already has an id " + o.id ;
	}

	//Add to our list of objects
	this.objects[o.id] = o ;
} ;

/**
 * Remove an object from the system
 * 
 * @param   {Object} o An object to be removed from the system
 * @public
 * 
 * @returns {AbstractContainer} Returns a copy of itself
 */
AbstractContainer.prototype.remove = function(o)
{
	//Remove from our list of games
	if (this.hasId(o.id))
	{
		delete this.objects[o.id] ;
	}
	else
	{
		throw "object does not exist" ;
	}
	return this ;
} ;

/**
 * Returns an object with given id
 *
 * @param   {String} id String representing the game
 * @public
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
