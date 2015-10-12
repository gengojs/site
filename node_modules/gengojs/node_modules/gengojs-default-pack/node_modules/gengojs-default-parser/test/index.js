/*global describe, it*/
var assert  = require('chai').assert;
var core    = require('gengojs-core');
var parser  = require('../src/');

describe('Parser', function(){
  'use strict';
  describe('load plugin', function() {
    it('should exist Gengo', function() {
      var gengo = core({}, parser());
      assert.isDefined(gengo.plugins.parser);
    });
  });
});
