module.exports = (grunt) => {
  // grunt config file

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  grunt.initConfig({
    eslint: {
      src: ['src/*.js', 'test/*.test.js']
    },
    mochaTest: {
      files: ['test/*.test.js']
    },
    mocha_istanbul: {
      coverage: {
        src: 'test',
        options: {
          mask: '*.test.js'
        }
      }
    }
  });

  // tasks
  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('coverage', ['mocha_istanbul']);
  grunt.registerTask('build', ['lint', 'coverage']);
};
