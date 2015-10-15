'use strict';

var Utilities = {
  stripNewLines: function(scssString) {
    return scssString.replace(/\n/g, '');
  },

  stripSpaces: function(scssString) {
    return scssString.replace(/\s/g, '');
  }
};

module.exports = Utilities;
