//#!/usr/bin/env node

var http = require('http') ;
var express = require('express') ;

var BuzzerServer = require('./lib/BuzzerServer') ;

var app = express();

var server = http.createServer(app).listen('3000'); 
BuzzerServer.listen(server);

//Publish the www directory
app.use(express.static(__dirname + '/www'));

//Get the index.html for the home page
app.get
(
	'/', function(req, res)
	{
		res.sendfile(__dirname + '/www/index.html');
	}
) ;
