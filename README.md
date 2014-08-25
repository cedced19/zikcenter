#ZikCenter

A Node.js software to play random music.

[![Build Status](https://travis-ci.org/cedced19/ZikCenter.svg)](https://travis-ci.org/cedced19/ZikCenter)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Dependencies](https://david-dm.org/cedced19/ZikCenter.png)](https://david-dm.org/cedced19/ZikCenter)
[![devDependencies](https://david-dm.org/cedced19/ZikCenter/dev-status.png)](https://david-dm.org/cedced19/ZikCenter#info=devDependencies)
[![NPM version](https://badge.fury.io/js/zikcenter.svg)](http://badge.fury.io/js/zikcenter)

```bash
$ npm install zikcenter -g
```

Go in command line to the directory where you have all your musics.

```bash
$ zik
```

If you reload page the server will be reload the list musics.
You had to remove space  and replace them by dash.
Mp3 is the only format to be supporting.

## Dev

To launch in developpement:

```bash
$ npm install
$ node cli.js
```

To launch in release:

```bash
$ npm install
$ grunt
$ cd dist/
$ node cli.js
```

NOTE: dist/ is the dist folder.