#!/usr/bin/env node
'use strict';
var   fastHttp = require('fast-http'),
        opn = require('opn'),
        chalk = require('chalk'),
        port = 80,
        array,
        ls = require('node-ls'),
        httpServer = fastHttp(port);

console.log('Server running at\n  => '+ chalk.green('http://localhost:' + port) + '\nCTRL + C to shutdown');
opn('http://localhost:' + port);

ls('./sources/', '--all', function(er, list) {
        array = list;
});

var io = require('socket.io').listen(httpServer);
io.sockets.on('connection', function(socket){
    io.sockets.emit('setMusic', array);
});

