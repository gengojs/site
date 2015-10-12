/**
 * @author Takeshi Iwana aka iwatakeshi
 * @license MIT 2015
 * gengojs-accept
 * This module parses the accept-language header
 * and returns the approriate locale.
 * Credits to @fundon
 * https://github.com/koa-modules/koa-locale/blob/master/index.js
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _cookie = require('cookie');

var _cookie2 = _interopRequireDefault(_cookie);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/**
 * @class Accept
 */

var Accept = (function () {
  /**
   * Initializes Accept.
   * @param  {object} req  The request object.
   * @param  {object} options The options to configure accept.
   * @return {Accept}     The Accept instance.
   * @private
   */

  function Accept(req, options) {
    _classCallCheck(this, Accept);

    this.override = false;
    //set options
    this._options(options);
    if (req) this.set(req);
    return this;
  }

  /** 
   * @export accept
   * The main accept function,
   * @param  {object} req The request object.
   * @param  {object} options The options to configure accept.
   * @return {Accept}     The Accept instance.
   */

  /** 
   * @private
   * Sets Accept.
   * @param {object} req The request object.
   * @private
   */

  _createClass(Accept, [{
    key: 'set',
    value: function set(req) {

      this['accept-language'] = '';
      // Koa?
      if (req.request) {
        this.isKoa = true;
        this.request = req.request;
        this.headers = this.request.header;
        this.cookie = this.headers.cookie || this.headers.cookies;
      } else if (req.raw) {
        // Maybe it's hapi
        this.isHapi = true;
        this.request = req;
        this.headers = this.request.headers;
        this.cookie = this.headers['set-cookie'] || {};
      } else {
        // Then it's express
        this.isKoa = false;
        this.request = req;
        this.headers = this.request.headers;
        this.cookie = this.headers.cookie || this.headers.cookies;
      }
      this.detectLocale();
    }

    /** 
     * @public
     * Parses the headers for the Accept-Language.
     * @param  {object} req The request object.
     * @return {string|undefined}     The parsed Accept-Language.
     */
  }, {
    key: 'getAcceptLanguage',
    value: function getAcceptLanguage(req) {
      if (req) this['accept-language'] = req.header['accept-language'] || req.headers['accept-language'] || '';else this['accept-language'] = this.headers['accept-language'];
      return this['accept-language'] || undefined;
    }

    /**
     * @public
     * Returns the current locale.
     * @return {string} The current locale.
     */
  }, {
    key: 'getLocale',
    value: function getLocale() {
      return this.locale;
    }

    /** 
     * Sets the locale.
     * @param {string} locale The locale to override the current.
     * @public
     */
  }, {
    key: 'setLocale',
    value: function setLocale(locale) {
      this.override = true;
      this.locale = this.isSupported(locale);
      return this.locale;
    }

    // From accept-language, `Accept-Language: ja`
    /**
     * Parses the Accept-Language.
     * @param  {object} req      The request object.
     * @param  {Boolean} fallback Fallback to default.
     * @return {string|string}          The parsed locale.
     * @public
     */
  }, {
    key: 'getFromHeader',
    value: function getFromHeader(req, fallback) {
      this.getAcceptLanguage(req);
      var reg = /(^|,\s*)([a-z-0-9-]+)/gi,
          match,
          result;
      while (match = reg.exec(this['accept-language'])) {
        if (!result) result = match[2];
      }
      if (req) return result || undefined;else {
        this.locale = result = this.isSupported(result);
        return fallback ? result || undefined : result || undefined;
      }
    }

    // From query, 'lang=en'
    /**
     * Parses the query.
     * @param  {string} key      The key for the query.
     * @param  {Boolean} fallback Fallback to default.
     * @return {string|undefined}          The parsed locale.
     * @public
     */
  }, {
    key: 'getFromQuery',
    value: function getFromQuery(key, fallback) {
      var result;
      var query;
      if (this.isKoa || this.isHapi) query = this.request.query;else query = this.request.query || _url2['default'].parse(this.request.url, true).query;
      this.locale = result = this.isSupported(!_lodash2['default'].isEmpty(query) ? query[key] || query[this.options.keys.query] : undefined);
      return fallback ? result || undefined : result || undefined;
    }

    // From domain
    /**
     * Parses the domain.
     * @param  {Boolean} fallback Fallback to default.
     * @return {string|undefined}          The parsed locale.
     * @public
     */
  }, {
    key: 'getFromDomain',
    value: function getFromDomain(fallback) {
      var result,
          hostname = this.request.hostname || this.request.info.hostname;
      result = hostname ? hostname.toString().toLowerCase().trim().split(':')[0].split(/\./gi).reverse()[0] : undefined;
      this.locale = result = this.isSupported(result);
      return fallback ? result || undefined : result || undefined;
    }

    // From subdomain, 'en.gengojs.com'
    /**
     * Parses the subdomain.
     * @param  {Boolean} fallback Fallback to default.
     * @return {string|undefined}          The parsed locale.
     * @public
     */
  }, {
    key: 'getFromSubdomain',
    value: function getFromSubdomain(fallback) {
      var result;
      if (this.isKoa) result = this.request.subdomains[0];else result = this.headers.host.split('.')[0];
      this.locale = result = this.isSupported(result);
      return fallback ? result || undefined : result || undefined;
    }

    // From cookie, 'lang=ja'
    /**
     * Parses the cookie.
     * @param  {string} key      The key for the cookie.
     * @param  {Boolean} fallback Fallback to default.
     * @return {string|undefined}          The parsed locale.
     * @public
     */
  }, {
    key: 'getFromCookie',
    value: function getFromCookie(key, fallback) {
      var result;
      result = this.cookie ? _cookie2['default'].parse(this.cookie)[key] || _cookie2['default'].parse(this.cookie)[this.options.keys.cookie] : undefined;
      this.locale = result = this.isSupported(result);
      return fallback ? result || undefined : result || undefined;
    }

    // From URL, 'http://gengojs.com/en'
    /**
     * Parses the url.
     * @param  {Boolean} fallback Fallback to default.
     * @return {string|undefined}          The parsed locale.
     * @public
     */
  }, {
    key: 'getFromUrl',
    value: function getFromUrl(fallback) {
      var result,
          path = this.request.path || this.request.url.path;
      this.locale = result = this.isSupported(path ? path.substring(1).split('/').shift() : '');
      return fallback ? result || undefined : result || undefined;
    }

    // From all, when specified in options
    /**
     * Parses the locale by the specified type of parsing.
     * @param {string} locale The locale to override.
     * @return {string} The parsed locale.
     * @public
     */
  }, {
    key: 'detectLocale',
    value: function detectLocale(locale) {
      _lodash2['default'].forEach(this.options.detect, function (value, key) {
        switch (key) {
          case 'header':
            if (value && !this.override) this.locale = this.getFromHeader();
            break;
          case 'cookie':
            if (value && !this.override) this.locale = this.getFromCookie(this.options.keys.cookie);
            break;
          case 'url':
            if (value && !this.override) this.locale = this.getFromUrl();
            break;
          case 'domain':
            if (value && !this.override) this.locale = this.getFromDomain();
            break;
          case 'subdomain':
            if (value && !this.override) this.locale = this.getFromSubdomain();
            break;
          case 'query':
            if (value && !this.override) this.locale = this.getFromQuery(this.options.keys.query);
            break;
        }
      }, this);

      // override?
      if (locale) this.locale = this.isSupported(locale) || this.locale;
      // reset the override
      if (this.override) this.override = false;

      return this.locale;
    }

    /**
     * @private
     * Sets the options.
     * @param  {object} options The options.
     */
  }, {
    key: '_options',
    value: function _options(options) {
      this.options = _lodash2['default'].defaults(options || {}, {
        check: true,
        'default': 'en-US',
        supported: ['en-US'],
        keys: _lodash2['default'].defaults(options ? options.keys ? options.keys : {} : {}, {
          cookie: 'locale',
          query: 'locale'
        }),
        detect: _lodash2['default'].defaults(options ? options.detect ? options.detect : {} : {}, {
          header: true,
          cookie: false,
          query: false,
          url: false,
          domain: false,
          subdomain: false
        })
      });
    }

    /**
     * @public
     * Checks if the result is supported.
     * @param  {string} result The locale to check
     * @return {string}        The locale.
     * @private
     */
  }, {
    key: 'isSupported',
    value: function isSupported(result) {
      if (this.options.check) {
        var index = this.options.supported.indexOf(result);
        var locale = this.options.supported[index];
        locale = locale ? locale : this.options['default'];
        return locale;
      } else return result;
    }
  }]);

  return Accept;
})();

exports['default'] = function (req, options) {
  'use strict';
  return new Accept(req, options);
};

module.exports = exports['default'];
//# sourceMappingURL=source maps/index.js.map