/*global describe, it*/
var chai = require('chai');
var assert = chai.assert;
var core = require('gengojs-core');
var localize = require('../src/');

describe('Localize', function() {
  'use strict';
  describe('load plugin', function() {
    it('should exist in the core', function() {
      var gengo = core({}, localize());
      assert.isDefined(gengo.plugins.localize);
    });
  });
});