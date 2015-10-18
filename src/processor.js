'use strict';

var path = require('path');
var fs = require('fs-extra');
var Declaration = require('./declaration');
var utilities = require('./utilities');

var LINE_DELIMITER = ';';
var COMMENT_DELIMETER = '//';
var EMPTY_LINES = ['', '\n', '\s'];

function makeObject(declarations) {
  var output = {};

  declarations.forEach(function(declaration) {
    output[declaration.variable.value] = declaration.value.value;
  });

  return output;
}

function filterLines(line) {
  return EMPTY_LINES.every(function(lineValue) {
    return line !== lineValue && line.slice(0, 2) !== COMMENT_DELIMETER;
  });
}

function hasDependencies(options) {
  return options && options.dependencies && options.dependencies.length > 0;
}

function declarationsFromString(path) {
  var data = fs.readFileSync(path, 'utf8');

  var lines = String(data).split(LINE_DELIMITER).map(utilities.stripNewLines).filter(filterLines);
  return lines.map(function(line) {
    return new Declaration(line);
  });
}

function Processor(path, options) {
  if (hasDependencies(options)) {
    options.dependencies.forEach(declarationsFromString);
  }

  var declarations = declarationsFromString(path);

  this.object = makeObject(declarations);
}

module.exports = Processor;
