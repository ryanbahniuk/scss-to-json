'use strict';

var path = require('path');
var fs = require('fs-extra');
var Declaration = require('./declaration');
var DeclarationStore = require('./declarationStore');
var utilities = require('./utilities');

var LINE_DELIMITER = '\n';
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

function declarationsFromString(path, declarationStore) {
  var data = fs.readFileSync(path, 'utf8');

  var lines = String(data).split(LINE_DELIMITER).map(utilities.stripNewLinesAndSemicolons).filter(filterLines);
  return lines.map(function(line) {
    return new Declaration(line, declarationStore);
  });
}

function Processor(path, options) {
  var declarationStore = new DeclarationStore();

  if (hasDependencies(options)) {
    options.dependencies.forEach(function(dependencyPath) {
      declarationsFromString(dependencyPath, declarationStore);
    });
  }

  var declarations = declarationsFromString(path, declarationStore);

  this.object = makeObject(declarations);
}

module.exports = Processor;
