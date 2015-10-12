'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = api;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _cldr = require('cldr');

var _cldr2 = _interopRequireDefault(_cldr);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gengojsDebug = require('gengojs-debug');

var _gengojsDebug2 = _interopRequireDefault(_gengojsDebug);

var log = (0, _gengojsDebug2['default'])('api');

/* Class API */

var API = (function () {
  function API(core) {
    _classCallCheck(this, API);

    log.debug('class: ' + API.name, 'process: constructor');
    this.options = core.options;
    this.context = core;
  }

  /* Sets the API*/

  _createClass(API, [{
    key: 'set',
    value: function set() {
      log.debug('class: ' + API.name, 'process: set');
      var core = this.context;

      /**
       * The i18n function
       */
      var i18n = function i18n() {};

      /**
       * The l10n function
       */
      var l10n = function l10n() {};

      // Set the options
      var options = this.options.api;
      _lodash2['default'].assign(options.header = {}, this.options.header);
      (0, _gengojsDebug2['default'])('api', 'info', 'options exists:', !!options);

      /**
       * i18ns the arguments. Note: You can change ID for i18n. See Options.
       * @param  {...*} arg The arguments to internationalize.
       * @return {String} Then i18ned string.
       */
      i18n[options.global] = function () {
        log.debug('class: ' + API.name, 'process: i18n');

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

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
      i18n.language = function (id) {
        log.debug('class: ' + API.name, 'process: i18n.languge');
        // de-normalize locale
        var locale = core.header.getLocale();
        locale = locale.toLowerCase().replace('-', '_');
        // denormalize id
        id = id ? id.toLowerCase().replace('_', '-') : locale;
        // store the languages
        return _cldr2['default'].extractLanguageDisplayNames(locale)[id];
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
      i18n.languages = function (arg, supported) {
        log.debug('class: ' + API.name, 'process: i18n.languges');
        var _supported = [];
        supported = (_lodash2['default'].isArray(arg) ? arg : supported) || options.header.supported;
        arg = _lodash2['default'].isArray(arg) ? undefined : arg;
        supported.forEach(function (locale) {
          arg = arg ? arg.toLowerCase() : core.header.getLocale();
          arg = arg.replace('_', '-');
          // de-normalize locales
          locale = locale.toLowerCase().replace('-', '_');
          // store the languages
          _supported.push(_cldr2['default'].extractLanguageDisplayNames(arg)[locale]);
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
      i18n.locale = function (locale) {
        log.debug('class: ' + API.name, 'process: i18n.locale');
        return locale ? core.header.setLocale(locale) : core.header.detectLocale ? core.header.detectLocale() : core.header.getLocale();
      };

      /**
       * @description Get the cldr.
       * @return {CLDR} The instance of cldr.
       * @public
       */
      i18n.cldr = function () {
        log.debug('class: ' + API.name, 'process: i18n.cldr');
        return _cldr2['default'];
      };

      /**
       * Returns the catalog
       * @param  {String} locale The locale to find
       * @return {Object}        The catalog
       */
      i18n.catalog = function (locale) {
        log.debug('class: ' + API.name, 'process: i18n.catalog');
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
      l10n[options.localize] = function () {
        log.debug('class: ' + API.name, 'process: i10n');

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

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
  }, {
    key: 'get',
    value: function get() {
      log.debug('class: ' + API.name, 'process: get');
      return this.apply({});
    }

    /* 
     * Applies the API to any object
     * @private
     */
  }, {
    key: 'apply',
    value: function apply(object) {
      log.debug('class: ' + API.name, 'process: apply');
      var core = this.context;
      _lodash2['default'].forEach(this.set(), function (item, key) {
        switch (key) {
          case 'i18n':
            _lodash2['default'].forOwn(item, function (api, subkey) {
              if (!object[subkey]) {
                if (subkey === this.options.api.global) object[subkey] = api.bind(core);else object[this.options.api.global][subkey] = api.bind(core);
              }
            }, this);
            break;
          case 'l10n':
            _lodash2['default'].forOwn(item, function (api, subkey) {
              if (!object[subkey]) {
                if (subkey === this.options.api.localize) object[subkey] = api.bind(core);
              }
            }, this);
            break;
        }
      }, this);
      log.debug('class: ' + API.name, 'API exists:', _lodash2['default'].has(object, this.options.api.global) && _lodash2['default'].has(object, this.options.api.localize));
      return object;
    }
  }]);

  return API;
})();

function api() {
  'use strict';
  return {
    main: function ship() {
      var object = arguments[0] || arguments[1] || {};
      log.debug('object exists:', !!object);
      return new API(this).apply(object);
    },
    'package': _lodash2['default'].merge({
      type: 'api'
    }, require('../package')),
    defaults: require('../defaults')
  };
}

module.exports = exports['default'];
//# sourceMappingURL=source maps/index.js.map
