#!/usr/bin/env node
'use strict';
var app = require('express')(),
    serveStatic = require('serve-static'),
    path = require('path'),
    program = require('commander'),
    fs = require('fs'),
    join = require('path').join,
    pkg = require('./package.json'),
    ls = require('./lib/ls'),
    port = require('env-port')('7771');

program
    .version(pkg.version)
    .option('-p, --port [number]', 'specified the port')
    .option('-f, --folder [path]', 'specified the folder where there are musics')
    .parse(process.argv);

var musicsPath = (program.folder) || (process.cwd()),
    list = ls(join(musicsPath, './'));

if (!isNaN(parseFloat(program.port)) && isFinite(program.port)) {
  port = program.port;
}

app.get('/api', function (req, res) {
  res.json(list);
});

app.get('/api/refresh', function (req, res) {
  list = ls(join(musicsPath, './'));
  res.json(list);
});

app.disable('x-powered-by');

app.use(serveStatic(__dirname));
app.use(serveStatic(musicsPath));

var server = require('http').createServer(app);
server.listen(port, function () {
  require('check-update')({
    packageName: pkg.name,
    packageVersion: pkg.version,
    isCLI: true
  }, function (err, latestVersion, defaultMessage) {
    if (!err) {
      console.log(defaultMessage);
      console.log(require('server-welcome')(port, 'ZikCenter'));
    }
  });
});
