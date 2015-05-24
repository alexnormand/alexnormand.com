module.exports = function (grunt) {
  var wintersmithBuildDir = 'build';
  var appengineBuildDir   = 'appengine';
  var appengineStaticdir  = appengineBuildDir + '/static';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      appengineDir: [appengineStaticdir],
      wintersmithDir: [wintersmithBuildDir]
    },
    wintersmith: {
      build: {
        options: {
          config: 'wintersmith.json'
        }
      },
      preview: {
        options: {
          action: 'preview',
          config: 'wintersmith-preview.json'
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd:  wintersmithBuildDir +'/about',
            src: ['**'],
            dest: appengineStaticdir +'/about'
          },
          {
            expand: true,
            cwd:  wintersmithBuildDir +'/blog',
            src: ['**'],
            dest: appengineStaticdir +'/blog'
          },
          {
            expand: true,
            cwd:  wintersmithBuildDir,
            src: [
              'index.html',
              'favicon.ico',
              'apple-touch-icon.png',
              'img/*'
            ],
            dest: appengineStaticdir
          }
        ]
      }
    },
    browserify: {
      main: {
        files: {
          'appengine/static/js/main.js': 'contents/js/main.js'
        },
        options: {
          transform: [['babelify', { 'optional': ['runtime'] }]],
          browserifyOptions: {
            standalone: 'A'
          }
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'appengine/static/js/main.js': 'appengine/static/js/main.js'
        }
      }
    },
    cssmin: {
      main: {
        files: {
          'appengine/static/css/site.min.css': [
            'bower_components/pure/pure-min.css',
            'bower_components/pure/grids-responsive.css',
            'contents/css/highlight.css',
            'contents/css/site.css'
          ]
        }
      }
    },
    dom_munger: {
      main: {
        options: {
          append: {}
        },
        src: [appengineStaticdir + '/**/*.html']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-wintersmith');
  grunt.loadNpmTasks('grunt-dom-munger');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('inline', function() {
    var css = grunt.file.read(appengineStaticdir + '/css/site.min.css');

    grunt.config('dom_munger.main.options.append', {
     selector: 'head',
     html: '<style>' + css + '</style>'
    });

    grunt.task.run(['dom_munger']);
  });

  grunt.registerTask('default', [
    'clean:appengineDir',
    'clean:wintersmithDir',
    'wintersmith:build',
    'copy',
    'browserify',
    'uglify',
    'cssmin',
    'clean:wintersmithDir',
    'inline',
  ]);
};
