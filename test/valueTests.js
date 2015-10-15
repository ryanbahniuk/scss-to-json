'use strict';

var assert = require('assert');
var sinon = require('sinon');
var proxyquire =  require('proxyquire');

describe('Value', function() {
  var scssString;
  var Value;
  var declarationStore;
  var compile;

  beforeEach(function() {
    scssString = ' blue !global';

    declarationStore = {
      replaceVariables: sinon.spy(function(input) { return input; })
    };

    compile = {
      fromString: sinon.spy(function(input) { return input; })
    };

    Value = proxyquire('../src/value', {
      './compile': compile,
      './declarationStore': declarationStore
    });
  });

  describe('Constructor', function() {
    it('should call _parse with the given scssString', function() {
      var parseStub = sinon.stub(Value.prototype, '_parse');

      new Value(scssString);

      assert.ok(parseStub.calledOnce);
      assert.ok(parseStub.calledWith(scssString));
    });
  });

  describe('#_parse', function() {
    it('assigns the value and calls the correct transforms', function() {
      var value = new Value(scssString);

      assert.ok(declarationStore.replaceVariables.calledWith(' blue '));
      assert.ok(compile.fromString.calledWith(' blue '));
      assert.strictEqual(value.value, 'blue');
    });
  });
});
