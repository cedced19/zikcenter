#!/usr/bin/env node
'use strict';
var   express = require('express'),
        app = express(),
        serveStatic = require('serve-static'),
        path = require('path'),
        fs = require('fs'),
        chalk = require('chalk'),
        ls = require('node-ls');

app.get('/musics', function(req, res) {
    ls('musics', '--all', function(er, data) {
            var list = new Array();
            for (var k in data) {
                if (/.mp3/.test(data[k])) {
                    fs.renameSync(process.cwd() + '/musics/' + data[k], process.cwd() + '/musics/' + getUnShiny(data[k]));
                    var item = {
                        uri : getUnShiny('/musics/' + data[k]),
                        name : getShiny(data[k])
                    }
                    list.push(item);
            }
        }
        res.json(list);
    });
});


app.use(serveStatic(process.cwd()));

var server = require('http').createServer(app);
server.listen(7771, function() {
    console.log('Server running at\n  => '+ chalk.green('http://localhost:7771') + '\nCTRL + C to shutdown');
});


function getShiny (name) {
             name = name.charAt(0).toUpperCase()  + name.substring(1).toLowerCase();
             name = name.replace('.mp3', '');
             name = name.replace(/-/g, ' ');
             return name;
}

function getUnShiny (name) {
             name = name.toLowerCase();
             name = name.replace(/ /g, '-');
             name = name.replace(/_/g, '-');
             return name;
}