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
    requirejs: {
      compile: {
        options: {
          almond: true,
          preserveLicenseComments: false,
          name: 'main',
          baseUrl: wintersmithBuildDir + '/js',
          out:  appengineStaticdir + '/js/main.js',
          mainConfigFile: wintersmithBuildDir +'/js/main.js',
        }
      }
    },
    cssmin: {
      main: {
        files: {
          'appengine/static/css/site.min.css': [
            'contents/js/libs/pure/pure-min.css',
            'contents/js/libs/pure/grids-responsive.css',
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
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-dom-munger');
  grunt.loadNpmTasks('grunt-svgmin');

  grunt.registerTask('inline', function() {
    var css = grunt.file.read(appengineStaticdir + '/css/site.min.css');

    grunt.config('dom_munger.main.options.append', {
     selector: 'head',
     html: '<style>' + css + '</style>'
    });

    grunt.task.run(['dom_munger']);
  });

  grunt.registerTask('preview', ['clean:wintersmithDir', 'wintersmith:preview']);
  grunt.registerTask('build', [
    'clean:appengineDir',
    'clean:wintersmithDir',
    'wintersmith:build',
    'copy',
    'requirejs',
    'cssmin',
    'clean:wintersmithDir',
    'inline',
  ]);
};
