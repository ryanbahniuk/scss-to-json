/* eslint-env node, mocha */
'use strict';

var assert = require('assert');
var path = require('path');
var spawn = require('cross-spawn');
var cli = path.join(__dirname, '../bin/scss-to-json');

function callAndExpectNoErrors(args, cb) {
  var bin = spawn(cli, args);
  bin.stdout.setEncoding('utf8');
  bin.stderr.setEncoding('utf8');

  bin.stderr.once('data', function(data) {
    throw new Error(data);
  });

  bin.stdout.once('data', cb);
}

describe('cli', function() {
  it('returns help', function(done) {
    callAndExpectNoErrors(['-h'], function(data) {
      assert.equal(data.indexOf('Usage:'), 0);
      done();
    });
  });

  it('compiles', function(done) {
    var file = path.resolve(__dirname, 'scss', 'has-dependents.scss');
    var dependency = path.resolve(__dirname, 'scss', 'dependency.scss');
    var expectedLines = [
      '{',
      '  "$first": "#00f",',
      '  "$global-variable": "#f00",',
      '  "$references": "#00f",',
      '  "$scss-function-with-variable": "#e60000"',
      '}'
    ];

    callAndExpectNoErrors([file, '--dependencies', dependency], function(data) {
      var lines = data.trim().replace(/\r\n/g, '\n').split('\n');
      assert.equal(lines.length, expectedLines.length);
      lines.forEach(function(l, i) {
        assert.equal(l, expectedLines[i]);
      });
      done();
    });
  });
});
