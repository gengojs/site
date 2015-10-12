'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cldr = require('cldr');

var _cldr2 = _interopRequireDefault(_cldr);

/**
 * This class converts the path to
 * an array or a dotted path
 * @class Path
 */

var Path = (function () {
  function Path(path) {
    _classCallCheck(this, Path);

    // If the string contains favico.ico
    // replace it with an empty string
    this.path = path.replace('favicon.ico', '');
  }

  /** 
   * Determines if the string contains a locale
   * @param  {String}  str The string to determine
   * @return {Boolean}     Returns true if the string contains a locale.
   */

  _createClass(Path, [{
    key: 'isLocale',
    value: function isLocale(str) {
      str = str.toLowerCase().replace('-', '_');
      // Compare the locales against cldr
      return _lodash2['default'].contains(_cldr2['default'].localeIds, str);
    }

    /** 
     * Converts the path into an array.
     * @param  {String} path The path to convert
     * @return {Array}      The array that represents the path.
     */
  }, {
    key: 'toArray',
    value: function toArray(path) {
      path = path ? path.split('/') : this.path.split('/');
      var filtered = [],
          result = [];
      var version = /\d{1,2}(\.)\d{1,2}((\.)\d{1,2})?$/;
      if (path.length < 3) {
        // It's safe to say that path[0] will always be ''
        // so add the second '' and define it as the index
        if (path[1] === '') {
          result.push('index');
        } else {
          // Make sure the path does not contain a locale
          // and maybe something does exist besides ''? (precaution)
          if (!this.isLocale(path[1])) result.push(path[1]);
        }
      } else {
        // For every item in the path
        // check to see if it contains a version or
        // if it's a regular name, then add it to the
        // filtered array
        _lodash2['default'].forEach(path, function (item) {
          //Make sure the path does not contain a locale
          if (!this.isLocale(item)) if (item.match(version)) {
            // Prevent the version dots from being
            // interpreted as a dot notation
            filtered.push(item.replace('.', '*'));
          } else {
            filtered.push(item);
          }
        }, this);

        path = filtered;
        // Once we have filtered
        for (var count = 1; count < path.length; count++) {
          // Make sure the path does not contain a locale
          if (!this.isLocale(path[count])) if (count === 1) {
            if (path[count] === '') result.push('index');else result.push(path[count]);
          } else {
            // Make sure nothing else is empty
            if (path[count] !== '') result.push(path[count]);
          }
        }
      }
      return result;
    }

    /** 
     * Converts an array to a dotted path
     * @param  {Array} array The array that contains the path
     * @return {String}       The dotted path
     */
  }, {
    key: 'toDot',
    value: function toDot(array) {
      array = array ? array : this.toArray();
      if (array.length > 1) return array.join().replace(/,/g, '.');else return array[0];
    }
  }]);

  return Path;
})();

exports['default'] = Path;
module.exports = exports['default'];
//# sourceMappingURL=source maps/path.js.map
