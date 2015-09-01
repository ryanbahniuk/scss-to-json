'use strict';

var fs = require('fs-extra');
var Processor = require('./processor');

function SCSStoJSON(path) {
  this.processor = new Processor(path);
  fs.readFile(path, this.processor.parse);
}

module.exports = SCSStoJSON;
