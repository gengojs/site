/*global describe, it */
var assert = require('chai').assert;
var core = require('../../src');
var gengopack = require('../fixtures/plugins/');
var _ = require('lodash');
var path = require('path');
describe('core', function () {
  'use strict';
  describe('module', function () {
    it('should export the module', function () {
      assert.isFunction(core);
      assert.isDefined(core);
    });
    it('should export ship', function () {
      assert.isFunction(core().ship);
      assert.isDefined(core().ship);
    });
    it('should export parse', function () {
      assert.isFunction(core().parse);
      assert.isDefined(core().parse);
    });
    it('should export assign', function () {
      assert.isFunction(core().assign);
      assert.isDefined(core().assign);
    });
  });
  describe('plugins', function () {
    describe('init without plugins', function () {
      it('should load placeholders', function () {
        var gengo = core();
        
        //parser
        assert.isDefined(gengo.plugins.parser);
        assert.isFunction(gengo.plugins.parser);
        //header
        assert.isDefined(gengo.plugins.header);
        assert.isFunction(gengo.plugins.header);
        //router
        assert.isDefined(gengo.plugins.router);
        assert.isFunction(gengo.plugins.router);
        //backend
        assert.isDefined(gengo.plugins.backend);
        assert.isFunction(gengo.plugins.backend);
        //api
        assert.isDefined(gengo.plugins.api);
        assert.isFunction(gengo.plugins.api);
        //localize
        assert.isDefined(gengo.plugins.localize);
        assert.isFunction(gengo.plugins.localize);
      });
    });
    describe('init with plugins', function () {
      it('should load plugins', function () {
        var gengo = core({}, gengopack());
        
        //parser
        assert.isDefined(gengo.plugins.parser);
        assert.isFunction(gengo.plugins.parser);
        assert.isTrue(gengo.plugins.parser.apply(gengo));
        //header
        assert.isDefined(gengo.plugins.header);
        assert.isFunction(gengo.plugins.header);
        assert.isTrue(gengo.plugins.header.apply(gengo));
        //router
        assert.isDefined(gengo.plugins.router);
        assert.isFunction(gengo.plugins.router);
        assert.isTrue(gengo.plugins.router.apply(gengo));
        //backend
        assert.isDefined(gengo.plugins.backend);
        assert.isFunction(gengo.plugins.backend);
        assert.isTrue(gengo.plugins.backend.apply(gengo));
        //api
        assert.isDefined(gengo.plugins.api);
        assert.isFunction(gengo.plugins.api);
        assert.isTrue(gengo.plugins.api.apply(gengo));
        //localize
        assert.isDefined(gengo.plugins.localize);
        assert.isFunction(gengo.plugins.localize);
        assert.isTrue(gengo.plugins.localize.apply(gengo));
      });
    });
  });
  describe('options', function () {
    describe('plain object', function () {
      var options = core({
        hello: 'world'
      }).options;
      assert.isDefined(options);
      assert.isObject(options);
      assert.isTrue(_.has(options, 'hello'));
    });
    describe('js', function () {
      it('should read', function () {
        var options = core(path.normalize(
          process.cwd() + '/tests/fixtures/options/options.js')).options;
        assert.isDefined(options);
        assert.isObject(options);
        assert.isTrue(_.has(options, 'hello'));
      });
    });
    describe('json', function () {
      it('should read', function () {
        var options = core(path.normalize(
          process.cwd() + '/tests/fixtures/options/options.json')).options;
        assert.isDefined(options);
        assert.isObject(options);
        assert.isTrue(_.has(options, 'hello'));
      });
    });
    describe('yaml', function () {
      it('should read', function () {
        var options = core(path.normalize(
          process.cwd() + '/tests/fixtures/options/options.yml')).options;
        assert.isDefined(options);
        assert.isObject(options);
        assert.isTrue(_.has(options, 'hello'));
      });
    });
  });
});
