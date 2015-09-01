'use strict';

var Utilities = {
  stripNewLines: function(scssString) {
    return scssString.replace('\n', '');
  },

  stripSpaces: function(scssString) {
    return scssString.replace(/\s/g, '');
  },

  normalizeString: function(scssString) {
    var strippedNewLines = this.stripNewLines(scssString);
    return this.stripSpaces(strippedNewLines);
  }
};

module.exports = Utilities;
