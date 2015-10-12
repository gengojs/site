'use strict';

import intl from 'intl';
import moment from 'moment-timezone';

/**
 * Global settings
 */
var settings = require('../settings');

class Tokei {
  constructor(locale) {
      /**
       * Set Intl Alias
       */
      this.Intl = {
        'Date': intl.DateTimeFormat,
        'Number': intl.NumberFormat
      };
      /*
        Set private variables
      */
      // Set the current date
      this._date = moment();
      // Set the initial number
      this._number = 0;
      // Set the locale
      this._locale = locale || settings.locale;
      // Set moment
      this._moment = moment;
      // Set moment to global locale
      this._moment.locale(locale || settings.locale);
      // Determines if the chain is formatting a number
      this._isNumber = false;
    }
    /**
     * Returns the current date or time
     * @return {String} The current date or time.
     */
  now() {
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
      return new this.Intl.Date(this._locale, this._options).format(moment());
    }
    /**
     * Formats the date.
     * See [DateTimeFormat](https://goo.gl/19d1rX).
     * @param {Object} options The options for date formatting.
     * @return {Tokei} this
     */
  date(options) {
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
  time(options) {
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
  number(options) {
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
  format(obj) {
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
      if (this.isNumber)
        return new this.Intl.Number(this._locale, this._options).format(obj || this._number);
      else
        return new this.Intl.Date(this._locale, this._options).format(obj || this._date);
    }
    /**
     * The local moment.
     * See [moment](http://momentjs.com/)
     * @param {...*} arguments
     * @return {Moment}
     */
  moment() {
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
}
/**
 * Creates an instance of Tokei.
 * @param  {String} locale The local locale to set.
 * @return {Tokei}        The Tokei instance.
 * @public
 */
var tokei = function(locale) {
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
tokei.locale = function(locale) {
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
tokei.config = function(options) {
  settings.options = options || settings.options;
  return settings.options;
};

/**
 * The global moment. See [Moment.js](http://momentjs.com/).
 * @type {Moment}
 * @public
 */
tokei.moment = moment;

export default tokei;