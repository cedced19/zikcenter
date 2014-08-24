#!/usr/bin/env node
'use strict';
var   opn = require('opn'),
        express = require('express'),
        app = express(),
        serveStatic = require('serve-static'),
        path = require('path'),
        fs = require('fs'),
        chalk = require('chalk'),
        ls = require('node-ls');


app.get('/', function(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    res.end(data);
  });
});

app.get('/musics', function(req, res) {
    ls('./', '--all', function(er, list) {
        res.json(list);
    });
});


app.use(serveStatic(__dirname));
app.use(serveStatic(process.cwd()));

var server = require('http').createServer(app);
server.listen(771, function() {
    console.log('Server running at\n  => '+ chalk.green('http://localhost:771') + '\nCTRL + C to shutdown');
    opn('http://localhost:771');
});