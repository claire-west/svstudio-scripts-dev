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
    make_index: {
      options: {
        template: 'index.html',
        dest: 'deploy'
      },
      files: {
        src: ['automation/*', 'hotkey-scripts/*', 'long-running/*', 'utility/*'],
        expand: true
      }
    },
    copy: {
      dev: {
        cwd: 'build',
        src: '**/*',
        dest: '../svstudio-scripts',
        expand: true
      },
      deploy: {
        cwd: 'build',
        src: '**/*',
        dest: 'deploy',
        expand: true
      }
    },
    zip: {
      release_zip: {
        cwd: 'build',
        src: '**/*',
        dest: 'cw_svstudio-scripts_' + grunt.template.today('yymmdd') + '.zip'
      }
    }
  });

  grunt.loadTasks('./grunt');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-zip');
  grunt.registerTask('default', [
    'clean:build', 'uglify', 'inject_reuse', 'copy:dev', 'clean:release_zip', 'zip', 'clean:build'
  ]);
  grunt.registerTask('deploy', [
    'clean:build', 'uglify', 'inject_reuse', 'make_index', 'copy:deploy', 'clean:build'
  ]);
};