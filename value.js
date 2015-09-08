'use strict';

var utilities = require('./utilities');
var compile = require('./compile');
var declarationStore = require('./declarationStore');

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
    var compiled = compile.fromString(variabled);
    this.value = utilities.stripLeadingAndTrailingSpaces(compiled);
  }
};

if (process.env.NODE_ENV === 'test') {
  Value.removeFlags = removeFlags;
}

module.exports = Value;
