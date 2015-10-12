'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _gengojsDebug = require('gengojs-debug');

var _gengojsDebug2 = _interopRequireDefault(_gengojsDebug);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _extractify = require('./extractify');

var _extractify2 = _interopRequireDefault(_extractify);

var log = (0, _gengojsDebug2['default'])('core');
/*
    ## Input
    
    **Definition**: 

    1. The first argument must be a string or an object.
      * The string is the phrase to i18n
      * The object must contain a 'phrase' key with a string value to i18n
    2. The second must be n number of strings, an array or an object.
      * The n number of strings will represent sprint-f
      * The array will represent sprint-f
      * The object will represent sprint-f, or other arguments
*/

/**
 * This class extends the Extractify class
 * by adding an API wrapper around it.
 * @class Inputify
 */

var Inputify = (function (_Extractify) {
  _inherits(Inputify, _Extractify);

  function Inputify(phrase, args) {
    _classCallCheck(this, Inputify);

    _get(Object.getPrototypeOf(Inputify.prototype), 'constructor', this).call(this, phrase, args);
    log.debug('class: ' + Inputify.name, 'process: phrase').info('extract:', this.extracts).info('phrase:', this.phrase()).info('args:', this.arguments());
  }

  /** 
   * Returns instance of Inputify.
   * @param  {String | Object} phrase The phrase to parse.
   * @param  {...String | Object | Array} args The arguments to apply to the phrase.
   * @return {Inputify}           An instance of Inputify
   */

  /**
   * Returns the extracted phrase.
   * @return {String} - The phrase to internationalize.
   */

  _createClass(Inputify, [{
    key: 'phrase',
    value: function phrase() {
      log.debug('class: ' + Inputify.name, 'process: phrase');
      return this.extracts.phrase;
    }

    /**
     * Returns the extracted arguments.
     * @return {Array} - The extracted arguments.
     */
  }, {
    key: 'arguments',
    value: function _arguments() {
      log.debug('class: ' + Inputify.name, 'process: arguments');
      return this.extracts.args;
    }

    /**
     * Returns the extracted values.
     * @return {Object} - The extracted values (plain object).
     */
  }, {
    key: 'values',
    value: function values() {
      log.debug('class: ' + Inputify.name, 'process: values');
      return this.extracts.values;
    }

    /**
     * Determines whether the arguments are empty.
     * @return {Boolean} True if the object is empty.
     */
  }, {
    key: 'hasArgs',
    value: function hasArgs() {
      log.debug('class: ' + Inputify.name, 'process: hasArgs');
      return !_lodash2['default'].isEmpty(this.extracts.args);
    }

    /**
     * Determines whether the values are empty.
     * @return {Boolean} True if the object is empty.
     */
  }, {
    key: 'hasValues',
    value: function hasValues() {
      log.debug('class: ' + Inputify.name, 'process: hasValues');
      return !_lodash2['default'].isEmpty(this.extracts.values);
    }
  }]);

  return Inputify;
})(_extractify2['default']);

function inputify(phrase) {
  'use strict';

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return new Inputify(phrase, args);
}

/** 
 * @module inputify
 */
exports['default'] = inputify;
module.exports = exports['default'];
//# sourceMappingURL=../source maps/modules/inputify.js.map
