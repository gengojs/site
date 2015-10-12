/* global describe, it */
var accept = require('../../');
var request = require('supertest');
var assert = require('chai').assert;

function subdomain(options) {

  // options?
  options = options || {};

  if (!options.base) {
    throw new Error('options.base required!');
  } else {
    options.removeWWW = options.removeWWW || false;
    options.debug = options.debug || false;
    options.ignoreWWW = options.ignoreWWW || false;
    options.prefix = options.prefix || 'subdomain';
  }

  // return middleware
  return function * (next) {

    // get host & protocol
    var host = this.request.headers.host,
      protocol = this.request.socket.encrypted ? 'https' : 'http';

    // remove 'www' prefix from URL? (tacky, right?)
    if (options.removeWWW === true) {
      if (/^www/.test(host)) {
        return this.response.redirect(protocol + '://' + host.replace(/^www\./, '') + this.request.url);
      }
    }

    // subdomain specific middleware
    if (host === options.base || host === 'localhost:8000' || (options.ignoreWWW && /^www\./.test(host))) {
      // not a subdomain or ignoring www subdomain
      yield next;
    } else {
      // test for subdomain
      var matches = host.match(new RegExp('(.*)\.' + options.base));
      // subdomain
      if (matches && matches.length === 2) {
        this.request.url = '/' + options.prefix + '/' + matches[1] + this.request.url;
        yield next;
      } else {
        yield next;
      }
    }
  };
}

