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

var log = (0, _gengojsDebug2['default'])('core');
/**
 * This class determines whether the
 * plugins are properly shipped and
 * sets them for the core.
 * @class Plugify
 */

var Plugify = (function () {
  function Plugify(plugins, options, defaults) {
    var _this = this;

    _classCallCheck(this, Plugify);

    log.debug('class: ' + Plugify.name, 'process: constructor');
    // Local options
    this.options = {};
    this.defaults = {};
    // Initialize the plugins
    this.plugins = (function () {
      // Check if defaults is empty
      if (_lodash2['default'].isEmpty(defaults)) {
        // Fill the defaults with placeholders (functions that don't do anything)
        _lodash2['default'].forEach(['api', 'backend', 'parser', 'header', 'localize', 'router'], function (item) {
          _this.defaults[Plugify.normalize(item)] = function () {};
        });
      } else Plugify.unPack(defaults, function (key, plugin) {
        // Unpack the gengo-pack and generate the default plugins
        Plugify.setPlugin(_this.defaults, plugin, _this.options);
      });
      return _this.defaults;
    })();
    // Register the plugins
    this.register(plugins);
    // Debug
    _lodash2['default'].forOwn(this.plugins, function (value, key) {
      var name = value['package'] ? value['package'].name : '';
      log.info('class: ' + Plugify.name, 'plugins: name - ' + name + ', type - ' + key + ', typeof - ' + typeof value);
    });
    // Create the default options
    _lodash2['default'].defaultsDeep(options, this.options);
  }

  /**
   * Returns the plugins after creating an instance
   * of Plugify
   * @param  {Object | Function | Array} plugins  The user plugins or plugins to override the default
   * @param  {Object} options  The options to apply to the plugins
   * @param  {Object} defaults The default plugins
   * @return {Plugify}         An instance of Plugify
   */

  /**
   * Registers the plugin
   * @param {Function | Array | Object} The plugin to register
   */

  _createClass(Plugify, [{
    key: 'register',
    value: function register(plugins) {
      var _this2 = this;

      log.debug('class: ' + Plugify.name, 'process: register');
      var process = function process(plugin) {
        if (_lodash2['default'].isPlainObject(plugin)) {
          if (Plugify.isPack(plugin)) {
            Plugify.unPack(plugin, function (key, p) {
              if (Plugify.assert(p)) {
                Plugify.setPlugin(_this2.plugins, p, _this2.options);
              }
            });
          } else if (Plugify.assert(plugin)) {
            Plugify.setPlugin(_this2.plugins, plugin, _this2.options);
          }
        }
      };
      if (_lodash2['default'].isArray(plugins)) {
        _lodash2['default'].forEach(plugins, function (plugin) {
          plugin = _lodash2['default'].isFunction(plugin) ? plugin() : _lodash2['default'].isPlainObject(plugin) ? plugin : undefined;
          process(plugin);
        });
      } else if (_lodash2['default'].isFunction(plugins)) {
        process(plugins());
      } else if (_lodash2['default'].isPlainObject(plugins)) process(plugins);
    }
  }], [{
    key: 'isPack',
    value: function isPack(plugin) {
      return !_lodash2['default'].has(plugin, 'main') && (function () {
        return _lodash2['default'].forEach(Object.keys(plugin), function (key) {
          return key === 'api' || key === 'parser' || key === 'backend' || key === 'header' || key === 'localize' || key === 'router';
        });
      })();
    }

    /**
     * Unpacks the gengo-pack and returns the plugin
     * through a callback
     * @param {Object | Function} plugins The plugins to unpack.
     * @param {Function} callback The callback function
     */
  }, {
    key: 'unPack',
    value: function unPack(plugins, callback) {
      _lodash2['default'].forOwn(plugins, function (plugin, type) {
        callback(type, _lodash2['default'].isFunction(plugin) ? plugin() : plugin);
      });
    }

    /**
     * Sets the attributes of the plugin
     * @param {Object} object  The object to set its attributes.
     * @param {Object} plugin  The plugin to apply to the object
     * @param {Object} options The options to apply
     */
  }, {
    key: 'setPlugin',
    value: function setPlugin(object, plugin, options) {
      log.debug('class: ' + Plugify.name, 'process: setPlugin');
      var main = plugin.main;
      var defaults = plugin.defaults;
      var type = plugin['package'].type;

      type = Plugify.normalize(type);
      if (object[type]) object[type] = {};
      // Set the plugin fn
      object[type] = main;
      // Set the package
      object[type]['package'] = plugin['package'];
      // Set the default options
      if (!options[type]) options[type] = defaults;
    }

    /**
     * Normalizes a string
     * @param  {String} str The string to normalize
     * @return {String}     The normalized string
     * @private
     */
  }, {
    key: 'normalize',
    value: function normalize(str) {
      return str.toLowerCase().replace('-', '');
    }

    /**
     * Asserts the plugin is in proper format.
     * @param {object} plugin - The plugin to assert.
     * @private
     */
  }, {
    key: 'assert',
    value: function assert(plugin) {
      log.debug('class: ' + Plugify.name, 'process: assert');
      try {
        if (!plugin) throw new Error('Whoops! Did you forget to ship your plugin?');
        if (!_lodash2['default'].has(plugin, 'main')) throw new Error('Whoops! Did you forget the main function?');
        if (!_lodash2['default'].has(plugin, 'package')) throw new Error('Whoops! Did you forget the package?');
        if (!_lodash2['default'].has(plugin['package'], 'type')) throw new Error('Whoops! Did you forget the "type" of plugin?');
        if (!_lodash2['default'].has(plugin['package'], 'name')) throw new Error('Whoops! Did you forget the "name" of plugin?');
        if (!_lodash2['default'].has(plugin, 'defaults')) throw new Error('Whoops! Did you forget to add the "defaults"?');
      } catch (error) {
        log.error('class: ' + Plugify.name, error.stack || error.toString());
        return false;
      }
      return true;
    }
  }]);

  return Plugify;
})();

function plugify() {
  'use strict';
  var plugins = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var defaults = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  return new Plugify(plugins, options, defaults).plugins;
}
/**
 * @module plugify
 */
exports['default'] = plugify;
module.exports = exports['default'];
//# sourceMappingURL=../source maps/modules/plugify.js.map
