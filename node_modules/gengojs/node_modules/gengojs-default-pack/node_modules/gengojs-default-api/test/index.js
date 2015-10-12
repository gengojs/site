/* global describe, it*/
var assert = require('chai').assert;
var core = require('gengojs-core');
var api = require('../src/');

describe('API (plugin)', function() {
  'use strict';
  describe('load plugin', function() {
    it('should exist in the core', function() {
      var gengo = core({}, api());
      assert.isDefined(gengo.plugins.api);
    });
  });
});
