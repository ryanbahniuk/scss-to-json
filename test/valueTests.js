'use strict';

var assert = require('assert');
var sinon = require('sinon');
var proxyquire =  require('proxyquire');

describe('Value', function() {
  var Value;
  var compile;

  beforeEach(function() {
    compile = {
      fromString: sinon.spy(function(input) { return input; })
    };

    Value = proxyquire('../src/value', {
      'compile': compile
    });
  });

  describe('includesFunction', function() {
    it('should return true if a function is in the given string', function() {
      assert.ok(Value.includesFunction('lighten(#123, 10%);'));
      assert.ok(Value.includesFunction('lighten(#123, 10%)'));
      assert.ok(Value.includesFunction('lighten($variable, 10%)'));
      assert.ok(Value.includesFunction('10px - floor(10.1)'));
    });

    it('should return true if a function is not in the given string', function() {
      assert.ok(!Value.includesFunction('#123'));
      assert.ok(!Value.includesFunction('rgb(1, 1, 1)'));
      assert.ok(!Value.includesFunction('$variable'));
      assert.ok(!Value.includesFunction('rgba(1, 1, 1, 0.5)'));
      assert.ok(!Value.includesFunction('url(image.svg)'));
    });
  });
});
