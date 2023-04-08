module.exports = function(grunt) {
  var isWindows = process.platform === 'win32';
  var regex = /SCRIPT_TITLE ?= ?[\'\"](.*)[\'\"]/g;
  var descriptionRegex = /\/\*\*.*\.js((.|\n)*)\*\//;
  var deprecatedRegex = /\/\/ (deprecated as of \d.\d.\d)/;

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

        var match = fileContent.match(descriptionRegex);
        var description;
        if (match) {
          description = match[1].trim().split('\n');
          description.forEach((line, i) => {
            description[i] = line.replace('*', '').trim();
          });
          description = description.join(' ');
        }

        match = fileContent.match(deprecatedRegex);
        var suffix;
        if (match) {
          folder = 'deprecated';
          suffix = match[1];
        }

        var item = '<p id="' + file.replace('.js', '') + '"><b>' + scriptName + '</b> - <i><a href="/svstudio-scripts/' + src + '" download="' + file + '">' + file + '</a></i>';

        if (suffix) {
          item += '<span>&nbsp;&nbsp;(' + suffix + ')</span>';
        }

        item += '</p>';

        if (description) {
          item += '<p class="description">' + description + '</p>';
        }

        inject[folder] = inject[folder] || [];
        inject[folder].push(item);
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