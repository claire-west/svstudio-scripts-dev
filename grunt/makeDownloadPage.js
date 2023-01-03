module.exports = function(grunt) {
  var isWindows = process.platform === 'win32';
  var regex = /SCRIPT_TITLE ?= ?[\'\"](.*)[\'\"]/g;

  grunt.registerMultiTask('make_index', 'Builds the index.html download page', function() {
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

    var inject = {};
    this.files.forEach(function(filePair) {
      filePair.src.forEach(function(src) {
        src = unixifyPath(src);
        var fileContent = grunt.file.read(src);
        var matches = fileContent.matchAll(regex);
        var scriptName = matches.next().value[1];

        var fileParts = src.split('/');
        var folder = fileParts[0];
        var file = fileParts[1];
        inject[folder] = inject[folder] || [];
        inject[folder].push('<p><b>' + scriptName + '</b> - <i><a href="/svstudio-scripts/' + src + '" download="' + file + '">' + file + '</a></i><p>');
      });
    });
    var content = grunt.file.read(template);
    for (var folder in inject) {
      inject[folder].sort();
      content = content.replace('@@' + folder, inject[folder].join('\n            '));
    }
    var destFile = dest + '/' + template;
    grunt.file.write(destFile, content);
    grunt.log.writeln(destFile);
  });
};