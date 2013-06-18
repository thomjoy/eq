/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: {
        options: {
          curly: true,
          eqeqeq: true,
          sub: true,
          undef: true,
          boss: true,
          eqnull: true,
          browser: true,
          devel: true,
          globals: {
            _: true,
            $: true,
            jQuery: true,
            Backbone: true,
            require: true,
            define: true,
            requirejs: true,
            describe: true,
            expect: true,
            it: true
          }
        },
        files: {
          src: ['client/app.js', 'client/main.js']
        } //'client/**/*.js's
      }
    },
    less: {
      development: {
        options: {
          paths: ["./assets/stylesheets/less"],
          yuicompress: true
        },
        files: {
          "./assets/stylesheets/css/style.css": "./assets/stylesheets/less/style.less"
        }
      }
    },
    watch: {
      files: "./assets/stylesheets/less/*",
      tasks: ["less"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', 'jshint');

};