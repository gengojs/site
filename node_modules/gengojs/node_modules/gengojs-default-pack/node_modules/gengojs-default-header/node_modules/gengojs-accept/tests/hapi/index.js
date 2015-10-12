var Hapi = require('hapi');
var accept = require('../../');
var assert = require('chai').assert;

describe('hapi', function() {
  describe('options', function() {
    describe('default', function() {
      describe('"default"', function() {
        it('should === "en-US"', function(done) {
          var result = accept();
          assert.strictEqual(result.options.default, 'en-US');
          done();
        });
      });
      describe('supported', function() {
        it('should === "["en-US"]"', function(done) {
          var result = accept();
          assert.deepEqual(result.options.supported, ['en-US']);
          done();
        });
      });

    });
    describe('configured', function() {
      describe('"default"', function() {
        it('should === "ja"', function(done) {
          var result = accept(null, {
            default: 'ja'
          });
          assert.strictEqual(result.options.default, 'ja');
          done();
        });
      });
      describe('supported', function() {
        it('should === "["en-US", "ja"]"', function(done) {
          var result = accept(null, {
            supported: ['en-US', 'ja']
          });
          assert.deepEqual(result.options.supported, ['en-US', 'ja']);
          done();
        });
      });
    });
  });

  describe('middleware', function() {
    var server = new Hapi.Server();
    server.connection({
      host: 'localhost',
      port: 3000
    });

    var handler = function(request, reply) {
      return reply(request.accept.getLocale());
    };
    server.register(require('../../hapi/')(), function(err) {
      if (err) console.log('an error occurred');
    });
    server.route({
      method: 'GET',
      path: '/',
      handler: handler
    });
    
    describe('request "/"', function() {
      it('should === "en-US"', function(done) {
        server.inject({
          method: 'GET',
          url: '/'
        }, function(res) {
          assert.isObject(res.request.accept);
          assert.strictEqual(res.result, 'en-US');
          assert.strictEqual(res.request.accept.getLocale(), 'en-US');

          done();
        });
      });
    });
  });

  describe('getLocale()', function() {
    describe('options', function() {
      describe('default', function() {
        var server = new Hapi.Server();
        server.connection({
          host: 'localhost',
          port: 3000
        });

        var handler = function(request, reply) {
          return reply(accept(request).getLocale());
        };
        server.route({
          method: 'GET',
          path: '/',
          handler: handler
        });
        
        it('should === "en-US"', function(done) {
          server.inject({
            method: 'GET',
            url: '/',
            headers: {
              'Accept-Language': 'ja',
              'Set-Cookie': 'mycookie=test'
            }
          }, function(res) {
            assert.strictEqual(res.result, 'en-US');
            done();
          });
        });
      });

      describe('configured', function() {
        var server = new Hapi.Server();
        server.connection({
          host: 'localhost',
          port: 3000
        });

        var handler = function(request, reply) {
          return reply(accept(request, {
            supported: ['ja', 'en-US']
          }).getLocale());
        };
        server.route({
          method: 'GET',
          path: '/',
          handler: handler
        });
        
        it('should === "ja"', function(done) {
          server.inject({
            method: 'GET',
            url: '/',
            headers: {
              'Accept-Language': 'ja',
              'Set-Cookie': 'mycookie=test'
            }
          }, function(res) {
            assert.strictEqual(res.result, 'ja');
            done();
          });
        });
      });
    });
  });

  describe('setLocale()', function() {
    describe('options', function() {
      describe('default', function() {
        var server = new Hapi.Server();
        server.connection({
          host: 'localhost',
          port: 3000
        });

        var handler = function(request, reply) {
          var result = accept(request);
          var set = result.setLocale('en');
          var detect = result.detectLocale();
          return reply({
            set: set,
            detect: detect
          });
        };
        server.route({
          method: 'GET',
          path: '/',
          handler: handler
        });
        
        it('should === "en-US"', function(done) {
          server.inject({
            method: 'GET',
            url: '/',
            headers: {
              'Accept-Language': 'ja',
              'Set-Cookie': 'mycookie=test'
            }
          }, function(res) {
            assert.strictEqual(res.result.set, 'en-US');
            assert.strictEqual(res.result.detect, 'en-US');
            done();
          });
        });
      });
      describe('configured', function() {
        var server = new Hapi.Server();
        server.connection({
          host: 'localhost',
          port: 3000
        });

        var handler = function(request, reply) {
          var result = accept(request, {
            supported: ['ja', 'en-US', 'en']
          });
          var set = result.setLocale('en');
          var detect = result.detectLocale();
          return reply({
            set: set,
            detect: detect
          });
        };
        server.route({
          method: 'GET',
          path: '/',
          handler: handler
        });
        
        it('should === "en"', function(done) {
          server.inject({
            method: 'GET',
            url: '/',
            headers: {
              'Accept-Language': 'ja',
              'Set-Cookie': 'mycookie=test'
            }
          }, function(res) {
            assert.strictEqual(res.result.set, 'en');
            assert.strictEqual(res.result.detect, 'en');
            done();
          });
        });
      });
    });
  });

  describe('getFromQuery()', function() {
    describe('options', function() {
      describe('default', function() {
        var server = new Hapi.Server();
        server.connection({
          host: 'localhost',
          port: 3000
        });

        var handler = function(request, reply) {
          return reply(accept(request).getFromQuery('locale'));
        };
        server.route({
          method: 'GET',
          path: '/',
          handler: handler
        });
        
        it('should !== "en"', function(done) {
          server.inject({
            method: 'GET',
            url: '/?locale=en',
            headers: {
              'Accept-Language': 'ja',
              'Set-Cookie': 'mycookie=test'
            }
          }, function(res) {
            assert.strictEqual(res.result, 'en-US');
            done();
          });
        });
        server.stop(function() {});
      });
      describe('configured', function() {
        var server = new Hapi.Server();
        server.connection({
          host: 'localhost',
          port: 3000
        });

        var handler = function(request, reply) {
          return reply(accept(request, {
            supported: ['en']
          }).getFromQuery('locale'));
        };
        server.route({
          method: 'GET',
          path: '/',
          handler: handler
        });
        
        it('should === "en"', function(done) {
          server.inject({
            method: 'GET',
            url: '/?locale=en',
            headers: {
              'Accept-Language': 'ja',
              'Set-Cookie': 'mycookie=test'
            }
          }, function(res) {
            assert.strictEqual(res.result, 'en');
            done();
          });
        });
        server.stop(function() {});
      });
    });
  });

  describe('getAcceptLanguage()', function() {
    var server = new Hapi.Server();
    server.connection({
      host: 'localhost',
      port: 3000
    });

    var handler = function(request, reply) {
      return reply(accept(request).getAcceptLanguage());
    };
    server.route({
      method: 'GET',
      path: '/',
      handler: handler
    });
    
    it('should === "ja"', function(done) {
      server.inject({
        method: 'GET',
        url: '/',
        headers: {
          'Accept-Language': 'ja',
          'Set-Cookie': 'mycookie=test'
        }
      }, function(res) {
        assert.strictEqual(res.result, 'ja');
        done();
      });
    });
    server.stop(function() {});
  });

  describe('getFromDomain()', function() {
    describe('options', function() {
      describe('default', function() {
        var server = new Hapi.Server();
        server.connection({
          host: 'localhost',
          port: 3000
        });

        var handler = function(request, reply) {
          return reply(accept(request).getFromDomain());
        };
        server.route({
          method: 'GET',
          path: '/',
          handler: handler
        });
        
        it('should !== "en"', function(done) {
          server.inject({
            method: 'GET',
            url: '/',
            headers: {
              'Accept-Language': 'ja',
              'Set-Cookie': 'mycookie=test',
              'Host': 'example.en'
            }
          }, function(res) {
            assert.strictEqual(res.result, 'en-US');
            assert.notStrictEqual(res.result, 'en');
            assert.strictEqual(res.statusCode, 200);
            done();
          });
        });
        server.stop(function() {});
      });

      describe('configured', function() {
        var server = new Hapi.Server();
        server.connection({
          host: 'localhost',
          port: 3000
        });

        var handler = function(request, reply) {
          return reply(accept(request, {
            supported: ['en']
          }).getFromDomain());
        };
        server.route({
          method: 'GET',
          path: '/',
          handler: handler
        });
        
        it('should === "en"', function(done) {
          server.inject({
            method: 'GET',
            url: '/',
            headers: {
              'Accept-Language': 'ja',
              'Set-Cookie': 'mycookie=test',
              'Host': 'localhost.en'
            }
          }, function(res) {
            assert.strictEqual(res.result, 'en');
            done();
          });
        });
        server.stop(function() {});
      });
    });

  });
  describe('getFromSubdomain()', function() {
    describe('options', function() {
      describe('default', function() {
        var server = new Hapi.Server();
        server.connection({
          host: 'localhost',
          port: 3000
        });

        var handler = function(request, reply) {
          return reply(accept(request).getFromSubdomain());
        };
        server.route({
          method: 'GET',
          path: '/',
          handler: handler
        });
        
        it('should !== "en"', function(done) {
          server.inject({
            method: 'GET',
            url: '/',
            headers: {
              'Accept-Language': 'ja',
              'Set-Cookie': 'mycookie=test',
              'Host': 'en.example.ja'
            }
          }, function(res) {
            assert.strictEqual(res.result, 'en-US');
            assert.notStrictEqual(res.result, 'en');
            assert.strictEqual(res.statusCode, 200);
            done();
          });
        });
        server.stop(function() {});
      });
      describe('configured', function() {
        var server = new Hapi.Server();
        server.connection({
          host: 'localhost',
          port: 3000
        });

        var handler = function(request, reply) {
          return reply(accept(request, {
            supported: ['en']
          }).getFromSubdomain());
        };
        server.route({
          method: 'GET',
          path: '/',
          handler: handler
        });
        
        it('should === "en"', function(done) {
          server.inject({
            method: 'GET',
            url: '/',
            headers: {
              'Accept-Language': 'ja',
              'Set-Cookie': 'mycookie=test',
              'Host': 'en.localhost.ja'
            }
          }, function(res) {
            assert.strictEqual(res.result, 'en');
            assert.strictEqual(res.statusCode, 200);
            done();
          });
        });
        server.stop(function() {});
      });
    });
  });

  describe('getFromUrl()', function() {
    describe('options', function() {
      describe('default', function() {
        var server = new Hapi.Server();
        server.connection({
          host: 'localhost',
          port: 3000
        });

        var handler = function(request, reply) {
          return reply(accept(request).getFromUrl());
        };
        server.route({
          method: 'GET',
          path: '/en',
          handler: handler
        });
        
        it('should !== "en"', function(done) {
          server.inject({
            method: 'GET',
            url: '/en',
            headers: {
              'Accept-Language': 'ja',
              'Set-Cookie': 'locale=ja'
            }
          }, function(res) {
            assert.strictEqual(res.result, 'en-US');
            done();
          });
        });
        server.stop(function() {});
      });
      describe('configured', function() {
        var server = new Hapi.Server();
        server.connection({
          host: 'localhost',
          port: 3000
        });

        var handler = function(request, reply) {
          return reply(accept(request, {
            supported: ['ja', 'en-US', 'en']
          }).getFromUrl());
        };
        server.route({
          method: 'GET',
          path: '/en',
          handler: handler
        });
        
        it('should === "en"', function(done) {
          server.inject({
            method: 'GET',
            url: '/en',
            headers: {
              'Accept-Language': 'ja',
              'Set-Cookie': 'locale=ja'
            }
          }, function(res) {
            assert.strictEqual(res.result, 'en');
            done();
          });
        });
        server.stop(function() {});
      });
    });
  });
  describe('getFromCookie()', function() {
    describe('options', function() {
      describe('default', function() {
        var server = new Hapi.Server();
        server.connection({
          host: 'localhost',
          port: 3000
        });

        var handler = function(request, reply) {
          return reply(accept(request).getFromCookie());
        };
        server.route({
          method: 'GET',
          path: '/',
          handler: handler
        });
        
        it('should !== "en"', function(done) {
          server.inject({
            method: 'GET',
            url: '/?locale=en',
            headers: {
              'Accept-Language': 'ja',
              'Set-Cookie': 'locale=en'
            }
          }, function(res) {
            assert.strictEqual(res.result, 'en-US');
            done();
          });
        });
        server.stop(function() {});
      });
      describe('configured', function() {
        var server = new Hapi.Server();
        server.connection({
          host: 'localhost',
          port: 3000
        });

        var handler = function(request, reply) {
          return reply(accept(request, {
            supported: ['ja', 'en-US', 'en']
          }).getFromCookie());
        };
        server.route({
          method: 'GET',
          path: '/',
          handler: handler
        });
        
        it('should === "en"', function(done) {
          server.inject({
            method: 'GET',
            url: '/',
            headers: {
              'Accept-Language': 'ja',
              'Set-Cookie': 'locale=en'
            }
          }, function(res) {
            assert.strictEqual(res.result, 'en');
            done();
          });
        });
        server.stop(function() {});
      });
    });
  });

  describe('detectLocale()', function() {
    describe('options', function() {
      describe('default', function() {
        var server = new Hapi.Server();
        server.connection({
          host: 'localhost',
          port: 3000
        });

        var handler = function(request, reply) {
          return reply(accept(request).detectLocale());
        };
        server.route({
          method: 'GET',
          path: '/',
          handler: handler
        });
        
        it('should !== "en"', function(done) {
          server.inject({
            method: 'GET',
            url: '/?locale=en',
            headers: {
              'Accept-Language': 'ja',
              'Set-Cookie': 'locale=ja'
            }
          }, function(res) {
            assert.strictEqual(res.result, 'en-US');
            done();
          });
        });
        server.stop(function() {});
      });
      describe('configured', function() {
        var server = new Hapi.Server();
        server.connection({
          host: 'localhost',
          port: 3000
        });

        var handler = function(request, reply) {
          return reply(accept(request, {
            supported: ['ja', 'en-US', 'en'],
            default: 'en',
            detect: {
              header: false,
              url: true
            }
          }).detectLocale());
        };
        server.route({
          method: 'GET',
          path: '/en',
          handler: handler
        });
        
        it('should === "en"', function(done) {
          server.inject({
            method: 'GET',
            url: '/en',
            headers: {
              'Accept-Language': 'ja',
              'Set-Cookie': 'locale=en'
            }
          }, function(res) {
            assert.strictEqual(res.result, 'en');
            done();
          });
        });
        server.stop(function() {});
      });
    });
  });
});