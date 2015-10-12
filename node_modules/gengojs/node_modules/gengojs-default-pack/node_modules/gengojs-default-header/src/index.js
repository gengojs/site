/**
 * gengojs-default-plugin
 * A gengojs plugin for [gengojs-accept](http://gengojs.github.io/accept/index.html)
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _gengojsAccept = require('gengojs-accept');

var _gengojsAccept2 = _interopRequireDefault(_gengojsAccept);

var _gengojsDebug = require('gengojs-debug');

var _gengojsDebug2 = _interopRequireDefault(_gengojsDebug);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var log = (0, _gengojsDebug2['default'])('header');
/**
 * @class Header
 */

var Header = (function () {
  /**
   * @constructor
   * @param {object} request - The request object
   * @param {object} options - The options object
   */

  function Header(request, options) {
    _classCallCheck(this, Header);

    // Debug
    log.debug('header', 'debug', 'class: ' + Header.name, 'process: constructor').debug('request exists: ' + !!request).debug('options exists: ' + !!options).debug('gengojs-accept exists: ' + !!(this.header = (0, _gengojsAccept2['default'])(request, options))).debug('locale: ' + (this.locale = this.header.getLocale()));
  }

  /**
   * Parses the Accept-Launguage from the header
   * @param {object} [request] - The request object
   * @returns {string} - The parsed Accept-Language
   */

  _createClass(Header, [{
    key: 'getAcceptLanguge',
    value: function getAcceptLanguge() {
      log.debug('class: ' + Header.name, 'process: ' + this.getAcceptLanguge.name);

      this.locale = this.header.getAcceptLanguage.apply(this.header, arguments);

      log.info('locale: ' + this.locale);
      return this.locale;
    }

    /**
     * Returns the current locale
     * @returns {string} - The current locale
     */
  }, {
    key: 'getLocale',
    value: function getLocale() {
      log.debug('class: ' + Header.name, 'process: ' + this.getLocale.name);

      this.locale = this.header.getLocale.apply(this.header, arguments);

      log.info('locale: ' + this.locale);
      return this.locale;
    }

    /**
     * Sets the current locale
     * @param {string} - The locale to override
     * @returns {string} - The current locale
     */
  }, {
    key: 'setLocale',
    value: function setLocale() {
      log.debug('class: ' + Header.name, 'process: ' + this.setLocale.name);

      this.locale = this.header.setLocale.apply(this.header, arguments);

      log.info('locale: ' + this.locale);
      return this.locale;
    }

    /**
     * Parses the Accept-Language from the header and extracts the locale
     * @param {object} [request] - The request object
     * @param {string} [fallback] - The locale to fallback
     * @returns {string} - The parsed locale
     */
  }, {
    key: 'getFromHeader',
    value: function getFromHeader() {
      log.debug('class: ' + Header.name, 'process: ' + this.getFromHeader.name);

      this.locale = this.header.getFromHeader.apply(this.header, arguments);

      log.info('locale: ' + this.locale);
      return this.locale;
    }

    /**
     * Parses the query string from the url and extracts the locale
     * @param {object} key - The key of the query string
     * @param {string} [fallback] - The locale to fallback
     * @returns {string} - The parsed locale
     */
  }, {
    key: 'getFromQuery',
    value: function getFromQuery() {
      log.debug('class: ' + Header.name, 'process: ' + this.getFromQuery.name);

      this.locale = this.header.getFromQuery.apply(this.header, arguments);

      log.info('locale: ' + this.locale);
      return this.locale;
    }

    /**
     * Parses the domain from the url and extracts the locale
     * @param {string} [fallback] - The locale to fallback
     * @returns {string} - The parsed locale
     */
  }, {
    key: 'getFromDomain',
    value: function getFromDomain() {
      log.debug('class: ' + Header.name, 'process: ' + this.getFromDomain.name);

      this.locale = this.header.getFromDomain.apply(this.header, arguments);

      log.info('locale: ' + this.locale);
      return this.locale;
    }

    /**
     * Parses the sub-domain from the url and extracts the locale
     * @param {string} [fallback] - The locale to fallback
     * @returns {string} - The parsed locale
     */
  }, {
    key: 'getFromSubDomain',
    value: function getFromSubDomain() {
      log.debug('class: ' + Header.name, 'process: ' + this.getFromSubDomain.name);

      this.locale = this.header.getFromSubDomain.apply(this.header, arguments);

      log.info('locale: ' + this.locale);
      return this.locale;
    }

    /**
     * Parses the cookie from the request object and extracts the locale
     * @param {object} key - The key of the query string
     * @param {string} [fallback] - The locale to fallback
     * @returns {string} - The parsed locale
     */
  }, {
    key: 'getFromCookie',
    value: function getFromCookie() {
      log.debug('class: ' + Header.name, 'process: ' + this.getFromCookie.name);

      this.locale = this.header.getFromCookie.apply(this.header, arguments);

      log.info('locale: ' + this.locale);
      return this.locale;
    }

    /**
     * Parses the url and extracts the locale
     * @param {string} [fallback] - The locale to fallback
     * @returns {string} - The parsed locale
     */
  }, {
    key: 'getFromUrl',
    value: function getFromUrl() {
      log.debug('class: ' + Header.name, 'process: ' + this.getFromUrl.name);

      this.locale = this.header.getFromUrl.apply(this.header, arguments);

      log.info('locale: ' + this.locale);
      return this.locale;
    }

    /**
     * Detects the locale by using the 'detect' options.
     * @param {string} [locale] - The locale to override
     * @returns {string} - The detected locale
     */
  }, {
    key: 'detectLocale',
    value: function detectLocale() {
      log.debug('class: ' + Header.name, 'process: ' + this.detectLocale.name);

      this.locale = this.header.detectLocale.apply(this.header, arguments);

      log.info('locale: ' + this.locale);
      return this.locale;
    }
  }]);

  return Header;
})();

exports['default'] = function () {
  'use strict';
  return {
    main: function main(req) {
      var options = this.options.header;
      this.header = new Header(req, options);
    },
    'package': _lodash2['default'].merge({
      type: 'header'
    }, require('../package')),
    defaults: require('../defaults')
  };
};

module.exports = exports['default'];
//# sourceMappingURL=source maps/index.js.map
