module.exports = function(grunt) {

  var config = {
    copy: {
      src: {
        files: [{
          expand: true,
          src: [
            '*.html',
            'custom-http.js',
            'vendor/**/*.*',
            'package.json',
            '.gitignore',
            'cli.js',
            'README.md'
          ],
          dest: 'dist/'
        }]
      }
    },
  useminPrepare: {
      html: '*.html'
  },
  usemin: {
    html: 'dist/*.html'
  },
  uglify: {
    options :  {
      mangle :  false
    }
  },
  uncss: {
    dist: {
      files: {
        'dist/vendor/css/styles.css': ['index.html'],
      }
    }
  },
  cssmin: {
      after: {
        files: {
          'dist/vendor/css/styles.css': ['dist/vendor/css/styles.css']
        }
      }
    },
  htmlmin: {
        dist: {
          options: {
            removeComments: true,
            collapseWhitespace: true
          },
          files: {
            'dist/index.html': 'dist/index.html',
            'dist/404.html': 'dist/404.html',
            'dist/500.html': 'dist/500.html'
          }
      }
  }
};

  grunt.initConfig(config);

  // Load all Grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['copy', 'useminPrepare', 'concat', 'uglify', 'usemin', 'htmlmin', 'uncss', 'cssmin:after']);
};
