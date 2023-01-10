module.exports = function(grunt) {
  var isWindows = process.platform === 'win32';
  var regex = /\/\/ (deprecated as of \d.\d.\d)/;

  grunt.registerMultiTask('prune_deprecated', 'Removes deprecated scripts from the build folder', function() {
    var ns = this.options().namespace;
    var template = this.options().template;
    var dest = this.options().dest;

    var unixifyPath = function(filepath) {
      if (isWindows) {
        return filepath.replace(/\\/g, '/');
      } else {
        return filepath;
      }
    };

    this.files.forEach(function(filePair) {
      filePair.src.forEach(function(src) {
        src = unixifyPath(src);
        var fileContent = grunt.file.read(src);
        if (fileContent.match(regex)) {
          console.log('Pruning ' + src);
          grunt.file.delete(src);
        }
      });
    });
  });
};