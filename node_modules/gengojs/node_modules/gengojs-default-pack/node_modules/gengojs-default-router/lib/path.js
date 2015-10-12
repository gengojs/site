import _ from 'lodash';
import cldr from 'cldr';

/**
 * This class converts the path to
 * an array or a dotted path
 * @class Path
 */
class Path {
  constructor(path) {
      // If the string contains favico.ico
      // replace it with an empty string
      this.path = path.replace('favicon.ico', '');
    }
    /** 
     * Determines if the string contains a locale
     * @param  {String}  str The string to determine
     * @return {Boolean}     Returns true if the string contains a locale.
     */
  isLocale(str) {
      str = str.toLowerCase().replace('-', '_');
      // Compare the locales against cldr
      return _.contains(cldr.localeIds, str);
    }
    /** 
     * Converts the path into an array.
     * @param  {String} path The path to convert
     * @return {Array}      The array that represents the path.
     */
  toArray(path) {
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
        _.forEach(path, function(item) {
          //Make sure the path does not contain a locale
          if (!this.isLocale(item))
            if (item.match(version)) {
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
          if (!this.isLocale(path[count]))
            if (count === 1) {
              if (path[count] === '') result.push('index');
              else result.push(path[count]);
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
  toDot(array) {
    array = array ? array : this.toArray();
    if (array.length > 1) return array.join().replace(/,/g, '.');
    else return array[0];
  }
}

export default Path;