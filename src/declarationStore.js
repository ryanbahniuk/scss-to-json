'use strict';

var ASSIGNMENT_OPERATOR = ':';

function DeclarationStore() {
  this.declarations = [];
}

DeclarationStore.prototype = {
  addDeclaration: function(declaration) {
    this.declarations.push(declaration);
  },

  replaceVariables: function(scssString) {
    var replacedString = scssString;

    this.declarations.forEach(function(declaration) {
      var variable = declaration.variable.value;
      var value = declaration.value.value;

      replacedString = replacedString.replace(variable, value);
    });
    return replacedString;
  }
};

module.exports = new DeclarationStore();
