'use strict';

var Value = require('./value');
var Variable = require('./variable');
var declarationStore = require('./declarationStore');

var ASSIGNMENT_OPERATOR = ':';

function Declaration(line) {
  this._parse(line);
}

Declaration.prototype = {
  _parse: function(line) {
    var assignmentIndex = line.indexOf(ASSIGNMENT_OPERATOR);
    var assignedVariable = line.substring(0, assignmentIndex);
    var assignedValue = line.substring(assignmentIndex + 1, line.length);
    var hasDefinedVariable = declarationStore.hasDefinedVariable(assignedValue);

    this.variable = new Variable(assignedVariable);
    this.value = new Value(assignedValue);

    if (!hasDefinedVariable) {
      declarationStore.addDeclaration(this);
    }
  }
};

module.exports = Declaration;
