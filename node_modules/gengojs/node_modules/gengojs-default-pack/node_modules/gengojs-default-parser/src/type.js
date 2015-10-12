'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _gengojsNotation = require('gengojs-notation');

var _gengojsNotation2 = _interopRequireDefault(_gengojsNotation);

var _gengojsDebug = require('gengojs-debug');

var _gengojsDebug2 = _interopRequireDefault(_gengojsDebug);

var _find = require('./find');

var _find2 = _interopRequireDefault(_find);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var log = (0, _gengojsDebug2['default'])('parser');

/**
 * This class determines the type
 * of notation used.
 * @class Type
 * @extends {Notation}
 */

var Type = (function (_Notation) {
  _inherits(Type, _Notation);

  function Type(input, core) {
    _classCallCheck(this, Type);

    _get(Object.getPrototypeOf(Type.prototype), 'constructor', this).call(this, input.phrase);
    log.debug('class: ' + Type.name, 'process: constructor').debug('router exists: ' +
    // Set dependencies
    !!(this._router = new _router2['default'](input, core))).debug('options exists: ' +
    // Set options
    !!(this._options = core.options.parser));
  }

  /**
   * Finds the data from a string that is a phrase
   * @return {String | Object | undefined}
   */

  _createClass(Type, [{
    key: 'getPhrase',
    value: function getPhrase() {
      var keywords = this._options.keywords,
          result,
          local,
          global,
          key = _get(Object.getPrototypeOf(Type.prototype), 'parse', this).call(this).key;
      try {
        // local data is
        local = this._router.local();
        // Check if global data exists
        global = this._router.global(keywords.global);
        // Check if the value exists under that key
        result = _lodash2['default'].has(global, key) ? global[key] : _lodash2['default'].has(local, key) ? local[key] : undefined;
      } catch (error) {
        if (this._router.isEnabled()) log.warn('Oops! Couldn\'t find key: ' + key + ' with router enabled.');else log.error(error.stack || String(error));
      }
      return result;
    }

    /**
     * Parses a string that contains a bracket notation
     * @return {String | undefined}
     */
  }, {
    key: 'getBracket',
    value: function getBracket() {
      var keywords = this._options.keywords,
          key = _get(Object.getPrototypeOf(Type.prototype), 'parse', this).call(this).key,
          seek = _get(Object.getPrototypeOf(Type.prototype), 'parse', this).call(this).seek,
          result,
          local,
          global;
      try {
        // Check if router is enabled and data exists under router
        local = this._router.local();
        // Check if local data exists or even has the value from the key
        if (!_lodash2['default'].isUndefined(local)) local = _lodash2['default'].has(local, key) ? local[key] || local : local;
        // Check if global data exists
        global = this._router.global(keywords.global);
        // Find the phrase in the local scope
        local = _lodash2['default'].has(local, key) ? local[key] : undefined;
        // Find the phrase in the global scope
        global = _lodash2['default'].has(global, key) ? global[key] : undefined;
        // If the bracket contains a dot notation
        if (seek) {
          //match the dot.dot.dot
          if (_gengojsNotation2['default'].isDot(seek)) {
            //deep search for the data and parse the result
            result = _find2['default'].find(local, seek) || _find2['default'].find(global, seek);
            //check if key exists
            result = _lodash2['default'].has(result, key) ? result[key] : result || undefined;
          } else result = local ? local[seek] : local || global ? global[seek] : global;
        } else {
          // Since it contains only a single dot
          // Check if the local or global scope contains the key
          if (local) result = _lodash2['default'].has(local, key) ? local[key] : local;else if (global) result = _lodash2['default'].has(global, key) ? global[key] : global;
        }
      } catch (error) {
        if (this._router.isEnabled()) log.warn('Oops! Couldn\'t find key: ' + seek || key + ' with router enabled.');else log.error(error.stack || String(error));
      }
      return result;
    }

    /**
     * Parses a string that contains a dot notation
     * @return {String | undefined}
     */
  }, {
    key: 'getDot',
    value: function getDot() {
      var keywords = this._options.keywords,
          key = _get(Object.getPrototypeOf(Type.prototype), 'parse', this).call(this).key,
          result,
          local,
          global;
      try {
        // Find the phrase in the local scope
        local = this._router.local();
        // Find the phrase in the global scope
        global = this._router.global(keywords.global);

        result = _find2['default'].find(local, key) || _find2['default'].find(global, key);
      } catch (error) {
        if (this._router.isEnabled()) log.warn('Oops! Couldn\'t find key: ' + this._type.key + ' with router enabled.');else log.error(error.stack || String(error));
      }
      return result;
    }
  }]);

  return Type;
})(_gengojsNotation2['default']);

exports['default'] = Type;
module.exports = exports['default'];
//# sourceMappingURL=source maps/type.js.map
