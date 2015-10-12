import _ from 'lodash';
/**
 * This class contains custom search
 * algorithms
 * @class Find
 */
class Find {
  constructor(object) {
    this.object = object;
  }
  static find(obj, path) {
      if (!obj || !path)
        return undefined;
      else {
        var i, keys;
        if (path.indexOf('.') !== -1) {
          keys = path.split('.');
          for (i = 0; i < keys.length; i++) {
            if (keys[i].indexOf('*') !== -1) keys[i] = keys[i].replace('*', '.');
            if (obj)
              if (_.has(obj, keys[i])) {
                if (i === (keys.length - 1)) return obj[keys[i]];
                else obj = obj[keys[i]];
                //error or could be global
              } else return undefined;
            else return undefined;
          }
          return obj;
        } else {
          return obj[path];
        }
      }
    }
    // http://bit.ly/1HWJu9o
    /** 
     * Recursively searches for the property
     * @param  {Object} obj      The object
     * @param  {String} property The property to search
     * @return {Object}          The property found.
     */
  static findR(obj, property) {
    if (!obj) return '';
    if (property.length === 0) return obj;

    var found = obj[property[0]];
    var remainder = property.slice(1);
    return Find.findR(found, remainder);
  }
}

export default Find;