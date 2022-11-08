module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: {
        src: ['tmp', 'build']
      },
      release_zip:  {
        src: ['cw_svstudio-scripts_*.zip']
      }
    },
    uglify: {
      files: {
        expand: true,
        cwd: 'reuse',
        src: '*',
        dest: 'tmp'
      }
    },
    inject_reuse: {
      options: {
        dest: 'build'
      },
      files: {
        src: ['automation/*', 'hotkey-scripts/*', 'long-running/*', 'utility/*'],
        expand: true
      }
    },
    zip: {
      'long-format': {
        src: [
          'build/automation',
          'build/hotkey-scripts',
          'build/long-running',
          'build/utility'
        ],
        dest: 'cw_svstudio-scripts_' + grunt.template.today('yymmdd') + '.zip'
      }
    },
    copy: {
      files: {
        cwd: 'build',
        src: '**/*',
        dest: '../svstudio-scripts',
        expand: true
      }
    }
  });

  grunt.loadTasks('./grunt');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-zip');
  grunt.registerTask('default',
    ['clean:build', 'uglify', 'inject_reuse', 'clean:release_zip', 'zip', 'copy', 'clean:build']);
};