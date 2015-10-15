'use strict';

var path = require('path');
var fs = require('fs-extra');
var Declaration = require('./src/declaration');
var utilities = require('./src/utilities');

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

function scssToJson(path) {
  var data = fs.readFileSync(path, 'utf8');

  var lines = String(data).split(LINE_DELIMITER).map(utilities.stripNewLines).filter(filterLines);
  var declarations = lines.map(function(line) {
    return new Declaration(line);
  });

  return makeObject(declarations);
}

if (process.env.NODE_ENV === 'test') {
  scssToJson.filterLines = filterLines;
}

module.exports = scssToJson;
