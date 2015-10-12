/*global describe, it*/
var assert = require('chai').assert;
var core = require('gengojs-core');
var header = require('../../src/');
var wrappify = require('gengojs-wrappify/es6');
require('babel/polyfill');

describe('Header', function() {
  'use strict';
  describe('load plugins', function() {
    it('should exist', function() {
      var gengo = core({}, header());
      assert.isDefined(gengo.plugins);
      var plugin = gengo.plugins.header;
        assert.isFunction(plugin);
        assert.strictEqual(plugin.package.type, 'header');
        assert.strictEqual(plugin.package.name, 'gengojs-default-header');
    });
  });
  describe('koa', function() {
    var gengo = core({}, header());
    var koa = require('koa');
    var app = koa();
    app.use(wrappify(gengo).koa());
    var request = require('supertest');
    it('should have the api exposed internally', function() {
      request(app.listen()).get('/').end(function() {
        assert.isDefined(gengo.header);
        assert.isDefined(gengo.header.getLocale);
      });
    });
  });

  describe('express', function() {
    var gengo = core({}, header());
    var express = require('express');
    var app = express();
    var request = require('supertest');
    app.use(wrappify(gengo).express());
    it('should have the api exposed internally', function() {
      request(app).get('/').end(function() {
        assert.isDefined(gengo.header);
        assert.isDefined(gengo.header.getLocale);
      });
    });
  });

  describe('hapi', function() {
    var gengo = core({}, header());
    var hapi = require('hapi');
    var server = new hapi.Server();
    server.connection({
      port: 3000
    });
    server.register(wrappify(gengo).hapi(), function() {});
    it('should have the api exposed internally', function() {
      server.inject('/', function() {
        assert.isDefined(gengo.header);
        assert.isDefined(gengo.header.getLocale);
      });
    });
  });

});
