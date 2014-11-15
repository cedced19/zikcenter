#!/usr/bin/env node
'use strict';
var   express = require('express'),
        app = express(),
        serveStatic = require('serve-static'),
        path = require('path'),
        program = require('commander'),
        fs = require('fs'),
        chalk = require('chalk'),
        ls = require('node-ls');

program
  .version(require('./package.json').version)
  .option('-p, --port [number]', 'specified the port')
  .parse(process.argv);

app.get('/musics', function(req, res) {
    ls('./', '--all', function(er, data) {
            var list = new Array();
            for (var k in data) {
                if (/.mp3/.test(data[k])) {
                    fs.renameSync(process.cwd() + '/' + data[k], process.cwd() + '/' + getUnShiny(data[k]));
                    var item = {
                        uri : getUnShiny(data[k]),
                        name : getShiny(data[k])
                    }
                    list.push(item);
            }
        }
        res.json(list);
    });
});


app.use(serveStatic(__dirname));
app.use(serveStatic(process.cwd()));

if (!isNaN(parseFloat(program.port)) && isFinite(program.port)){
  var port = program.port;
}else{
  var port = 7771;
}

var server = require('http').createServer(app);
server.listen(port, function() {
    console.log('Server running at\n  => '+ chalk.green('http://localhost:' + port) + '\nCTRL + C to shutdown');
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