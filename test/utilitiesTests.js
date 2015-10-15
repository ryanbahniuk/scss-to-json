'use strict';

var assert = require('assert');
var sinon = require('sinon');
var utilities = require('../src/utilities');

describe('Utilities', function() {
  describe('#stripNewLines', function() {
    it('should remove all new lines', function() {
      var input = '\nhello, I have\n some new lines.\n';
      var output = 'hello, I have some new lines.';

      assert.strictEqual(utilities.stripNewLines(input), output);
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
