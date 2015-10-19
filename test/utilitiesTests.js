'use strict';

var assert = require('assert');
var sinon = require('sinon');
var utilities = require('../src/utilities');

describe('Utilities', function() {
  describe('#stripNewLinesAndSemicolons', function() {
    it('should remove all new lines', function() {
      var input = '\nhello, I have\n some new lines\n and ;semicolons;';
      var output = 'hello, I have some new lines and semicolons';

      assert.strictEqual(utilities.stripNewLinesAndSemicolons(input), output);
    });
  });

  describe('#stripSpaces', function() {
    it('should remove all spaces', function() {
      var input = 'hello, I have some spaces';
      var output = 'hello,Ihavesomespaces';

      assert.strictEqual(utilities.stripSpaces(input), output);
    });
  });
});
