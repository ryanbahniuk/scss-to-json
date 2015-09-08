'use strict';

var Utilities = {
  stripNewLines: function(scssString) {
    return scssString.replace('\n', '');
  },

  stripSpaces: function(scssString) {
    return scssString.replace(/\s/g, '');
  },

  stripLeadingAndTrailingSpaces: function(scssString) {
    var leading = scssString.replace(/^\s/, '');
    return leading.replace(/\s$/, '');
  }
};

module.exports = Utilities;
