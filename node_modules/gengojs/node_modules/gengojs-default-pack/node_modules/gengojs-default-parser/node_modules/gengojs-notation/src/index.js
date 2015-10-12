/** @type {Object} The definition for notations */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var notations = {
  bracket: /^\[([\s\S]+)\][\.]?([\w\S]+)*/,
  dot: /\.[^.]/,
  spaces: /\s/
};
/**
 * This class determines whether a
 * string is in phrase, bracket, or dot notation.
 * @class Notation
 */

var Notation = (function () {
  function Notation(str) {
    _classCallCheck(this, Notation);

    this._key = str;
  }

  /**
   * Determines whether a string is in bracket notation
   * @param  {String}  str The string to determine.
   * @return {Boolean}     Returns true if the string is in bracket notation.
   */

  _createClass(Notation, [{
    key: 'parse',

    /**
     * Returns the notation type based on the string.
     * @return {Object} Returns the notation type.
     */
    value: function parse() {
      if (Notation.isPhrase(this._key)) {
        return {
          type: 'phrase',
          key: this._key.indexOf('[\\') > -1 ? this._key.replace('\\', '') : this._key,
          seek: undefined
        };
      }
      if (Notation.isBracket(this._key)) {
        var result = notations.bracket.exec(this._key);
        return {
          type: 'bracket',
          key: result[1],
          seek: result[2]
        };
      }
      if (Notation.isDot(this._key)) {
        return {
          type: 'dot',
          key: this._key,
          seek: undefined
        };
      }
    }
  }], [{
    key: 'isBracket',
    value: function isBracket(str) {
      var hasBracket = Notation.hasPattern(str, notations.bracket);
      var hasEscaped = str.indexOf('[\\') > -1;
      return hasBracket && !hasEscaped;
    }

    /**
     * Determines whether a string is in dot notation
     * @param  {String}  str The string to determine.
     * @return {Boolean}     Returns true if the string is in dot notation.
     */
  }, {
    key: 'isDot',
    value: function isDot(str) {
      var hasDot = Notation.hasPattern(str, notations.dot);
      var hasSpaces = Notation.hasPattern(str, notations.spaces);
      return hasDot && !hasSpaces;
    }

    /**
     * Determines whether a string is in dot notation
     * @param  {String}  str The string to determine.
     * @return {Boolean}     Returns true if the string is in dot notation.
     */
  }, {
    key: 'isPhrase',
    value: function isPhrase(str) {
      return !Notation.isBracket(str) && !Notation.isDot(str);
    }

    /**
     * Determines whether a string contains the pattern.
     * @param  {String}  str The string to determine.
     * @return {Boolean}     Returns true if the string is in the pattern.
     * @private
     */
  }, {
    key: 'hasPattern',
    value: function hasPattern(str, regex) {
      return str.search(regex) !== -1;
    }
  }]);

  return Notation;
})();

exports['default'] = Notation;
module.exports = exports['default'];
//# sourceMappingURL=source maps/index.js.map
