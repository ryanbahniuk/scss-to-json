'use strict';

var path = require('path');
var fs = require('fs-extra');
var Declaration = require('./declaration');

var DELIMITER = ';';
var EMPTY_LINES = ['', '\n', '\s'];

function makeJSON(declarations) {
  var output = {};

  declarations.forEach(function(declaration) {
    output[declaration.variable] = declaration.value.value;
  });

  saveFile(JSON.stringify(output));
}

function saveFile(json) {
  var outputPath = path.resolve(__dirname, 'output.json');
  fs.writeFile(outputPath, json);
}

function filterLines(line) {
  return EMPTY_LINES.every(function(lineValue) {
    return line !== lineValue;
  });
}

function Processor(path) {
  this.path = path;
}

Processor.prototype = {
  parse: function(err, data) {
    if (err) throw err;

    var lines = String(data).split(DELIMITER).filter(filterLines);
    var declarations = lines.map(function(line) {
      return new Declaration(line);
    });

    makeJSON(declarations);
  }
};

module.exports = Processor;
