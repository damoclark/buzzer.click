
var console = require('console') ;
var fs = new require('fs') ;

/**
 * Return Message class based on json/object passed in
 * 
 */
var MessageFactory = function()
{
	//Load all message objects
	var messageClasses = fs.readdirSync(__dirname+'/message') ;
	console.log(messageClasses) ;
	var me = this ;
	messageClasses.forEach
	(
		function(filename)
		{
			//Strip off .js from filename to reveal the class name
			className = filename.replace(/\.js$/,'') ;
			console.log(className) ;
			console.log(__dirname+'/message/'+filename) ;
			//Load the class into the property validMessages by its class name
			me.validMessages[className] = require(__dirname+'/message/'+filename) ;
		}
	)
} ;

MessageFactory.prototype.validMessages = {} ;


//Export the Games class
module.exports = MessageFactory ;

//Export all the Message Types
for(var m in MessageFactory.validMessages)
{
	module.exports[m] = MessageFactory.validMessages[m] ;
}