#!/usr/bin/env node

var socketio = require('socket.io-client')('http://localhost:3000') ;
socketio.on('connect', function(){console.log('Connected')}) ;
