'use strict';

var path = require('path');
var fs = require('fs-extra');
var Declaration = require('./declaration');
var utilities = require('./utilities');

var LINE_DELIMITER = ';';
var COMMENT_DELIMETER = '//';
var EMPTY_LINES = ['', '\n', '\s'];

function makeJSON(declarations) {
  var output = {};

  declarations.forEach(function(declaration) {
    output[declaration.variable.value] = declaration.value.value;
  });

  saveFile(JSON.stringify(output));
}

function saveFile(json) {
  var outputPath = path.resolve(__dirname, 'output.json');
  fs.writeFile(outputPath, json);
}

function filterLines(line) {
  return EMPTY_LINES.every(function(lineValue) {
    return line !== lineValue && line.slice(0, 2) !== COMMENT_DELIMETER;
  });
}

function Processor(path) {
  this.path = path;
}

Processor.prototype = {
  parse: function(err, data) {
    if (err) throw err;

    var lines = String(data).split(LINE_DELIMITER).map(utilities.stripNewLines).filter(filterLines);
    var declarations = lines.map(function(line) {
      return new Declaration(line);
    });

    makeJSON(declarations);
  }
};

if (process.env.NODE_ENV === 'test') {
  Processor.makeJSON = makeJSON;
  Processor.saveFile = saveFile;
  Processor.filterLines = filterLines;
}

module.exports = Processor;
