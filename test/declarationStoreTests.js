'use strict';

var assert = require('assert');

describe('DeclarationStore', function() {
  var declarationStore;

  beforeEach(function() {
    declarationStore = require('../declarationStore');
  });

  describe('constructor', function() {
    it('should set a store to an empty array', function() {
      assert.deepEqual(declarationStore.declarations, []);
    });
  });

  describe('addDeclaration', function() {
    var declaration = { variable: '$test', value: '10px' };

    it('adds an item into the store', function() {
      assert.equal(declarationStore.declarations.length, 0);
      declarationStore.addDeclaration(declaration);
      assert.equal(declarationStore.declarations.length, 1);
      assert.deepEqual(declarationStore.declarations[0], declaration);
    });
  });

  describe('hasDefinedVariable', function() {
    it('returns true if the variable in the given value is defined in the store', function() {
    });

    it('returns false if the variable in the given value is not defined in the store', function() {
    });

    it('returns false if there is no variable defined in the given value', function() {
    });
  });
});
