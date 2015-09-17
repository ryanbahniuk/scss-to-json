'use strict';

var assert = require('assert');
var proxyquire = require('proxyquire');
var sinon = require('sinon');

describe('SCSStoJSON', function() {
  var readFileStub;
  var parseStub;
  var ProcessorStub;
  var fsStub;
  var SCSStoJSON;

  beforeEach(function() {
    readFileStub = sinon.stub();
    parseStub = sinon.stub();

    ProcessorStub = function(path) {
      this.path = path;
      this.isProcessor = true;
      this.parse = parseStub;
    };

    fsStub = {
      readFile: readFileStub
    };

    SCSStoJSON = proxyquire('../main', {
      './processor': ProcessorStub,
      'fs-extra': fsStub
    });
  });

  describe('Constructor', function() {
    var path;
    var scssToJSON;

    beforeEach(function() {
      path = 'path/to/a/file';
      scssToJSON = new SCSStoJSON(path);
    });

    it('should set a processor with the correct path', function() {
      assert.ok(scssToJSON.processor.isProcessor);
      assert.strictEqual(scssToJSON.processor.path, path);
    });

    it('should call fs.readFile with the correct callback', function() {
      assert.ok(readFileStub.calledWith(path, scssToJSON.processor.parse));
    });
  });
});
