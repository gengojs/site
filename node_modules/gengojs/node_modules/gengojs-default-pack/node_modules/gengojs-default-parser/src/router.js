'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gengojsDebug = require('gengojs-debug');

var _gengojsDebug2 = _interopRequireDefault(_gengojsDebug);

var _find = require('./find');

var _find2 = _interopRequireDefault(_find);

var log = (0, _gengojsDebug2['default'])('parser');

/**
 * This class routes the data depending on the
 * structure of the dictionary
 * @class Router
 */

var Router = (function () {
  function Router(input, core) {
    _classCallCheck(this, Router);

    this._router = core.router;
    this._header = core.header;
    this._backend = core.backend;

    log.debug('class: ' + Router.name, 'process: constructor').debug('router exists:', !!this._router).debug('header exists:', !!this._header).debug('header exists:', !!this._backend).debug(
    // Get the locale from either the keyword
    // or header
    'locale:', this._locale = _lodash2['default'].has(input.keywords, 'locale') ? this._header.setLocale(input.keywords.locale) : this._header.getLocale());

    this._data = this._backend.find(this._locale);
  }

  /**
   * Determines whether router is enabled.
   * @return {Boolean} True if router is enabled
   */

  _createClass(Router, [{
    key: 'isEnabled',
    value: function isEnabled() {
      log.debug('class: ' + Router.name, 'process: isEnabled').debug('isEnabled: ', this._router.isEnabled());
      return this._router.isEnabled();
    }

    /**
     * Returns the global data based on the keyword
     * @param  {String} keyword The keyword to the value
     * @return {Object}         The value
     */
  }, {
    key: 'global',
    value: function global(keyword) {
      log.debug('class: ' + Router.name, 'process: global');
      var result = this.isEnabled() && keyword ? this._data[keyword] : this._data;
      log.info('global result: ', result);
      return result;
    }

    /**
     * Returns the locale data based on the keyword
     * @param  {String} keyword The keyword to the value
     * @return {Object}         The value
     */
  }, {
    key: 'local',
    value: function local() {
      log.debug('class: ' + Router.name, 'process: local');
      var result;
      //check if router is enabled
      if (this.isEnabled()) {
        //if dot depth is 0 else deep search for the data
        if (this._router.toArray().length === 0) {
          result = this._data[this._router.toDot()];
          log.info('local result: ', result);
          return result;
        } else {
          result = _find2['default'].find(this._data, this._router.toDot());
          log.info('local result: ', result);
          return result;
        }
      } else return undefined;
    }
  }]);

  return Router;
})();

exports['default'] = Router;
module.exports = exports['default'];
//# sourceMappingURL=source maps/router.js.map
