'use strict';

var utilities = require('./utilities');
var VariableValue = require('./variableValue');

var ASSIGNMENT_OPERATOR = ':';

function Declaration(line) {
  this.parse(line);
}

Declaration.prototype = {
  parse: function(line) {
    var assignmentIndex = line.indexOf(ASSIGNMENT_OPERATOR);
    this.variable = utilities.normalizeString(line.substring(0, assignmentIndex));
    this.value = new VariableValue(line.substring(assignmentIndex + 1, line.length));
  }
};

module.exports = Declaration;
