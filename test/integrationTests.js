'use strict';

var path = require('path');
var assert = require('assert');
var scssToJson = require('../main.js');

describe('Integration Tests', function() {
  var output;

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
      "$multiple-calculations":"40px"
    };
  });

  it('should compile the sample file to the correct JS object', function() {
    var filePath = path.resolve(__dirname, 'test.scss');
    var compiled = scssToJson(filePath);

    assert.deepEqual(output, compiled);
  });
});
