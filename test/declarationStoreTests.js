'use strict';

var assert = require('assert');

describe('DeclarationStore', function() {
  var declarationStore;
  var sampleDeclaration;
  var secondSampleDeclaration;

  beforeEach(function() {
    declarationStore = require('../declarationStore');
    sampleDeclaration = {
      variable: {
       value: '$test'
      },
      value: {
        value: '10px'
      }
    };
    secondSampleDeclaration = {
      variable: {
       value: '$second'
      },
      value: {
        value: 'blue'
      }
    };
  });

  afterEach(function() {
    declarationStore.declarations = [];
  });

  describe('Constructor', function() {
    it('should set a store to an empty array', function() {
      assert.deepEqual(declarationStore.declarations, []);
    });
  });

  describe('#addDeclaration', function() {
    it('adds an item into the store', function() {
      assert.equal(declarationStore.declarations.length, 0);
      declarationStore.addDeclaration(sampleDeclaration);
      assert.equal(declarationStore.declarations.length, 1);
      assert.deepEqual(declarationStore.declarations[0], sampleDeclaration);
    });
  });

  describe('#hasDefinedVariable', function() {
    beforeEach(function() {
      declarationStore.declarations = [sampleDeclaration, secondSampleDeclaration];
    });

    it('returns true if the given value is a variable defined in the store', function() {
      assert.ok(declarationStore.hasDefinedVariable('$test'));
    });

    it('returns true if the given value includes a variable defined in the store', function() {
      assert.ok(declarationStore.hasDefinedVariable('1px solid $second'));
    });

    it('returns false if the variable in the given value is not defined in the store', function() {
      assert.ok(!declarationStore.hasDefinedVariable('$not-defined'));
    });

    it('returns false if the store is empty', function() {
      declarationStore.declarations = [];
      assert.ok(!declarationStore.hasDefinedVariable('$not-defined'));
    });

    it('returns false if there is no variable defined in the given value', function() {
      assert.ok(!declarationStore.hasDefinedVariable('red'));
    });
  });

  describe('#replaceVariables', function() {
    beforeEach(function() {
      declarationStore.declarations = [sampleDeclaration, secondSampleDeclaration];
    });

    it('replaces variables in the given string with their value from the store if they exist in the store', function() {
      assert.strictEqual(declarationStore.replaceVariables('$test'), '10px');
      assert.strictEqual(declarationStore.replaceVariables('1px solid $second'), '1px solid blue');
    });

    it('returns the original string if the variable is not defined in the store', function() {
      var scssString = '1px solid $not-defined';
      assert.strictEqual(declarationStore.replaceVariables(scssString), scssString);
    });

    it('returns the original string if the store is empty', function() {
      declarationStore.declarations = [];
      var scssString = '1px solid $not-defined';
      assert.strictEqual(declarationStore.replaceVariables(scssString), scssString);
    });

    it('returns the original string if there is no variable defined in the given value', function() {
      var scssString = '1px solid red';
      assert.strictEqual(declarationStore.replaceVariables(scssString), scssString);
    });
  });
});
