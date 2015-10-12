'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _intl = require('intl');

var _intl2 = _interopRequireDefault(_intl);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

/**
 * Global settings
 */
var settings = require('../settings');

var Tokei = (function () {
  function Tokei(locale) {
    _classCallCheck(this, Tokei);

    /**
     * Set Intl Alias
     */
    this.Intl = {
      'Date': _intl2['default'].DateTimeFormat,
      'Number': _intl2['default'].NumberFormat
    };
    /*
      Set private variables
    */
    // Set the current date
    this._date = (0, _momentTimezone2['default'])();
    // Set the initial number
    this._number = 0;
    // Set the locale
    this._locale = locale || settings.locale;
    // Set moment
    this._moment = _momentTimezone2['default'];
    // Set moment to global locale
    this._moment.locale(locale || settings.locale);
    // Determines if the chain is formatting a number
    this._isNumber = false;
  }

  /**
   * Creates an instance of Tokei.
   * @param  {String} locale The local locale to set.
   * @return {Tokei}        The Tokei instance.
   * @public
   */

  /**
   * Returns the current date or time
   * @return {String} The current date or time.
   */

  _createClass(Tokei, [{
    key: 'now',
    value: function now() {
      /**
       *### Example
       * 
       *#### Get the current date
       *
       *```javascript
       * // Returns the current date
       * tokei().date().now();
       *```
       *
       *#### Get the current time
       *
       *```javascript
       * // Returns the current time
       * tokei().time().now();
       *```
       */
      return new this.Intl.Date(this._locale, this._options).format((0, _momentTimezone2['default'])());
    }

    /**
     * Formats the date.
     * See [DateTimeFormat](https://goo.gl/19d1rX).
     * @param {Object} options The options for date formatting.
     * @return {Tokei} this
     */
  }, {
    key: 'date',
    value: function date(options) {
      /**
       *### Example
       * 
       *#### Get the formatted date.
       *
       *```javascript
       * tokei().date().format(new Date(Date.UTC(2012, 11, 20, 3, 0, 0)));
       *```
       *
       *#### Get the formatted date with options.
       *```javascript
       * var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
       * tokei('de-DE').date(options).format(new Date(Date.UTC(2012, 11, 20, 3, 0, 0)));
       *```
       */

      /**
       * @private
       */
      this._options = options || settings.date;
      this._isNumber = false;
      return this;
    }

    /**
     * Formats the time.
     * See [DateTimeFormat](https://goo.gl/19d1rX).
     * @return {Tokei} this.
     */
  }, {
    key: 'time',
    value: function time(options) {
      /** 
       *### Example
       *  
       *#### Get the formatted time.
       *
       *```javascript
       * tokei('en-AU').time().format(new Date(Date.UTC(2012, 11, 20, 3, 0, 0)));
       *```
       *
       *#### Get the formatted time with options.
       *
       *```javascript
       * var options =  { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
       * tokei('en-AU').time(options).format(new Date(Date.UTC(2012, 11, 20, 3, 0, 0)));
       * ```
       */

      /**
       * @private
       */
      this._options = options || settings.time;
      this._isNumber = false;
      return this;
    }

    /**
     * Formats the time.
     * See [NumberFormat](https://goo.gl/edHSxf).
     * @return {Tokei} this.
     */
  }, {
    key: 'number',
    value: function number(options) {
      /**
       *### Example 
       *
       *#### Get the formatted number.
       *
       *```javascript
       * tokei('de-DE').number().format(123456.789);
       *```
       *
       *#### Get the formatted number with options.
       *
       *```javascript
       * var options =  { style: 'currency', currency: 'EUR' };
       * tokei('de-DE').number(options).format(123456.789);
       * ```
       */

      /**
       * @private
       */
      this._options = options || {};
      this.isNumber = true;
      return this;
    }

    /**
     * Formats the object
     * See [DateTimeFormat](https://goo.gl/19d1rX) 
     * and [NumberFormat](https://goo.gl/edHSxf)
     * @param  {(Date | Number)} obj The object to format.
     * @return {(String | Number)}     The formatted date, time or number.
     */
  }, {
    key: 'format',
    value: function format(obj) {
      /**
       *### Example
       *
       *#### Get the formatted date, time, or number.
       *
       *```javascript
       * //format date
       * tokei().date().format([Date date]);
       * //format time
       * tokei().time().format([Date time]);
       * //format number
       * tokei().number().format([Number number]);
       * ```
       */

      /**
       * @private
       */
      if (this.isNumber) return new this.Intl.Number(this._locale, this._options).format(obj || this._number);else return new this.Intl.Date(this._locale, this._options).format(obj || this._date);
    }

    /**
     * The local moment.
     * See [moment](http://momentjs.com/)
     * @param {...*} arguments
     * @return {Moment}
     */
  }, {
    key: 'moment',
    value: function moment() {
      /**
       *### Example
       *
       *#### Using moment with Tokei.
       *
       *```javascript
       * //use moment just as you would normally
       * tokei().moment();
       * //you can even set a locale
       * tokei('ja').moment();
       * ```
       */
      return this._moment.apply(this, arguments);
    }
  }]);

  return Tokei;
})();

var tokei = function tokei(locale) {
  /**
   *### Example
   * 
   *#### Get the formatted date, time, or number.
   *
   *```javascript
   * tokei().date().format();
   * //usage:
   * //tokei().[api]().format()
   * ```
   * 
   *#### Setting the locale.
   *
   *```javascript
   * tokei('ja').date().format()
   * //usage:
   * //tokei([String locale]).[api]().format()
   * ```
   */
  return new Tokei(locale);
};

/**
 * @method  locale
 * @static
 * Sets the global locale for Tokei.
 * @param  {Object} locale The global locale.
 * @return {Object}     The global locale.
 * @public
 */
tokei.locale = function (locale) {
  settings.locale = locale;
  return settings.locale;
};

/**
 * @method  config
 * @static
 * Sets the global options for Tokei.
 * @param  {Object} options The global options.
 * @return {Object}     The global options.
 * @public
 */
tokei.config = function (options) {
  settings.options = options || settings.options;
  return settings.options;
};

/**
 * The global moment. See [Moment.js](http://momentjs.com/).
 * @type {Moment}
 * @public
 */
tokei.moment = _momentTimezone2['default'];

exports['default'] = tokei;
module.exports = exports['default'];
//# sourceMappingURL=source maps/index.js.map
