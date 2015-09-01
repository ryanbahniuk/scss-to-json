'use strict';

var utilities = require('./utilities');
var VariableValue = require('./variableValue');

var ASSIGNMENT_OPERATOR = ':';

function Declaration(line, store) {
  this.store = store;
  this.parse(line);
}

Declaration.prototype = {
  parse: function(line) {
    var assignmentIndex = line.indexOf(ASSIGNMENT_OPERATOR);
    this.variable = utilities.normalizeString(line.substring(0, assignmentIndex));
    var assignedValue = new VariableValue(line.substring(assignmentIndex + 1, line.length));
    var storedValue = this.store.findValue(assignedValue.value);

    if (storedValue) {
      this.value = storedValue;
    } else {
      this.value = assignedValue;
      this.store.addDeclaration(this);
    }
  }
};

module.exports = Declaration;
