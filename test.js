

var Games = require('./lib/Games') ;
var Game = require('./lib/Game') ;

var games = new Games() ;
var game = new Game() ;


games.add(game) ;

var g = games.get(game.id) ;

var h = games.getByAdminId(game.adminId) ;

games.remove(game.id) ;