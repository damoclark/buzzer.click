

var Games = require('./lib/games') ;
var Game = require('./lib/game') ;

var games = new Games() ;
var game = new Game() ;


games.add(game) ;

var g = games.get(game.id) ;

var h = games.getByAdminId(game.adminId) ;

games.remove(game.id) ;