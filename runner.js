'use strict';

var path = require('path');
var SCSStoJSON = require('./main');

var testPath = path.resolve(__dirname, 'test.scss');
var scssToJSON = new SCSStoJSON(testPath);
