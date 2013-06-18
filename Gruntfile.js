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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task.
  grunt.registerTask('default', 'jshint');

};