describe('koa', function() {
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
      describe('default', function() {
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
    var koa = require('koa');
    var app = koa();
    var route = require('koa-route');

    var a = require('../../koa/');
    app.use(a());
    app.use(function * () {
      this.body = {
        result: this.accept? 
        this.accept.getFromHeader() :
        this.request.accept.getFromHeader()
      };
    });
    describe('request "/"', function() {
      it('should === "en-US"', function(done) {
        request(app.listen())
          .get('/')
          .set('Accept-Language', 'en-US')
          .expect(function(res) {
            var body = res.body;
            assert.strictEqual(body.result, 'en-US');
          })
          .end(done);
      });
    });
  });

  describe('getLocale()', function() {
    describe('options', function() {
      describe('default', function() {
        var koa = require('koa');
        var app = koa();
        app.use(function * () {
          var result = accept(this).getLocale();
          this.body = {
            result: result
          };

        });
        it('should === "en-US"', function(done) {
          request(app.listen())
            .get('/')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'en-US');

            })
            .end(done);
        });

        it('should fallback to "en-US" (default)', function(done) {
          request(app.listen())
            .get('/')
            .set('Accept-Language', 'ja')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'en-US');

            })
            .end(done);
        });
      });
      describe('configured', function() {
        var koa = require('koa');
        var app = koa();

        app.use(function * (next) {
          var options = {
            supported: ['en-US', 'ja']
          };
          var result = accept(this, options).getLocale();
          this.body = {
            result: result
          };
          yield next;
        });

        it('should === "en-US"', function(done) {
          request(app.listen())
            .get('/')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'en-US');

            })
            .end(done);
        });

        it('should === "ja"', function(done) {
          request(app.listen())
            .get('/')
            .set('Accept-Language', 'ja')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'ja');
            })
            .end(done);
        });
      });
    });
  });
  describe('setLocale()', function() {
    describe('options', function() {
      describe('default', function() {
        var koa = require('koa');
        var app = koa();
        app.use(function * () {
           var result = accept(this);
          var set = result.setLocale('en');
          var detect = result.detectLocale();
          this.body = {
            result: {
                set:set,
                detect:detect
            }
          };
        });

        it('should === "en-US"', function(done) {
          request(app.listen())
            .get('/')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result.set, 'en-US');
              assert.strictEqual(body.result.detect, 'en-US');

            })
            .end(done);

        });

        it('should fallback to "en-US" (default)', function(done) {
          request(app.listen())
            .get('/')
            .set('Accept-Language', 'ja')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result.set, 'en-US');
              assert.strictEqual(body.result.detect, 'en-US');

            })
            .end(done);
        });
      });
      describe('configured', function() {
        var koa = require('koa');
        var app = koa();

        app.use(function * (next) {
          var options = {
            supported: ['en-US', 'ja']
          };
          var result = accept(this, options);
          var set = result.setLocale('ja');
          var detect = result.detectLocale();
          this.body = {
            result: {
                set:set,
                detect:detect
            }
          };
          yield next;
        });

        it('should === "ja"', function(done) {
          request(app.listen())
            .get('/')
            .set('Accept-Language', 'ja')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result.set, 'ja');
              assert.strictEqual(body.result.detect, 'ja');

            })
            .end(done);
        });
      });
    });
  });

  describe('getFromQuery()', function() {
    describe('options', function() {
      describe('default', function() {
        var koa = require('koa');
        var app = koa();
        app.use(function * (next) {
          var result = accept(this).getFromQuery('locale');
          this.body = {
            result: result
          };
          yield next;
        });
        it('should !== "en"', function(done) {
          request(app.listen())
            .get('/?locale=en')
            .expect(function(res) {
              var body = res.body;
              assert.notStrictEqual(body.result, 'en');

            })
            .end(done);
        });

        it('should fallback to "en-US" (default)', function(done) {
          request(app.listen())
            .get('/en')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'en-US');

            })
            .end(done);
        });
      });
      describe('configured', function() {
        var koa = require('koa');
        var app = koa();
        app.use(function * (next) {
          var result = accept(this, {
            default: 'ja',
            supported: ['en-US', 'en']
          }).getFromQuery('locale');
          this.body = {
            result: result
          };
          yield next;
        });

        it('should === "en"', function(done) {
          request(app.listen())
            .get('/?locale=en')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'en');

            })
            .end(done);
        });

        it('should fallback to "ja"', function(done) {
          request(app.listen())
            .get('/')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'ja');
            })
            .end(done);
        });
      });
    });
  });
  describe('getAcceptLanguage()', function() {
    var koa = require('koa');
    var app = koa();
    app.use(function * (next) {
      var result = accept(this).getAcceptLanguage();
      this.body = {
        result: result
      };
      yield next;
    });

    it('should include "en-US"', function(done) {
      request(app.listen())
        .get('/')
        .set('Accept-Language', 'en-US')
        .expect(function(res) {
          var body = res.body;
          assert.include(body.result, "en-US");

        })
        .end(done);
    });

    it('should include "ja"', function(done) {
      request(app.listen())
        .get('/')
        .set('Accept-Language', 'ja')
        .expect(function(res) {
          var body = res.body;
          assert.include(body.result, "ja");

        })
        .end(done);
    });
  });

  describe('getFromDomain()', function() {
    describe('options', function() {
      describe('default', function() {
        var koa = require('koa');
        var app = koa();
        var subdomainOptions = {
          base: 'localhost.com' //base is required, you'll get an error without it.
        };

        app.use(subdomain(subdomainOptions));
        app.use(function * (next) {
          var result = accept(this).getFromDomain();
          this.body = {
            result: result
          };
          yield next;
        });

        it('should !== "en"', function(done) {
          request(app.listen())
            .get('/api/:localhost')
            .set('Host', 'api.localhost.com')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.notStrictEqual(body.result, 'en');

            })
            .end(done);
        });

        it('should !== "ja"', function(done) {
          request(app.listen())
            .get('/api/:localhost')
            .set('host', 'api.localhost.en')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.notStrictEqual(body.result, 'ja');
            })
            .end(done);
        });
      });
      describe('configured', function() {
        var koa = require('koa');
        var app = koa();
        var subdomainOptions = {
          base: 'localhost.com' //base is required, you'll get an error without it.
        };

        app.use(subdomain(subdomainOptions));
        app.use(function * (next) {
          var options = {
            supported: ['en-US', 'ja'],
            default: 'en'
          };
          var result = accept(this, options).getFromDomain();
          this.body = {
            result: result
          };
          yield next;
        });

        it('should === "en"', function(done) {
          request(app.listen())
            .get('/api/:localhost')
            .set('Host', 'api.localhost.en')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'en');

            })
            .end(done);
        });

        it('should === "ja"', function(done) {
          request(app.listen())
            .get('/api/:localhost')
            .set('host', 'api.localhost.ja')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'ja');

            })
            .end(done);
        });
      });
    });
  });

  describe('getFromSubdomain()', function() {
    describe('options', function() {
      describe('default', function() {
        var koa = require('koa');
        var app = koa();
        var subdomainOptions = {
          base: 'localhost.com' //base is required, you'll get an error without it.
        };

        app.use(subdomain(subdomainOptions));
        app.use(function * (next) {
          var result = accept(this).getFromSubdomain;
          this.body = {
            result: result
          };
          yield next;
        });

        it('should !== "en"', function(done) {
          request(app.listen())
            .get('/en/:localhost')
            .set('Host', 'en.localhost.com')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.notStrictEqual(body.result, 'en');

            })
            .end(done);
        });

        it('should !== "ja"', function(done) {
          request(app.listen())
            .get('/ja/:localhost')
            .set('host', 'ja.localhost.com')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.notStrictEqual(body.result, 'ja');

            })
            .end(done);
        });
      });
      describe('configured', function() {
        var koa = require('koa');
        var app = koa();
        var subdomainOptions = {
          base: 'localhost.com' //base is required, you'll get an error without it.
        };

        app.use(subdomain(subdomainOptions));
        app.use(function * (next) {
          var options = {
            supported: ['en-US', 'ja'],
            default: 'en'
          };
          var result = accept(this, options).getFromSubdomain();
          this.body = {
            result: result
          };
          yield next;
        });

        it('should === "en"', function(done) {
          request(app.listen())
            .get('/en/:localhost')
            .set('Host', 'en.localhost.com')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'en');

            })
            .end(done);
        });

        it('should === "ja"', function(done) {
          request(app.listen())
            .get('/ja/:localhost')
            .set('host', 'ja.localhost.com')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'ja');

            })
            .end(done);
        });
      });
    });
  });

  describe('getFromUrl()', function() {
    describe('options', function() {
      describe('default', function() {
        var koa = require('koa');
        var app = koa();

        app.use(function * (next) {
          var result = accept(this).getFromUrl();
          this.body = {
            result: result
          };
          yield next;
        });

        it('should === "en-US"', function(done) {
          request(app.listen())
            .get('/')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, "en-US");
            }).end(done);

        });

        it('should === "en-US"', function(done) {
          request(app.listen())
            .get('/ja')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, "en-US");

            }).end(done);
        });
      });
      describe('configured', function() {
        var koa = require('koa');
        var app = koa();

        app.use(function * (next) {
          var result = accept(this, {
            supported: ['en-US', 'ja']
          }).getFromUrl();
          this.body = {
            result: result
          };
          yield next;
        });

        it('should === "en-US"', function(done) {
          request(app.listen())
            .get('/')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, "en-US");
            }).end(done);

        });

        it('should === "ja"', function(done) {
          request(app.listen())
            .get('/ja')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, "ja");

            }).end(done);
        });

        it('should === "en-US"', function(done) {
          request(app.listen())
            .get('/fr')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, "en-US");

            }).end(done);
        });
      });
    });

  });

  describe('getFromCookie()', function() {
    describe('options', function() {
      describe('default', function() {
        var koa = require('koa');
        var app = koa();

        app.use(function * (next) {
          var result = accept(this).getFromCookie('locale');
          this.body = {
            result: result
          };
          yield next;
        });

        it('should !== "ja"', function(done) {
          request(app.listen())
            .get('/')
            .set('Cookie', 'locale=ja')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.notStrictEqual(body.result, "ja");
            }).end(done);

        });

        it('should !== "ja"', function(done) {
          request(app.listen())
            .get('/')
            .set('Cookie', 'locale=ja')
            .set('Accept-Language', 'ja')
            .expect(function(res) {
              var body = res.body;
              assert.notStrictEqual(body.result, "ja");

            }).end(done);
        });
      });
      describe('configured', function() {
        var koa = require('koa');
        var app = koa();

        app.use(function * (next) {
          var result = accept(this, {
            supported: ['en-US', 'ja'],
            default: 'en'
          }).getFromCookie('locale');
          this.body = {
            result: result
          };
          yield next;
        });


        it('should === "ja"', function(done) {
          request(app.listen())
            .get('/')
            .set('cookie', 'locale=ja')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, "ja");
            }).end(done);

        });

        it('should === "ja"', function(done) {
          request(app.listen())
            .get('/')
            .set('cookie', 'locale=ja')
            .set('Accept-Language', 'ja')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, "ja");
            }).end(done);
        });
      });
    });
  });
  describe('detectLocale()', function() {
    describe('options', function() {
      describe('default', function() {
        var koa = require('koa');
        var app = koa();

        app.use(function * (next) {
          var result = accept(this).detectLocale();
          this.body = {
            result: result
          };
          yield next;
        });

        it('should === "en-US"', function(done) {
          request(app.listen())
            .get('/')
            .set('cookie', 'locale=ja')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'en-US');
            }).end(done);

        });

        it('should !== "ja"', function(done) {
          request(app.listen())
            .get('/')
            .set('cookie', 'locale=ja')
            .set('Accept-Language', 'ja')
            .expect(function(res) {
              var body = res.body;
              assert.notStrictEqual(body.result, "ja");

            }).end(done);
        });
      });
      describe('configured', function() {
        var koa = require('koa');
        var app = koa();

        app.use(function * (next) {
          var result = accept(this, {
            supported: ['en-US', 'ja'],
            default: 'en',
            detect: {
              header: false,
              url: true
            }
          }).detectLocale();
          this.body = {
            result: result
          };
          yield next;
        });

        it('should === "en-US"', function(done) {
          request(app.listen())
            .get('/en-US')
            .set('cookie', 'locale=ja')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, "en-US");
            }).end(done);

        });

        it('should === "en"', function(done) {
          request(app.listen())
            .get('/en')
            .set('cookie', 'locale=ja')
            .set('Accept-Language', 'ja')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, "en");
            }).end(done);
        });
      });
    });
  });
});