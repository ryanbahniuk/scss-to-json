'use strict';

var assert = require('assert');
var proxyquire = require('proxyquire');
var sinon = require('sinon');

describe('Processor', function() {
  var path;
  var writeFileStub;
  var resolveStub;
  var Processor;
  var DeclarationStub;
  var fsStub;
  var pathStub;
  var testFile;
  var testOutput;

  beforeEach(function() {
    path = 'path/to/a/file';
    writeFileStub = sinon.stub();
    resolveStub = sinon.stub().returns(path);

    DeclarationStub = function(line) {
      var lineArray = line.split(':');
      this.line = line;
      this.isDeclaration = true;
      this.variable = {
        value: lineArray[0]
      };
      this.value = {
        value: lineArray[1]
      };
    };

    fsStub = {
      writeFile: writeFileStub
    };

    pathStub = {
      resolve: resolveStub
    };

    Processor = proxyquire('../processor', {
      './declaration': DeclarationStub,
      'fs-extra': fsStub,
      'path': pathStub
    });

    testFile = '$test: 5px;\n//this is a comment\n$second: blue;\n$third: 1px solid blue;';
    testOutput = JSON.stringify({
      '$test': '5px',
      '$second': 'blue',
      '$third': '1px solid blue'
    });
  });

  describe('Constructor', function() {
    it('should set a path on the processor', function() {
      var processor = new Processor(path);

      assert.strictEqual(processor.path, path);
    });
  });

  describe('#parse', function() {
    context('if error is passed', function() {
      it('throws an error', function() {
        assert.throws(function() {
          var processor = new Processor(path);
          processor.parse('error message', testFile);
        });
      });
    });

    context('if error is not passed', function() {
      var processor;
      var makeJSONStub;

      beforeEach(function() {
        makeJSONStub = sinon.stub(Processor, 'makeJSON');
        processor = new Processor(path);
      });

      it('creates an array of Declarations, creates JSON from it, and saves to file', function() {
        processor.parse(undefined, testFile);

        assert(fsStub.writeFile.calledWith(path, testOutput));
      });
    });
  });
});
