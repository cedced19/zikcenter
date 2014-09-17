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

app.get('/musics', function(req, res) {
    ls('./', '--all', function(er, data) {
        var list = new Array();
        for (var k in data) {
            var item = {
                uri : data[k],
                name : getShiny(data[k])
            }
            if (item.uri != "Thumbs.db"){
                list.push(item);
            }
        }
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


function getShiny (name) {
             name = name.charAt(0).toUpperCase()  + name.substring(1).toLowerCase();
             name = name.replace('.mp3', '');
             name = name.replace(/-/g, ' ');
             return name;
}