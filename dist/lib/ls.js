'use strict';
var fs = require('fs');
var join = require('path').join;
var getShiny = function (name) {
    name = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    name = name.replace('.mp3', '')
               .replace(/-/g, ' ')
               .replace(/ã©/g, 'é')
               .replace(/ã§/g, 'ç');
    return name;
};

var getUnShiny = function (name) {
    name = name.toLowerCase()
	       .replace(/ /g, '-')
               .replace(/_/g, '-')
               .replace(/ã©/g, 'é')
               .replace(/ã§/g, 'ç');
    return name;
};
module.exports = function (root) {
  var result = [];
  var queue = ['/'];
  while (queue.length) {
    var d = queue.shift();
    fs.readdirSync(join(root, d)).sort().forEach(function (entry) {
      var f = join(root, d, entry);
      var stat = fs.statSync(f);
      if (stat.isDirectory() && entry != 'node_modules') {
        queue.push(join(d, entry));
      } else {
        if (/.mp3/.test(entry)) {
          var filename = getUnShiny(entry);
          fs.renameSync(f, join(root, d, filename));
          if (d == '/') {
            result.push({
                uri: d + filename,
                name: getShiny(entry)
            });
          } else {
            result.push({
                uri: d + '/' + filename,
                name: getShiny(entry)
            });
          }
        }
      }
    });
  }
  return result;
};
