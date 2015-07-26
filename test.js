
var Server = require('./lib/BuzzerServer') ;

//var server = Server.listen(3000) ;

var Console = require('console') ;
var Games = require('./lib/Games') ;
var Game = require('./lib/Game') ;
var Teams = require('./lib/Teams') ;
var MessageFactory = require('./lib/MessageFactory') ;

var games = new Games() ;
var game = new Game() ;
var teams = new Teams() ;

/**
 * @type RegisterNameMessage
 */
var msg = MessageFactory.create('RegisterNameMessage',{"name":"Fred"}) ;
console.log('validation='+msg.validate()) ;
msg.setName('Fred') ;
if (msg.validate()) {
	console.log('validated!') ;
}

var v = msg.get() ;
v.name = 'Fredderick' ;
msg = MessageFactory.restore(v) ;

console.log(msg.get()) ;

var msg2 = MessageFactory.create('JoinGameMessage') ;
//msg2.setGameCode('abcdefghijkl') ;
console.log(msg2.schema);
console.log(msg2.data);
if(msg2.validate())
	console.log('JoinGameMessage validated!') ;
else
	console.log('JoinGameMessage NOT validated!') ;

//
//games.add(game) ;
//
//var g = games.get(game.id) ;
//
//var h = games.getByAdminId(game.adminId) ;
//
//Console.log(g) ;
//Console.log(h) ;
//
//Console.log(games.hasId(game.id)) ;
//
//games.remove(game) ;
//
//Console.log(games.hasId(game.id)) ;
//
//Console.log(games.hasAdminId(game.id)) ;
//
//var i = {} ;
//
//teams.add(i) ;
//
//Console.log(i) ;
//
//Console.log(teams.hasId(i.id)) ;
//
//teams.remove(i) ;
//
//Console.log(teams.hasId(i.id)) ;
