var assert = require('chai').assert;
var plugify = require('../../src/modules/plugify');
var path = require('path');
var fixtures = path.resolve(__dirname, '../plugify/fixtures/');
var plugs = require(fixtures);

describe("Plugify", function () {
  describe("plugins", function () {
    var plugins = plugify(plugs());
    it("should return the correct plugins", function () {
      assert.isFunction(plugs);
      assert.isObject(plugins);
      assert.equal(plugins.parser.package.name, 'mocha-parser');
      plugins = plugify((function(){
        return {
          main:function ship(){},
          package: { name : 'override-parser', 'type': 'parser' },
          defaults: {
            greet:'hello'
          }
        };
      })(), {}, plugs());
      assert.isFunction(plugins.parser);
      assert.equal(plugins.parser.package.name, 'override-parser');
      assert.isFunction(plugins.router);
      assert.equal(plugins.router.package.name, 'mocha-router');
      
      plugins = plugify({}, {}, plugs());
      assert.isFunction(plugins.router);
      assert.equal(plugins.router.package.name, 'mocha-router');
      
      plugins = plugify([(function(){
        return {
          main:function ship(){},
          package: { name : 'override-parser', 'type': 'parser' },
          defaults: {
            greet:'hello'
          }
        };
      })], {}, plugs());
      assert.equal(plugins.parser.package.name, 'override-parser');
      assert.isFunction(plugins.router);
      assert.equal(plugins.router.package.name, 'mocha-router');
    });
  });
  
  
  describe("options", function () {
    var options = {
      parser: {
        greet: 'hello 1',
      },
      router: {
        greet2: 'hello 2'
      },
      backend: {
        greet3: 'hello 3'
      },
      api: {
        greet4: 'hello 4'
      },
      header: {
      },
      localize: {
        greet6: 'hello 6'
      }
    };
    var plugins = plugify(plugs(), options);
    it("should merge user settings", function () {
      assert.deepEqual(options, {
        parser: {
          greet :'hello 1',
        },
        router: {
          greet2 :'hello 2',
        },
        backend: {
          greet3 :'hello 3',
        },
        api: {
          greet4 :'hello 4',
        },
        header: {
          greet5 :'hello',
        },
        localize: {
          greet6 :'hello 6',
        }
      });
    });
  });
});