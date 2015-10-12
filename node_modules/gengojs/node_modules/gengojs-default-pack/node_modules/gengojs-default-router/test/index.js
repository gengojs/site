/* global describe, it*/
var assert = require('chai').assert;
var Core = require('gengojs-core');
var router = require('../src/');
var Router = router().mock;
describe('Router', function() {
  'use strict';
  describe('load plugin', function() {
    it('should exist Gengo', function() {
      var gengo = new Core({}, router());
      assert.isDefined(gengo.plugins.router);
    });
  });

  describe('API', function() {
    describe('toArray', function() {
      var route = new Router('/hello/world');
      it('should exist', function() {

        assert.isDefined(route.toArray);
      });
      it('should convert path to Array', function() {
        assert.deepEqual(route.toArray(), ['hello', 'world']);
      });
      it('should ignore locales', function() {
        route = new Router('/hello/world/en');
        assert.deepEqual(route.toArray(), ['hello', 'world']);
      });
    });
    describe('toDot', function() {
      var route = new Router('/hello/world');
      it('should exist', function() {
        assert.isDefined(route.toDot);
      });
      it('should convert path to Dot notation', function() {
        assert.strictEqual(route.toDot(), 'hello.world');
      });
      it('should ignore locales', function() {
        route = new Router('/hello/world/en');
        assert.strictEqual(route.toDot(), 'hello.world');
      });
    });
    describe('isEnabled', function() {
      var route = new Router('/hello/world/en', true);
      it('should exist', function() {
        assert.isDefined(route.isEnabled);
      });
      it('should return true', function() {
        assert.isTrue(route.isEnabled());
      });
    });
  });
});