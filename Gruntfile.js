module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: {
        src: ['tmp', 'build']
      },
      release_zip:  {
        src: ['cw_svstudio-scripts_*.zip']
      },
      deploy: {
        src: ['deploy/automation', 'deploy/hotkey-scripts/*', '!deploy/hotkey-scripts/README.md', 'deploy/utility']
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
        src: ['automation/*', 'hotkey-scripts/*', 'utility/*'],
        expand: true
      }
    },
    make_index: {
      options: {
        template: 'index.html',
        dest: 'deploy'
      },
      files: {
        src: ['automation/*', 'hotkey-scripts/*', 'utility/*'],
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
    prune_deprecated: {
      prune: {
        cwd: 'build',
        src: '**/*.js',
        expand: true
      }
    },
    zip: {
      release: {
        cwd: 'build',
        src: '**/*',
        dest: 'cw-svstudio-scripts.zip'
      },
      dated: {
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
    'clean:build', 'uglify', 'inject_reuse', 'copy:dev', 'clean:release_zip', 'prune_deprecated', 'zip:dated', 'clean:build'
  ]);
  grunt.registerTask('deploy', [
    'clean:build', 'uglify', 'inject_reuse', 'make_index', 'copy:deploy', 'prune_deprecated', 'zip:release'
  ]);
  // generate index.html locally for testing
  grunt.registerTask('test_deploy', [
    'clean:build', 'uglify', 'inject_reuse', 'make_index', 'copy:deploy', 'clean:build', 'clean:deploy'
  ]);
};