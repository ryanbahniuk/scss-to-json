'use strict';

var path = require('path');
var assert = require('assert');
var scssToJson = require('../main.js');

describe('Integration Tests', function() {
  var output;

  context('if file has no dependencies', function() {
    beforeEach(function() {
      output = {
        "$first": "52px",
        "$second-variable": "red",
        "$global-variable": "#123",
        "$references": "red",
        "$scss-function": "#1e3b59",
        "$scss-function-with-variable": "#0b1520",
        "$image": "url(sample.svg)",
        "$image-with-quotes": "url(\"sample.svg\")",
        "$calculation": "40px",
        "$multiple-variables": "52px solid red",
        "$multiple-calculations": "40px",
        "$gray-50": "#fff",
        "$gray-500": "#f6f6f6",
        "$uses-gray-500": "#f6f6f6"
      };
    });

    it('should compile the sample file to the correct JS object', function() {
      var filePath = path.resolve(__dirname, 'scss', 'test.scss');
      var compiled = scssToJson(filePath);

      assert.deepEqual(output, compiled);
    });
  });

  context('if file has dependencies', function() {
    beforeEach(function() {
      output = {
        "$first": "#00f",
        "$global-variable": "#f00",
        "$references": "#00f",
        "$scss-function-with-variable": "#e60000"
      };
    });

    it('should compile the sample file to the correct JS object', function() {
      var filePath = path.resolve(__dirname, 'scss','has-dependents.scss');
      var dependencyPath = path.resolve(__dirname, 'scss', 'dependency.scss');
      var compiled = scssToJson(filePath, {
        dependencies: [
          dependencyPath
        ]
      });

      assert.deepEqual(output, compiled);
    });
  });
});
