/**
 * gengojs-default-plugin
 * A gengojs plugin for [gengojs-accept](http://gengojs.github.io/accept/index.html)
 */
import accept from 'gengojs-accept';
import debug from 'gengojs-debug';
import _ from 'lodash';
var log = debug('header');
/**
 * @class Header
 */
class Header {
  /**
   * @constructor
   * @param {object} request - The request object
   * @param {object} options - The options object
   */
  constructor(request, options) {
      // Debug
      log.debug('header', 'debug',
          `class: ${Header.name}`, 'process: constructor')
        .debug(`request exists: ${!!request}`)
        .debug(`options exists: ${!!options}`)
        .debug(
          `gengojs-accept exists: ${
          !!(this.header = accept(request, options))
        }`)
        .debug(`locale: ${
          (this.locale = this.header.getLocale())
        }`);
    }
    /**
     * Parses the Accept-Launguage from the header
     * @param {object} [request] - The request object
     * @returns {string} - The parsed Accept-Language
     */
  getAcceptLanguge() {
      log.debug(`class: ${Header.name}`,
        `process: ${this.getAcceptLanguge.name}`);

      this.locale = this.header
        .getAcceptLanguage
        .apply(this.header, arguments);

      log.info(`locale: ${this.locale}`);
      return this.locale;
    }
    /**
     * Returns the current locale
     * @returns {string} - The current locale
     */
  getLocale() {
      log.debug(`class: ${Header.name}`,
        `process: ${this.getLocale.name}`);

      this.locale = this.header
        .getLocale
        .apply(this.header, arguments);

      log.info(`locale: ${this.locale}`);
      return this.locale;
    }
    /**
     * Sets the current locale
     * @param {string} - The locale to override
     * @returns {string} - The current locale
     */
  setLocale() {
      log.debug(`class: ${Header.name}`,
        `process: ${this.setLocale.name}`);

      this.locale = this.header
        .setLocale
        .apply(this.header, arguments);

      log.info(`locale: ${this.locale}`);
      return this.locale;
    }
    /**
     * Parses the Accept-Language from the header and extracts the locale
     * @param {object} [request] - The request object
     * @param {string} [fallback] - The locale to fallback
     * @returns {string} - The parsed locale
     */
  getFromHeader() {
      log.debug(`class: ${Header.name}`,
        `process: ${this.getFromHeader.name}`);

      this.locale = this.header
        .getFromHeader
        .apply(this.header, arguments);

      log.info(`locale: ${this.locale}`);
      return this.locale;
    }
    /**
     * Parses the query string from the url and extracts the locale
     * @param {object} key - The key of the query string
     * @param {string} [fallback] - The locale to fallback
     * @returns {string} - The parsed locale
     */
  getFromQuery() {
      log.debug(`class: ${Header.name}`,
        `process: ${this.getFromQuery.name}`);

      this.locale = this.header
        .getFromQuery
        .apply(this.header, arguments);

      log.info(`locale: ${this.locale}`);
      return this.locale;
    }
    /**
     * Parses the domain from the url and extracts the locale
     * @param {string} [fallback] - The locale to fallback
     * @returns {string} - The parsed locale
     */
  getFromDomain() {
      log.debug(`class: ${Header.name}`,
        `process: ${this.getFromDomain.name}`);

      this.locale = this.header
        .getFromDomain
        .apply(this.header, arguments);

      log.info(`locale: ${this.locale}`);
      return this.locale;
    }
    /**
     * Parses the sub-domain from the url and extracts the locale
     * @param {string} [fallback] - The locale to fallback
     * @returns {string} - The parsed locale
     */
  getFromSubDomain() {
      log.debug(`class: ${Header.name}`,
        `process: ${this.getFromSubDomain.name}`);

      this.locale = this.header
        .getFromSubDomain
        .apply(this.header, arguments);

      log.info(`locale: ${this.locale}`);
      return this.locale;
    }
    /**
     * Parses the cookie from the request object and extracts the locale
     * @param {object} key - The key of the query string
     * @param {string} [fallback] - The locale to fallback
     * @returns {string} - The parsed locale
     */
  getFromCookie() {
      log.debug(`class: ${Header.name}`,
        `process: ${this.getFromCookie.name}`);

      this.locale = this.header
        .getFromCookie
        .apply(this.header, arguments);

      log.info(`locale: ${this.locale}`);
      return this.locale;
    }
    /**
     * Parses the url and extracts the locale
     * @param {string} [fallback] - The locale to fallback
     * @returns {string} - The parsed locale
     */
  getFromUrl() {
      log.debug(`class: ${Header.name}`,
        `process: ${this.getFromUrl.name}`);

      this.locale = this.header
        .getFromUrl
        .apply(this.header, arguments);

      log.info(`locale: ${this.locale}`);
      return this.locale;
    }
    /**
     * Detects the locale by using the 'detect' options.
     * @param {string} [locale] - The locale to override
     * @returns {string} - The detected locale
     */
  detectLocale() {
    log.debug(`class: ${Header.name}`,
      `process: ${this.detectLocale.name}`);

    this.locale = this.header
      .detectLocale
      .apply(this.header, arguments);

    log.info(`locale: ${this.locale}`);
    return this.locale;
  }

}

export default () => {
  'use strict';
  return {
    main: function(req) {
      var options = this.options.header;
      this.header = new Header(req, options);
    },
    package: _.merge({
      type: 'header'
    }, require('../package')),
    defaults: require('../defaults')
  };
};