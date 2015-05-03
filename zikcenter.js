#!/usr/bin/env node
'use strict';
var app = require('express')(), 
    serveStatic = require('serve-static'), 
    path = require('path'), 
    program = require('commander'), 
    fs = require('fs'), 
    colors = require('colors'), 
    pkg = require('./package.json'), 
    ls = require('./lib/ls'), 
    list = ls('./'), 
    port = 7771;

program
    .version(pkg.version)
    .option('-p, --port [number]', 'specified the port')
    .parse(process.argv);

if (!isNaN(parseFloat(program.port)) && isFinite(program.port)) {
  port = program.port;
}

app.get('/api', function (req, res) {
  res.json(list);
});

app.get('/api/refresh', function (req, res) {
  list = ls('./');
  res.json(list);
});

app.disable('x-powered-by');

app.use(serveStatic(__dirname));
app.use(serveStatic(process.cwd()));

var server = require('http').createServer(app);
server.listen(port, function () {
  require('check-update')({
    packageName: pkg.name,
    packageVersion: pkg.version,
    isCLI: true
  }, function (err, latestVersion, defaultMessage) {
    if (!err) {
      console.log(defaultMessage);
    }
  });
  console.log('Server running at\n  => ' + colors.green('http://localhost:' + port) + '\nCTRL + C to shutdown');
});