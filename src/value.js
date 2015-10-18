'use strict';

var compile = require('./compile');

function removeFlags(value) {
  return value.replace(/\!\w+/g, '');
}

function Value(scssString) {
  this._parse(scssString);
}

Value.prototype = {
  _parse: function(scssString) {
    var deflagged = removeFlags(scssString);
    var compiled = compile.fromString(deflagged);
    this.value = compiled.trim();
  }
};

if (process.env.NODE_ENV === 'test') {
  Value.removeFlags = removeFlags;
}

module.exports = Value;
