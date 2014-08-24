#!/usr/bin/env node
'use strict';
var   fastHttp = require('./custom-http'),
        opn = require('opn'),
        chalk = require('chalk'),
        array = false,
        path = require('path'),
        ls = require('node-ls'),
        musicServer = fastHttp(772, process.cwd()),
        httpServer = fastHttp(771, __dirname);

console.log('Server running at\n  => '+ chalk.green('http://localhost:771') + '\nCTRL + C to shutdown');
opn('http://localhost:771');

ls('./', '--all', function(er, list) {
        array = list;
});

var io = require('socket.io').listen(httpServer);
io.sockets.on('connection', function(socket){
    socket.emit('setMusic', array);
});

