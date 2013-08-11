module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      appengineDir: ['appengine/static'],
      wintersmithDir: ['build']
    },
    wintersmith: {
      build: {},
      preview: {
        options: {
          action: 'preview',
          config: 'config-preview.json'
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'build/about',
            src: ['**'],
            dest: 'appengine/static/about'
          },
          {
            expand: true,
            cwd: 'build/blog',
            src: ['**'],
            dest: 'appengine/static/blog'
          },
          {
            expand: true,
            cwd: 'build',
            src: [
              'index.html',
              'favion.ico',
              'apple-touch-icon.png'
            ],
            dest: 'appengine/static'
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
          baseUrl: 'build/js',
          out: 'appengine/static/js/main.js',
          mainConfigFile: 'build/js/main.js',
        }
      },
      css: {
        options: {
          optimizeCss: 'standard',
          cssIn: 'build/css/site.css',
          out: 'appengine/static/css/site.css'
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
    'clean:postBuild'
  ]);

};
