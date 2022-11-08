module.exports = function(grunt) {
  var isWindows = process.platform === 'win32';
  var regex = /@@(.*)/g;
  var commentPrefix = '// Minified from https://github.com/claire-west/svstudio-scripts-dev/blob/main/reuse/';

  grunt.registerMultiTask('inject_reuse', 'Injects reusable components at placeholders in src', function() {
    var ns = this.options().namespace;
    var dest = this.options().dest;
    var unixifyPath = function(filepath) {
      if (isWindows) {
        return filepath.replace(/\\/g, '/');
      } else {
        return filepath;
      }
    };

    this.files.forEach(function(filePair) {
      var first = true;
      filePair.src.forEach(function(src) {
        src = unixifyPath(src);

        var content = grunt.file.read(src);
        var matches = content.matchAll(regex);
        var replacements = {};
        for (var match of matches) {
          var reuseFile = match[1] + '.js';
          var inject = commentPrefix + reuseFile + '\n' + grunt.file.read('tmp/' + reuseFile);
          if (first) {
            inject = 'var lib=lib||{};\n' + inject;
            first = false;
          }
          replacements[match[0]] = inject;
        }

        for (var replacement in replacements) {
          content = content.replace(replacement, replacements[replacement]);
        }

        var destFile = dest + '/' + src;
        grunt.file.write(destFile, content);
        grunt.log.writeln(destFile);
      });
    });
  });
};