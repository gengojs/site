var accept = require('../../');
var request = require('supertest');
var chai = require('chai');
chai.config.includeStack = true;
var assert = chai.assert;

describe('express', function() {
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
    var a = require('../../express/');
    var express = require('express');
    var app = express();
    app.use(a());
    app.get('/', function(req, res) {
      res.send({
        result: req.accept.getFromHeader()
      });
    });

    it('should === "en-US"', function(done) {
      request(app)
        .get('/')
        .set('Accept-Language', 'en-US')
        .expect(function(res) {
          assert.strictEqual(res.body.result, 'en-US');
        })
        .end(done);

    });
  });

  describe('getLocale()', function() {
    describe('options', function() {
      describe('default', function() {
        var express = require('express');
        var app = express();
        app.use(function(req, res, next) {
          var result = accept(req).getLocale();
          res.send({
            result: result
          });
        });
        app.get('/');
        it('should === "en-US"', function(done) {
          request(app)
            .get('/')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'en-US');

            })
            .end(done);
        });

        it('should fallback to "en-US"', function(done) {
          request(app)
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
        var express = require('express');
        var app = express();

        app.use(function(req, res, next) {
          var options = {
            supported: ['en-US', 'ja']
          };
          var result = accept(req, options).getLocale();
          res.send({
            result: result
          });
        });
        app.get('/');

        it('should === "en-US"', function(done) {
          request(app)
            .get('/')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'en-US');

            })
            .end(done);
        });

        it('should === "ja"', function(done) {
          request(app)
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
        var express = require('express');
        var app = express();
        app.use(function(req, res) {
          var result = accept(req);
          var set = result.setLocale('en');
          var detect = result.detectLocale();
          res.send({
            result: {
              set: set,
              detect: detect
            }
          });
        });

        it('should === "en-US"', function(done) {
          request(app)
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
          request(app)
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
        var express = require('express');
        var app = express();

        app.use(function(req, res) {
          var options = {
            supported: ['en-US', 'ja']
          };
          var result = accept(req, options);
          var set = result.setLocale('ja');
          var detect = result.detectLocale();
          res.send({
            result: {
              set: set,
              detect: detect
            }
          });
        });

        it('should === "ja"', function(done) {
          request(app)
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
        var express = require('express');
        var app = express();
        app.use(function(req, res, next) {
          var result = accept(req).getFromQuery('locale');
          res.send({
            result: result
          });
        });
        app.get('/');

        it('should === "en-US"', function(done) {
          request(app)
            .get('/?locale=en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'en-US');

            })
            .end(done);
        });

        it('should !== "en"', function(done) {
          request(app)
            .get('/?locale=en')
            .expect(function(res) {
              var body = res.body;
              assert.notStrictEqual(body.result, 'en');

            })
            .end(done);
        });
      });
      describe('configured', function() {
        var express = require('express');
        var app = express();
        app.use(function(req, res, next) {
          var result = accept(req, {
            default: 'ja',
            supported: ['en-US', 'en']
          }).getFromQuery('locale', true);
          res.send({
            result: result
          });
        });
        app.get('/');
        it('should === "en"', function(done) {
          request(app)
            .get('/?locale=en')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'en');

            })
            .end(done);
        });

        it('should fallback to "ja"', function(done) {
          request(app)
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
    var express = require('express');
    var app = express();
    app.use(function(req, res, next) {
      var result = accept(req).getAcceptLanguage();
      res.send({
        result: result
      });
    });

    app.get('/');

    it('should include "en-US"', function(done) {
      request(app)
        .get('/')
        .set('Accept-Language', 'en-US')
        .expect(function(res) {
          var body = res.body;
          assert.include(body.result, "en-US");

        })
        .end(done);
    });

    it('should include "ja"', function(done) {
      request(app)
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
        var express = require('express');
        var app = express();
        var subdomainOptions = {
          base: 'localhost.com' //base is required, you'll get an error without it.
        };

        app.use(require('subdomain')(subdomainOptions));
        app.use(function(req, res, next) {
          var result = accept(req, null, true).getFromDomain();
          res.send({
            result: result
          });
        });
        app.get('/');

        it('should !== "en"', function(done) {
          request(app)
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
          request(app)
            .get('/api/:localhost')
            .set('host', 'api.localhost.ja')
            .set('Accept-Language', 'en-US')

          .expect(function(res) {
            var body = res.body;
            assert.notStrictEqual(body.result, 'ja');

          })
            .end(done);
        });
      });
      describe('configured', function() {
        var express = require('express');
        var app = express();
        var subdomainOptions = {
          base: 'localhost.com' //base is required, you'll get an error without it.
        };

        app.use(require('subdomain')(subdomainOptions));
        app.use(function(req, res, next) {
          var options = {
            supported: ['en-US', 'ja', 'en']
          };
          var result = accept(req, options).getFromDomain();
          res.send({
            result: result
          });
        });
        app.get('/');

        it('should === "en"', function(done) {
          request(app)
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
          request(app)
            .get('/ja/:localhost')
            .set('host', 'ja.localhost.ja')
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
        var express = require('express');
        var app = express();
        var subdomainOptions = {
          base: 'localhost.com' //base is required, you'll get an error without it.
        };

        app.use(require('subdomain')(subdomainOptions));
        app.use(function(req, res, next) {
          var result = accept(req, null, true).getFromSubdomain();
          res.send({
            result: result
          });
        });
        app.get('/');

        it('should !== "en"', function(done) {
          request(app)
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
          request(app)
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
        var express = require('express');
        var app = express();
        var subdomainOptions = {
          base: 'localhost.com' //base is required, you'll get an error without it.
        };

        app.use(require('subdomain')(subdomainOptions));
        app.use(function(req, res, next) {
          var options = {
            supported: ['en-US', 'ja', 'en']
          };
          var result = accept(req, options).getFromSubdomain();
          res.send({
            result: result
          });
        });
        app.get('/');

        it('should === "en"', function(done) {
          request(app)
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
          request(app)
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
        var express = require('express');
        var app = express();

        app.use(function(req, res, next) {
          var result = accept(req).getFromUrl();
          res.send({
            result: result
          });
        });
        app.get('/');
        app.get('/ja');

        it('should === "en-US"', function(done) {
          request(app)
            .get('/')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, "en-US");
            }).end(done);

        });

        it('should === "en-US"', function(done) {
          request(app)
            .get('/ja')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, "en-US");

            }).end(done);
        });
      });
      describe('configured', function() {
        var express = require('express');
        var app = express();

        app.use(function(req, res, next) {
          var result = accept(req, {
            supported: ['en-US', 'ja']
          }).getFromUrl();

          res.send({
            result: result
          });
        });
        app.get('/');
        app.get('/ja');

        it('should === "en-US"', function(done) {
          request(app)
            .get('/')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, "en-US");
            }).end(done);

        });

        it('should === "ja"', function(done) {
          request(app)
            .get('/ja')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, "ja");

            }).end(done);
        });

        it('should === "en-US"', function(done) {
          request(app)
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
        var express = require('express');
        var app = express();
        var cookieParser = require('cookie-parser');
        app.use(cookieParser());

        app.use(function(req, res, next) {
          var result = accept(req).getFromCookie('locale');
          res.send({
            result: result
          });
        });
        app.get('/');

        it('should !== "ja"', function(done) {
          request(app)
            .get('/')
            .set('cookie', 'locale=ja')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.notStrictEqual(body.result, "ja");
            }).end(done);

        });
      });
      describe('configured', function() {
        var express = require('express');
        var app = express();
        var cookieParser = require('cookie-parser');
        app.use(cookieParser());

        app.use(function(req, res, next) {
          var result = accept(req, {
            supported: ['en-US', 'ja'],
            default: 'en'
          }).getFromCookie('locale');
          res.send({
            result: result
          });
        });
        app.get('/');

        it('should === "ja"', function(done) {
          request(app)
            .get('/')
            .set('cookie', 'locale=ja')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, "ja");
            }).end(done);
        });

        it('should === "ja"', function(done) {
          request(app)
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
        var express = require('express');
        var app = express();
        var cookieParser = require('cookie-parser');
        app.use(cookieParser());

        app.use(function(req, res, next) {
          var result = accept(req).detectLocale();
          res.send({
            result: result
          });
        });
        app.get('/');

        it('should === "en-US"', function(done) {
          request(app)
            .get('/')
            .set('cookie', 'locale=ja')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, 'en-US');
            }).end(done);

        });

        it('should !== "ja"', function(done) {
          request(app)
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
        var express = require('express');
        var app = express();
        var cookieParser = require('cookie-parser');
        app.use(cookieParser());

        app.use(function(req, res, next) {
          var result = accept(req, {
            supported: ['en-US', 'ja'],
            default: 'en',
            detect: {
              header: false,
              url: true
            }
          }).detectLocale();
          res.send({
            result: result
          });
        });
        app.get('/');

        it('should === "en-US"', function(done) {
          request(app)
            .get('/en-US')
            .set('cookie', 'locale=ja')
            .set('Accept-Language', 'en-US')
            .expect(function(res) {
              var body = res.body;
              assert.strictEqual(body.result, "en-US");
            }).end(done);

        });

        it('should === "en"', function(done) {
          request(app)
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