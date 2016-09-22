#!/usr/bin/env node

var http = require('http');
var express = require('express');

var BuzzerServer = require('./lib/BuzzerServer');

var app = express();
var server = http.createServer(app).listen(process.env.port ? process.env.port : 3000);
BuzzerServer.listen(server);

//Publish the www directory
app.use(express.static(__dirname + '/www'));

//Get the index.html for the home page
app.get(
    '/',
    function(req, res) {
        res.sendFile(__dirname + '/www/index.html');
    }
);

app.get(
    '/New',
    function(req,res){
        res.sendFile(__dirname + '/_private/CreateSession.html');
    }
);

app.get(
    '/Contestant',
    function(req,res){
        res.sendFile(__dirname + '/_private/ContestantScreen.html');
    }
);

app.get(
    '/Join',
    function(req,res){
        res.sendFile(__dirname + '/_private/JoinSession.html');
    }
);

app.get(
    '/Share',
    function(req,res){
        res.sendFile(__dirname + '/_private/PresentationScreen.html');
    }
);

app.get(
    '/Manage',
    function(req,res){
        res.sendFile(__dirname + '/_private/ManageSession.html');
    }
);
