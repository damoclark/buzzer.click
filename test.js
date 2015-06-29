

var Console = require('console') ;
var Games = require('./lib/Games') ;
var Game = require('./lib/Game') ;

var games = new Games() ;
var game = new Game() ;


games.add(game) ;

var g = games.get(game.id) ;

var h = games.getByAdminId(game.adminId) ;

Console.log(g) ;
Console.log(h) ;

Console.log(games.hasId(game.id)) ;

games.remove(game) ;

Console.log(games.hasId(game.id)) ;

Console.log(games.hasAdminId(game.id)) ;
