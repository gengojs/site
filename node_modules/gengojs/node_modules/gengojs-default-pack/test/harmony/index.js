/*global describe, it*/
// Dependencies
var assert = require('chai').assert;
var core = require('gengojs-core');
var pack = require('../../src/');
var wrapper = require('gengojs-wrappify/es6');
var request = require('supertest');
var _ = require('lodash');
var path = require('path');
// Servers
var koa = require('koa');
var hapi = require('hapi');
var express = require('express');
// App
var app = {
  koa: koa(),
  hapi: new hapi.Server(),
  express: express()
};
// Wrap the core
var wrap = wrapper(core({}, pack()));

// Set the routed version of gengo
var routed = wrapper(core({
  router: {
    enabled: true
  },
  header: {
    supported: ['en-us', 'ja']
  },
  backend: {
    directory: path.resolve(__dirname,
      '../fixtures/locales/routed/dest/') + '/'
  }
}, pack()));
// Set the unrouted version of gengo
var unrouted = wrapper(core({
  router: {
    enabled: false
  },
  header: {
    supported: ['en-us', 'ja']
  },
  backend: {
    directory: path.resolve(__dirname,
      '../fixtures/locales/unrouted/dest/') + '/'
  }
}, pack()));

// Koa router
var router = require('koa-router')();

