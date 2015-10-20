'use strict';

var compile = require('./compile');

function removeFlags(value) {
  return value.replace(/\!\w+/g, '');
}

function removeInlineComments(value) {
  var transformedValue = value;
  var commentIndex = value.indexOf('//');

  if (commentIndex > -1) {
    transformedValue = transformedValue.substring(0, commentIndex - 1);
  }

  return transformedValue;
}

function transforms(value) {
  return removeInlineComments(removeFlags(value));
}

function Value(scssString) {
  this._parse(scssString);
}

Value.prototype = {
  _parse: function(scssString) {
    var transformed = transforms(scssString);
    var compiled = compile.fromString(transformed);
    this.value = compiled.trim();
  }
};

if (process.env.NODE_ENV === 'test') {
  Value.removeFlags = removeFlags;
}

module.exports = Value;
