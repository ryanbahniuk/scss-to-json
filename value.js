'use strict';

var utilities = require('./utilities');
var compile = require('./compile');
var declarationStore = require('./declarationStore');

var CSS_FUNCTIONS = ['rgb', 'rgba', 'url'];

function isNotCssFunction(value) {
  return CSS_FUNCTIONS.indexOf(value) === -1;
}

function includesFunction(value) {
  var regex = /(\w+)\(.+\)/g;
  var matches = regex.exec(value);

  if (matches) {
    if (matches.slice(1).some(isNotCssFunction)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function includesVariable(value) {
  return value.search(/\$\w+/g) !== -1;
}

function removeFlags(value) {
  return value.replace(/\!\w+/g, '');
}

function Value(scssString) {
  this._parse(scssString);
}

Value.prototype = {
  _parse: function(scssString) {
    var deflagged = removeFlags(scssString);
    var variabled = declarationStore.replaceVariables(deflagged);
    var value = utilities.stripSpaces(variabled);

    if (includesFunction(value)) {
      this.value = compile.fromString(value);
    } else {
      this.value = value;
    }
  }
};

if (process.env.NODE_ENV === 'test') {
  Value.includesFunction = includesFunction;
}

module.exports = Value;
