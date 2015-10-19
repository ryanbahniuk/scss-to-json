'use strict';

var Utilities = {
  stripNewLinesAndSemicolons: function(scssString) {
    return scssString.replace(/\n/g, '').replace(/\;/g, '');
  },

  stripSpaces: function(scssString) {
    return scssString.replace(/\s/g, '');
  }
};

module.exports = Utilities;
