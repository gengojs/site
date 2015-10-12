/*global describe, it*/
var chai = require('chai');
var path = require('path');
var assert = chai.assert;
var core = require('gengojs-core');
var memory = require('../src/');

describe('Memory', function() {
  'use strict';
  describe('load plugin', function() {
    it('should exist Gengo', function() {
      var gengo = core({
        backend: {
          directory: path.join(__dirname, '/fixtures/locales')
        }
      }, memory());
      assert.isDefined(gengo.backend);
    });
  });

  describe('read files', function() {
    it('should read json', function() {
      var gengo = core({
        backend: {
          directory: path.join(__dirname, '/fixtures/locales')
        }
      }, memory());
      assert.isDefined(gengo.backend.data);
      gengo.backend.read(function(data) {
        assert.deepEqual(data, {
          en: {
            Hello: 'World'
          }
        });
      });
    });
    it('should read yaml', function() {
      var gengo = core({
        backend: {
          directory: path.join(__dirname, '/fixtures/locales'),
          extension: 'yaml'
        }
      }, memory());
      gengo.backend.read(function(data) {
        assert.deepEqual(data, {
          en: {
            Hello: 'World'
          }
        });
      });

    });
    it('should read javascript', function() {
      var gengo = core({
        backend: {
          directory: path.resolve(__dirname, '/fixtures/locales'),
          extension: 'js'
        }
      }, memory());
      gengo.backend.read(function(data) {
        assert.deepEqual(data, {
          en: {
            Hello: 'World'
          }
        });
      });

    });
  });
});
