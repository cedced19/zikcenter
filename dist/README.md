# ZikCenter

A Node.js software to play random music.

[![Build Status](https://travis-ci.org/cedced19/zikcenter.svg)](https://travis-ci.org/cedced19/zikcenter)
[![NPM version](https://badge.fury.io/js/zikcenter.svg)](http://badge.fury.io/js/zikcenter)

 ![](https://raw.githubusercontent.com/cedced19/zikcenter/master/demo.png)

## CLI
```bash
$ npm install zikcenter -g
```

Go in command line to the directory where you have your music.

```bash
$ zik
```

#### Options

```
-h, --help                  output usage information

-V, --version               output the version number

-p, --port [number]          specified the port
```

## Server

```bash
$ git clone --depth=1 --branch=master https://github.com/cedced19/zikcenter
$ cd ./zikcenter/dist/
$ npm install --production
$ node zikcenter.js
```

You can place your musics anywhere in the folder.
