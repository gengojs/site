'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

require('source-map-support/register');

var inspect = function inspect(object) {
  return _util2['default'].inspect(object, {
    showHidden: true,
    depth: 15
  });
};
/**
 * Debug is a debug wrapper for gengo.js
 * @class Debug
 */

var Debug = function Debug(namespace) {
  var _this = this;

  _classCallCheck(this, Debug);

  // Set the namespace
  this.namespace = namespace;
  // Set the levels
  var levels = ['debug', 'warn', 'error', 'info', 'verbose', 'silly'];
  // Set up our personal console which
  // will be build the log functions by type
  this.console = (function () {
    var obj = {};
    var gengo = 'gengo';
    var namespaces = ['core', 'parser', 'router', 'backend', 'api', 'localize', 'header'];
    // Build it!
    namespaces.forEach(function (namespace) {
      levels.forEach(function (level) {
        var key = gengo + '.' + namespace + ':' + level;
        obj[key] = (0, _debug2['default'])(gengo + '.' + namespace + ':' + level);
      }, this);
    }, _this);
    return obj;
  })();

  // Apply color to the arguments if necessary and output them!
  levels.forEach(function (level) {
    _this[level] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var namespace = 'gengo' + '.' + _this.namespace.toLowerCase() + ':' + level;

      args = args.map(function (a) {
        var temp;
        try {
          if (!_lodash2['default'].isFunction(a) || !_lodash2['default'].isString(a)) temp = inspect(a);
        } catch (error) {}
        return temp || a;
      });
      if (level === 'error') args = args.map(function (a) {
        return _chalk2['default'].red(a);
      });
      if (level === 'warn') args = args.map(function (a) {
        return _chalk2['default'].yellow(a);
      });
      _this.console[namespace].apply(null, args);
      return _this;
    };
  });
}

/**
 * Wraps 'debug' and outputs the arguments using namespaces.
 * @param {string} namespace - The namespace of the gengo to debug.
 * @example 
 *  debugify('core.plugins').warn('hello')
 */
;

exports['default'] = function (namespace) {
  return new Debug(namespace);
};

module.exports = exports['default'];
//# sourceMappingURL=source maps/index.js.map
