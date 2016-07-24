
var console = require('console') ;
var AbstractMessage = require('./AbstractMessage') ;
var semver = require('semver') ;

//There is no sensible way to do dynamic loading of modules using browserify
//for the browser and node.js at the moment.  A promising future project is
//underway but for now, will statically require modules
//https://github.com/capaj/require-globify/issues/11
//http://stackoverflow.com/questions/21642398/compiling-dynamically-required-modules-with-browserify
//https://github.com/capaj/require-globify
//Load all message objects using require-globify
//var classes = require('./message/*.js',{glob: 'true',mode: 'hash'}) ;
//https://www.npmjs.com/package/require-glob

var classes =
{
	//AssignTeamLeaderMessage: require('./message/AssignTeamLeaderMessage.js'),
	//ConfirmMessage: require('./message/ConfirmMessage.js'),
	//ConfirmNameMessage: require('./message/ConfirmNameMessage.js'),
	//ConfirmTeamLeaderMessage: require('./message/ConfirmTeamLeaderMessage.js'),
	//ConfirmTeamMessage: require('./message/ConfirmTeamMessage.js'),
	CreateGameMessage: require('./message/CreateGameMessage.js'),
	JoinGameMessage: require('./message/JoinGameMessage.js'),
	//JoinTeamMessage: require('./message/JoinTeamMessage.js'),
	//LeaveTeamMessage: require('./message/LeaveTeamMessage.js'),
	RegisterNameMessage: require('./message/RegisterNameMessage.js'),
	//RegisterTeamMessage: require('./message/RegisterTeamMessage.js')
} ;
//The following removed as doesn't work in browser with browserify
//var messageClasses = fs.readdirSync(__dirname+'/message') ;
//console.log(messageClasses) ;
//var me = this ;
//messageClasses.forEach
//(
//	function(filename)
//	{
//		//Strip off .js from filename to reveal the class name
//		className = filename.replace(/\.js$/,'') ;
//		console.log(className) ;
//		console.log(__dirname+'/message/'+filename) ;
//		//Load the class into the property validMessages by its class name
//		classes[className] = require(__dirname+'/message/'+filename) ;
//	}
//) ;

for(var m in classes)
{
//Export all the Message Constructors
	exports[m] = classes[m] ;
	//Export all the Message Constructor names as constants
	exports[m.toUpperCase()] = m ;
}

/**
 * Given json object received from remote endpoint, return a subclass of
 * AbstractMessage representing this message.  Null if there is an validation
 * error
 *
 * @param {Object|String} msg JSON from client/server
 *
 * @return {AbstractMessage} message object from json data
 */
function restore(msg)
{
	//If the protocol version of the client is newer than server
	if (semver.gt(msg.protocol, AbstractMessage.prototype.protocol))
	{
		throw "Client protocol " + msg.protocol + ", server protocol " + AbstractMessage.prototype.protocol ;
	}
	return create(msg.type,msg.data) ;
}

/**
 * Create a new message object by the given name, and optionally initialised
 * with the values in the Object args, and return it.  Null if there was an
 * error
 *
 * @param {String} name Name of the message object to create
 * @param {Object} args Optional initial values to set for this instance
 *
 * @returns {AbstractMessage} The message
 */
function create(name,args)
{
	//If data is a string and exists as a class name, use that name
	if (classes[name] === undefined)
		throw ("Invalid message class " + name) ;

	//http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
	//The following allows creating new objects with arbirary parameters
	//var a = Array.prototype.slice.call(arguments,1) ; //Get rid of name
	//var o = Object.create(classes[name].prototype) ; //Create required object
	//classes[name].apply(o,a) ; //Call its constructor with any arguments to create
	//return o ; //Return it
	return new classes[name](args) ;
}

/**
 * Methods to add to the socket object
 */
var methods = 
{
	/**
	 * Establish event handler for receiving an AbstractMessage message - overriden
	 * method from Socket class
	 *
	 * @param {String} event Name of event to wait for
	 * @param {Function} fn Function to call on message
	 */
	onMessage: function(event,fn)
	{
		this.on(event,function(msg)
		{
			var message = restore(msg) ;
			fn(message) ;
		} ) ;
	},
	/**
	 * Emit an AbstractMessage message - overidden method from Socket class
	 * @param {AbstractMessage} message A subclass of AbstractMessage to be sent
	 * @param {Function} fn An optional callack to execute to send a reply
	 */
	emitMessage: function(message,fn)
	{
		this.emit(message.getType(),message.getJSON(),fn) ;
	}
} ;

/**
 * Add emitMessage and onMessage methods to object
 *
 * @param {Socket} socket The socket object to add the methods to
 * 
 */
function updateSocket(socket)
{
  for(var m in methods)
  {
    socket[m] = methods[m] ;
  }
} ; 




//Export the module functions
exports.restore = restore ;
exports.create = create ;
exports.updateSocket = updateSocket ;
