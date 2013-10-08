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
            cwd:  wintersmithBuildDir +'/font',
            src: ['**'],
            dest: appengineStaticdir +'/font'
          },

          {
            expand: true,
            cwd:  wintersmithBuildDir,
            src: [
              'index.html',
              'favion.ico',
              'apple-touch-icon.png'
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
      },
      css: {
        options: {
          optimizeCss: 'standard',
          cssIn: wintersmithBuildDir + '/css/site.css',
          out: appengineStaticdir + '/css/site.css'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-wintersmith');
  grunt.loadNpmTasks('grunt-requirejs');

  grunt.registerTask('preview', ['clean:wintersmithDir', 'wintersmith:preview']);
  grunt.registerTask('build', [
    'clean:appengineDir',
    'clean:wintersmithDir',
    'wintersmith:build',
    'copy',
    'requirejs',
    'clean:wintersmithDir'
  ]);
};
