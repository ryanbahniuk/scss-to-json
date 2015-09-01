'use strict';

var ASSIGNMENT_OPERATOR = ':';

function DeclarationStore() {
  this.declarations = [];
}

DeclarationStore.prototype = {
  addDeclaration: function(declaration) {
    this.declarations.push(declaration);
  },

  findValue: function(variable) {
    var filteredDeclarations = this.declarations.filter(function(declaration) {
      return declaration.variable === variable;
    });

    if (filteredDeclarations.length === 1) {
      return filteredDeclarations[0].value;
    } else {
      return undefined;
    }
  }
};

module.exports = DeclarationStore;
