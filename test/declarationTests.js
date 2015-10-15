'use strict';

var assert = require('assert');
var proxyquire = require('proxyquire');
var sinon = require('sinon');

describe('Declaration', function() {
  var Declaration;
  var declaration;
  var ValueStub;
  var VariableStub;
  var declarationStoreStub;
  var scssString;

  beforeEach(function() {
    ValueStub = function(value) {
      this.value = value;
      this.isValue = true;
    };

    VariableStub = function(value) {
      this.value = value;
      this.isVariable = true;
    };

    declarationStoreStub = {
      hasDefinedVariable: function() {},
      addDeclaration: function() {}
    };

    Declaration = proxyquire('../src/declaration', {
      './value': ValueStub,
      './variable': VariableStub,
      './declarationStore': declarationStoreStub
    });

    scssString = '$test:1px solid blue;';
  });

  describe('Constructor', function() {
    it('should call parse with the given string', function() {
      var parseStub = sinon.stub(Declaration.prototype, '_parse');
      new Declaration(scssString);

      assert.ok(parseStub.calledWith(scssString));
    });
  });

  describe('#_parse', function() {
    var declaration;

    beforeEach(function() {
      sinon.stub(Declaration.prototype, '_parse');
      declaration = new Declaration(scssString);
      sinon.restore(Declaration.prototype, '_parse');
    });

    it('should assign this.variable with the variable part of the given string', function() {
      declaration._parse(scssString);

      assert.ok(declaration.variable.isVariable);
      assert.strictEqual(declaration.variable.value, '$test');
    });

    it('should assign this.value with the value part of the given string', function() {
      declaration._parse(scssString);

      assert.ok(declaration.value.isValue);
      assert.strictEqual(declaration.value.value, '1px solid blue;');
    });

    it('should add the declaration to the store if it does not have a defined variable in the value', function() {
      var hasDefinedVariableStub = sinon.stub(declarationStoreStub, 'hasDefinedVariable').returns(false);
      var addDeclarationStub = sinon.stub(declarationStoreStub, 'addDeclaration');

      declaration._parse(scssString);

      assert.ok(hasDefinedVariableStub.calledWith('1px solid blue;'));
      assert.ok(addDeclarationStub.calledWith(declaration));
    });
  });
});
