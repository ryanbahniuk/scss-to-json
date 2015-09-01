'use strict';

var Utilities = {
  normalizeString: function(scssString) {
    return scssString.replace('\n', '').replace(/\s/g, '');
  }
};

module.exports = Utilities;
