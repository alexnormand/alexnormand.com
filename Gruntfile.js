module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      preBuild: ['build', 'appengine/static'],
      postBuild: ['build']
    },
    wintersmith: {
      build: {}
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

  grunt.registerTask('default', ['clean:preBuild','wintersmith', 'copy', 'requirejs', 'clean:postBuild']);
};