describe('gengo-pack', function() {
  'use strict';
  describe('plugins', function() {
    // API tests
    describe('api', function() {
      // Koa
      describe('koa', function() {
        app.koa.use(wrap.koa());
        app.koa.use(function*(next) {
          this.body = {
            __: !_.isUndefined(this.__) &&
              !_.isUndefined(this.request.__) &&
              !_.isUndefined(this.req.__),
            __l: !_.isUndefined(this.__l) &&
              !_.isUndefined(this.request.__l) &&
              !_.isUndefined(this.req.__l)
          };
          yield next;
        });
        describe('\'__\' , \'__l\'', function() {
          it('should exist', function(done) {
            request(app.koa.listen()).get('/').expect({
              __: true,
              __l: true
            }, done);
          });
        });
      });
      // Express
      describe('express', function() {
        app.express.use(wrap.express());
        app.express.use(function(req, res) {
          res.send({
            __: !_.isUndefined(req.__) || false,
            __l: !_.isUndefined(req.__l) || false
          });
        });

        describe('\'__\' , \'__l\'', function() {
          it('should exist', function(done) {
            request(app.express).get('/').expect({
              __: true,
              __l: true
            }, done);
          });
        });
      });
      // Hapi
      describe('hapi', function() {
        app.hapi.connection({
          port: 3000
        });
        app.hapi.register(wrap.hapi(), function() {});
        describe('\'__\' , \'__l\'', function() {
          it('should exist', function(done) {
            app.hapi.inject('/', function(res) {
              assert.isDefined(res.request.__);
              assert.isDefined(res.request.__l);
              done();
            });
          });
        });
      });
    });
    //Parser tests
    describe('parser', function() {
      // Koa
      describe('koa', function() {
        describe('notations', function() {
          describe('phrase', function() {
            var k = new koa();
            // Set wrapper
            k.use(unrouted.koa());
            k.use(function*(next) {
              var __ = this.__;
              this.body = {
                result: [
                  // Basic phrase
                  __('Hello'),
                  // Basic phrase with sprintf
                  __('Hello %s', 'John'),
                  // Advanced phrase with sprintf
                  __('Hello %s, my name is %s', 'Luke', 'John'),
                  // Advanced phrase with interpolation
                  __('Hello {{name}}, my name is ' +
                    '{{my.firstname}} {{my.lastname}}', {
                      name: 'John',
                      my: {
                        firstname: 'Luke',
                        lastname: 'Skywalker'
                      }
                    })

                ]
              };
              yield next;
            });
            it('should output correctly', function(done) {
              request(k.listen()).get('/').expect({
                result: [
                  'Hello',
                  'Hello John',
                  'Hello Luke, my name is John',
                  'Hello John, my name is Luke Skywalker'
                ]
              }, done);
            });
          });
          describe('bracket', function() {
            var k = new koa();
            // Set wrapper
            k.use(unrouted.koa());
            k.use(function*(next) {
              var __ = this.__;
              this.body = {
                result: [
                  // Basic bracket
                  __('[Hello]'),
                  // Basic bracket with dots
                  __('[greeting.informal.basic]'),
                  // Advanced bracket with dot key
                  __('[greeting.informal.advanced].hey')
                ]
              };
              yield next;
            });
            it('should output correctly', function(done) {
              request(k.listen()).get('/').expect({
                result: [
                  'Hello',
                  'Hey',
                  'Hey',
                ]
              }, done);
            });
          });
          describe('dot', function() {
            var k = new koa();
            // Set wrapper
            k.use(unrouted.koa());
            k.use(function*(next) {
              var __ = this.__;
              this.body = {
                result: [
                  // Dot notation
                  __('greeting.informal')
                ]
              };
              yield next;
            });
            it('should output correctly', function(done) {
              request(k.listen()).get('/').expect({
                result: [
                  'Hey',
                ]
              }, done);
            });
          });
          describe('message format', function() {
            var k = new koa();
            // Set wrapper
            k.use(unrouted.koa());
            k.use(function*(next) {
              var __ = this.__;
              this.body = {
                result: [
                  // Dot notation
                  __('msgformat.photos', {
                    parser: 'format'
                  }, {
                    numPhotos: 1000
                  })
                ]
              };
              yield next;
            });
            it('should output correctly', function(done) {
              request(k.listen()).get('/').expect({
                result: [
                  'You have 1,000 photos.'
                ]
              }, done);
            });
          });
        });
        describe('router', function() {
          var route = function*(next) {
            var __ = this.__;
            this.body = {
              result: [
                // Route
                __('Hello'),
                // Global
                __('Hello world!')
              ]
            };
            yield next;
          };
          router.get('/', route);
          router.get('/about', route);
          router.get('/api/v1.0', route);
          describe('routed', function() {
            var k = koa();
            k.use(routed.koa());
            k.use(router.routes());
            describe('request \'/\'', function() {
              it('should output correctly', function(done) {
                request(k.listen()).get('/').expect({
                  result: [
                    'Hello',
                    'Hello world!'
                  ]
                }, done);
              });
              it('should output correctly in Japanese', function(done) {
                request(k.listen()).get('/')
                  .set('Accept-Language', 'ja').expect({
                    result: [
                      'こんにちは',
                      'こんにちは！'
                    ]
                  }, done);
              });
            });

            describe('request \'/about\'', function() {
              it('should output correctly', function(done) {
                request(k.listen()).get('/about').expect({
                  result: [
                    'Hello',
                    'Hello world!'
                  ]
                }, done);
              });
              it('should output correctly in Japanese', function(done) {
                request(k.listen()).get('/about')
                  .set('Accept-Language', 'ja').expect({
                    result: [
                      'こんにちは',
                      'こんにちは！'
                    ]
                  }, done);
              });
            });

            describe('request \'/api/v1.0\'', function() {
              it('should output correctly', function(done) {
                request(k.listen()).get('/api/v1.0').expect({
                  result: [
                    'Hello',
                    'Hello world!'
                  ]
                }, done);
              });
              it('should output correctly in Japanese', function(done) {
                request(k.listen()).get('/api/v1.0')
                  .set('Accept-Language', 'ja').expect({
                    result: [
                      'こんにちは',
                      'こんにちは！'
                    ]
                  }, done);
              });
            });
          });

          describe('unrouted', function() {
            var k = koa();
            k.use(unrouted.koa());
            k.use(route);
            describe('request \'/\'', function() {
              it('should output correctly', function(done) {
                request(k.listen()).get('/').expect({
                  result: [
                    'Hello',
                    ''
                  ]
                }, done);
              });
              it('should output correctly in Japanese', function(done) {
                request(k.listen()).get('/')
                  .set('Accept-Language', 'ja').expect({
                    result: [
                      'こんにちは',
                      ''
                    ]
                  }, done);
              });
            });
          });
        });
      });
      // Express
      describe('express', function() {
        describe('router', function() {
          var route = function(req, res) {
            var __ = req.__;
            var body = {
              result: [
                // Route
                __('Hello'),
                // Global
                __('Hello world!')
              ]
            };
            res.send(body);
          };

          describe('routed', function() {
            var e = express();
            e.use(routed.express());
            e.get('/', route);
            e.get('/about', route);
            e.get('/api/v1.0', route);
            describe('request \'/\'', function() {
              it('should output correctly', function(done) {
                request(e).get('/').expect({
                  result: [
                    'Hello',
                    'Hello world!'
                  ]
                }, done);
              });
              it('should output correctly in Japanese', function(done) {
                request(e).get('/')
                  .set('Accept-Language', 'ja').expect({
                    result: [
                      'こんにちは',
                      'こんにちは！'
                    ]
                  }, done);
              });
            });

            describe('request \'/about\'', function() {
              it('should output correctly', function(done) {
                request(e).get('/about').expect({
                  result: [
                    'Hello',
                    'Hello world!'
                  ]
                }, done);
              });
              it('should output correctly in Japanese', function(done) {
                request(e).get('/about')
                  .set('Accept-Language', 'ja').expect({
                    result: [
                      'こんにちは',
                      'こんにちは！'
                    ]
                  }, done);
              });
            });

            describe('request \'/api/v1.0\'', function() {
              it('should output correctly', function(done) {
                request(e).get('/api/v1.0').expect({
                  result: [
                    'Hello',
                    'Hello world!'
                  ]
                }, done);
              });
              it('should output correctly in Japanese', function(done) {
                request(e).get('/api/v1.0')
                  .set('Accept-Language', 'ja').expect({
                    result: [
                      'こんにちは',
                      'こんにちは！'
                    ]
                  }, done);
              });
            });
          });

          describe('unrouted', function() {
            var e = express();
            e.use(unrouted.express());
            e.use('/', route);
            describe('request \'/\'', function() {
              it('should output correctly', function(done) {
                request(e).get('/').expect({
                  result: [
                    'Hello',
                    ''
                  ]
                }, done);
              });
              it('should output correctly in Japanese', function(done) {
                request(e).get('/')
                  .set('Accept-Language', 'ja').expect({
                    result: [
                      'こんにちは',
                      ''
                    ]
                  }, done);
              });
            });
          });
        });
      });
      // Hapi
      describe('hapi', function() {

        // Set up Hapi
        var hapiRouted = new hapi.Server();
        hapiRouted.connection({
          port: 3001
        });
        var hapiUnrouted = new hapi.Server();
        hapiUnrouted.connection({
          port: 3002
        });

        describe('router', function() {
          var handler = function(request, reply) {
            var __ = request.__;
            reply({
              result: [
                // Route
                __('Hello'),
                // Global
                __('Hello world!')
              ]
            });
          };
          var route = {
            method: 'GET',
            path: '/',
            handler: handler
          };

          var routes = [
            route, {
              method: 'GET',
              path: '/about',
              handler: handler
            }, {
              method: 'GET',
              path: '/api/v1.0',
              handler: handler
            }
          ];

          describe('routed', function() {
            hapiRouted.register(routed.hapi(), function() {});
            hapiRouted.route(routes);
            hapiRouted.start(function() {});
          });

          describe('unrouted', function() {
            hapiUnrouted.register(unrouted.hapi(), function() {});
            hapiUnrouted.route(route);
            hapiUnrouted.start(function() {});
            describe('request \'/\'', function() {
              it('should output correctly', function(done) {
                hapiUnrouted.inject('/', function(res) {
                  assert.deepEqual(JSON.parse(res.payload), {
                    result: [
                      'Hello',
                      ''
                    ]
                  });

                  done();
                });
              });
              it('should output correctly in Japanese', function(done) {
                hapiUnrouted.inject({
                  method: 'GET',
                  url: '/',
                  headers: {
                    'Accept-Language': 'ja',
                  }
                }, function(res) {
                  assert.deepEqual(JSON.parse(res.payload), {
                    result: [
                      'こんにちは',
                      ''
                    ]
                  });

                  done();
                });
              });
            });
          });
        });
      });
    });
  });
});
