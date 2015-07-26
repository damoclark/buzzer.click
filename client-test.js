#!/usr/bin/env node

var MessageFactory = require('./lib/MessageFactory') ;

var socketio = require('socket.io-client')('http://localhost:3000') ;
socketio.on('connect', function()
{
	console.log('Connected') ;
	/**
	 * Establish event handler for receiving an AbstractMessage message - overriden
	 * method from Socket class
	 *
	 * @param {String} event Name of event to wait for
	 * @param {Function} fn Function to call on message
	 */
	socketio.onMessage = function(event,fn)
	{
		this.on(event,function(msg)
		{
			var message = MessageFactory.restore(msg) ;
			fn(message) ;
		} ) ;
	} ;
	
	/**
	 * Emit an AbstractMessage message - overidden method from Socket class
	 * @param {AbstractMessage} message A subclass of AbstractMessage to be sent
	 * @param {Function} fn An optional callack to execute to send a reply
	 */
	socketio.emitMessage = function(message,fn)
	{
		this.emit('message',message.get(),fn) ;
	} ;

	socketio.onMessage('message',function(message)
	{
			console.log('Received '+message.getType()+' message with data:'+JSON.stringify(message.get())) ;
	} ) ;

	var m = MessageFactory.create('JoinGameMessage') ;
	m.setGameCode('12345') ;
	
	socketio.emitMessage(m) ;
} ) ;
