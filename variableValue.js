'use strict';

var utilities = require('./utilities');

function VariableValue(scssString) {
  this.parse(scssString);
}

VariableValue.prototype = {
  parse: function(scssString) {
    this.value = utilities.normalizeString(scssString);
  }
};

module.exports = VariableValue;
