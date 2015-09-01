'use strict';

var utilities = require('./utilities');
var compile = require('./compile');

var CSS_FUNCTIONS = ['rgb', 'rgba', 'url'];

function isFunction(value) {
  return value.search(/$\D+\(.|\)/) !== -1;
}

function VariableValue(scssString) {
  this._parse(scssString);
}

VariableValue.prototype = {
  _parse: function(scssString) {
    var value = utilities.stripSpaces(scssString);

    if (isFunction(value)) {
      this.value = compile.fromString(value);
    } else {
      this.value = value;
    }
  }
};

module.exports = VariableValue;
