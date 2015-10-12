'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _package = require('../package');

var _package2 = _interopRequireDefault(_package);

var _gengojsCoreModules = require('gengojs-core-modules');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var log = require('gengojs-debug')('core');

/**
 * The core of gengo.js
 * @class Gengo
 */

var Gengo = (function () {
  /**
   * @constructor 
   * @param {Object} options The options for each plugin.
   * @param {Object | Array | Function} plugins The plugin(s) for the core.
   * @param {Object} defaults The default plugins for the core.
   */

  function Gengo(options, plugins, defaults) {
    _classCallCheck(this, Gengo);

    log.debug('class: ' + Gengo.name, 'process: constructor')
    // Current version
    .info('version:', this.version = _package2['default'].version)
    // Options
    .info('options: ', this.options = (0, _gengojsCoreModules.optify)(options));
    // Set Plugins
    this.plugins = (0, _gengojsCoreModules.plugify)(plugins, this.options, defaults);
    // Backend plugin
    if (!_lodash2['default'].isEmpty(this.plugins.backend) && this.plugins.backend) this.plugins.backend.apply(this);
  }

  /**
   * Creates a new Gengo instance
   */

  /**
   * Parses and i18ns the phrase.
   * @param {Object | String} phrase The phrase to i18n.
   * @param {Array} args The arguments to apply to the phrase.
   * @returns {String} The i18ned phrase.
   */

  _createClass(Gengo, [{
    key: 'parse',
    value: function parse(phrase) {
      log.debug('class: ' + Gengo.name, 'process: parse');
      // Parser plugin

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return this.plugins.parser.apply(this, [(0, _gengojsCoreModules.inputify)(phrase, args)]);
    }

    /**
     * The Middleware for Node frameworks
     * @param {Object} req The request object.
     * @param {Object} res The response object.
     * @param {Function} next The next function.
     */
  }, {
    key: 'ship',
    value: function ship(req, res, next) {
      log.debug('class: ' + Gengo.name, 'process: ship');
      // Header plugin
      this.plugins.header.apply(this, arguments);
      // Router plugin
      this.plugins.router.apply(this, arguments);
      // Localize plugin
      this.plugins.localize.apply(this, arguments);
      // Apply API to the objects/request/response
      (0, _gengojsCoreModules.servify)(this).apply(req, res, next);
    }

    /**
     * Applies the API to req, res, and other objects.
     * @param {...arguments} arguments The arguments to apply the API.
     * @return {Object} The applied object
     */
  }, {
    key: 'assign',
    value: function assign() {
      log.debug('class: ' + Gengo.name, 'process: assign');
      // API plugin
      return this.plugins.api.apply(this, arguments);
    }
  }]);

  return Gengo;
})();

exports['default'] = function (options, plugins, defaults) {
  'use strict';
  return new Gengo(options, plugins, defaults);
};

module.exports = exports['default'];
//# sourceMappingURL=source maps/index.js.map
