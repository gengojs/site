import cldr from 'cldr';
import _ from 'lodash';
import debug from 'gengojs-debug';
var log = debug('api');

/* Class API */
class API {
  constructor(core) {
      log.debug(`class: ${API.name}`, `process: constructor`);
      this.options = core.options;
      this.context = core;
    }
    /* Sets the API*/
  set() {
      log.debug(`class: ${API.name}`, `process: set`);
      var core = this.context;

      /**
       * The i18n function
       */
      var i18n = function() {};

      /**
       * The l10n function
       */
      var l10n = function() {};

      // Set the options
      var options = this.options.api;
      _.assign((options.header = {}), this.options.header);
      debug('api', 'info', 'options exists:', !(!options));

      /**
       * i18ns the arguments. Note: You can change ID for i18n. See Options.
       * @param  {...*} arg The arguments to internationalize.
       * @return {String} Then i18ned string.
       */
      i18n[options.global] = function(...args) {
        log.debug(`class: ${API.name}`, `process: i18n`);
        return core.parse.apply(core, args);
      };
      /**
      * ### Example
      * *The following applies only for gengojs-default-parser*
      *#### Phrase notation with default parser.
      *```javascript
      * // Assuming the locale === 'ja',
      * // a basic phrase returns 'こんにちは'
      * __('Hello');
      *
      * // a basic phrase with sprintf returns 'Bob こんにちは'
      * __('Hello %s', 'Bob');
      *
      * // a basic phrase with interpolation returns 'Bob こんにちは'
      *  __('Hello {{name}}', {name:'Bob'});
      *```
      *#### Bracket notation with default parser.
      *```javascript
      * // Assuming the locale === 'ja',
      * // a basic bracket phrase returns 'おっす'
      * __('[Hello].informal');
      *
      * // a basic bracket phrase with sprintf returns 'Bob おっす'
      * __('[Hello %].informal', 'Bob');
      *
      * // a basic bracket phrase with interpolation returns 'Bob おっす'
      * __('[Hello {{name}}].informal', {name:'Bob'});
      *```
      *#### Dot notation with default parser.
      *```javascript
      * // Assuming the locale === 'ja',
      * // a basic dot phrase returns 'おっす'
      * __('greeting.hello.informal');
      *
      * // a basic dot phrase with sprintf returns 'Bob おっす'
      * __('greeting.hello.person.informal', 'Bob');
      *
      * //a basic dot phrase with interpolation returns 'Bob おっす'
      * __('greeting.hello.person.informal', {name:'Bob'});
      *```
      * 
      *#### All notations with Message Format.
      *  See [message-format](https://github.com/thetalecrafter/
        message-format) for documentation.
      * ```javascript
      * // Assuming the locale === 'en-us',
      * // a basic phrase with message formatting
      * // returns "You took 4,000 pictures since Jan 1, 2015 9:33:04 AM"
      * __('You took {n,number} pictures since 
        {d,date} {d,time}', { n:4000, d:new Date() });
      *
      * // a basic bracket phrase with message formatting
      * // returns "You took 4,000 pictures since Jan 1, 2015 9:33:04 AM"
      * __('[You took {n, numbers} pictures].since.date', 
        { n:4000, d:new Date() });
      *
      * // a basic dot phrase with message formatting
      * // returns "You took 4,000 pictures since Jan 1, 2015 9:33:04 AM"
      * __('pictures.since.date', { n:4000, d:new Date() });
      *```
      */

      /**
       * @method language
       * @description Returns the name of the current locale.
       * @param  {string} id The locale to change.
       * @return {String} Then i18ned string.
       */
      i18n.language = function(id) {
        log.debug(`class: ${API.name}`, `process: i18n.languge`);
        // de-normalize locale
        var locale = core.header.getLocale();
        locale = locale.toLowerCase().replace('-', '_');
        // denormalize id
        id = id ? id.toLowerCase().replace('_', '-') : locale;
        // store the languages
        return cldr.extractLanguageDisplayNames(locale)[id];
      };


      /**
       * ### Example
       *#### Get the current language.
       *```javascript
       * // assuming locale === 'en-us'
       * // returns 'American English'
       * __.languages();
       *```
       *#### Get the current language in another locale. 
       *```javascript
       * // assuming locale === 'en-us'
       * // returns 'English'
       * __.language('en');
       *
       * // returns 'Japanese'
       * __.language('ja');
       *```
       */

      /**
       * @method languages
       * @description Returns the names of the supported locale.
       * @param  {String | Array} arg The locale to change or the supported locales.
       * @param {Array} supported The supported locales.
       * @return {String} Then i18ned string.
       */
      i18n.languages = (arg, supported) => {
        log.debug(`class: ${API.name}`, `process: i18n.languges`);
        var _supported = [];
        supported = (_.isArray(arg) ? arg : supported) ||
          options.header.supported;
        arg = _.isArray(arg) ? undefined : arg;
        supported.forEach(locale => {
          arg = arg ? arg.toLowerCase() :
            core.header.getLocale();
          arg = arg.replace('_', '-');
          // de-normalize locales
          locale = locale.toLowerCase().replace('-', '_');
          // store the languages
          _supported.push(cldr.extractLanguageDisplayNames(arg)[locale]);
        }, core);
        return _supported;
      };

      /**
       * ### Example
       * #### Get the supported languages.
       *```javascript
       * // Assuming locale === 'en-us'
       * // returns ['American English', 'Japanese']
       * __.lanugages();
       *```
       *#### Get the current languages in another locale. 
       *```javascript
       * // Assuming locale === 'en-us'
       * // returns ['アメリカ英語', '日本語']
       * __.languages('ja');
       *```
       *#### Override the supported locales.
       *```javascript
       * // Assuming locale === 'en-us'
       * // returns ['English', 'Japanese']
       * __.languages(['en', 'ja']);
       *```
       *#### Override the supported locales and get the languages in another locale.
       *```javascript
       * // Assuming locale === 'en-us'
       * // returns ['英語', '日本語']
       * __.languages('ja', ['en', 'ja']);
       *```
       */

      /**
       * @method locale
       * @description Sets or gets the locale.
       * @param  {String} locale The locale to set or get.
       * @return {String} The locale.
       */
      i18n.locale = (locale) => {
        log.debug(`class: ${API.name}`, `process: i18n.locale`);
        return locale ?
          core.header.setLocale(locale) :
          core.header.detectLocale ?
          core.header.detectLocale() :
          core.header.getLocale();
      };

      /**
       * @description Get the cldr.
       * @return {CLDR} The instance of cldr.
       * @public
       */
      i18n.cldr = () => {
        log.debug(`class: ${API.name}`, `process: i18n.cldr`);
        return cldr;
      };

      /**
       * Returns the catalog
       * @param  {String} locale The locale to find
       * @return {Object}        The catalog
       */
      i18n.catalog = (locale) => {
        log.debug(`class: ${API.name}`, `process: i18n.catalog`);
        return core.backend.catalog(locale);
      };

      /**
       * l10n
       * @description Localizes date, time and numbers.
       * See [Tokei](https://github.com/iwatakeshi/tokei) for documentation.
       * Note: You can change ID for l10n. See Configuration.
       * @param  {String}  locale The locale to override.
       * @return {Tokei} The instance of Tokei.
       * @public
       */
      l10n[options.localize] = function(...args) {
        log.debug(`class: ${API.name}`, `process: i10n`);
        return core.localize.apply(core, args);
      };
      /**
       * ### Example
       * #### Get the current locale.
       *```javascript
       * // Assuming locale === 'en-us'
       * // returns 'en-us'
       * __.locale()
       *```
       *#### Set the locale.
       *```javascript
       * // Asumming locale === 'en-us'
       * // sets and returns 'ja'
       * __.locale('ja')
       *```
       */
      return {
        i18n: i18n,
        l10n: l10n
      };
    }
    /**
     * Returns the API
     * @returns The API
     */
  get() {
      log.debug(`class: ${API.name}`, `process: get`);
      return this.apply({});
    }
    /* 
     * Applies the API to any object
     * @private
     */
  apply(object) {
    log.debug(`class: ${API.name}`, `process: apply`);
    var core = this.context;
    _.forEach(this.set(), function(item, key) {
      switch (key) {
        case 'i18n':
          _.forOwn(item, function(api, subkey) {
            if (!object[subkey]) {
              if (subkey === this.options.api.global)
                object[subkey] = api.bind(core);
              else
                object[this.options.api.global][subkey] = api.bind(core);
            }
          }, this);
          break;
        case 'l10n':
          _.forOwn(item, function(api, subkey) {
            if (!object[subkey]) {
              if (subkey === this.options.api.localize)
                object[subkey] = api.bind(core);
            }
          }, this);
          break;
      }
    }, this);
    log.debug(`class: ${API.name}`, 'API exists:',
      _.has(object, this.options.api.global) &&
      _.has(object, this.options.api.localize));
    return object;
  }
}

export default function api() {
  'use strict';
  return {
    main: function ship() {
      var object = arguments[0] || arguments[1] || {};
      log.debug('object exists:', !!object);
      return new API(this).apply(object);
    },
    package: _.merge({
      type: 'api'
    }, require('../package')),
    defaults: require('../defaults')
  };
}