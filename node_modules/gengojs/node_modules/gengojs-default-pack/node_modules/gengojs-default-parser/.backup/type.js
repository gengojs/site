import Notation from 'gengojs-notation';
import debug from 'gengojs-debug';

import Find from './find';
import Router from './router';
import _ from 'lodash';

var log = debug('parser');

/**
 * This class determines the type
 * of notation used.
 * @class Type
 * @extends {Notation}
 */
class Type extends Notation {
  constructor(input, core) {
      super(input.phrase);
      log
        .debug(`class: ${Type.name}`, `process: constructor`)
        .debug(`router exists: ${ 
        // Set dependencies
        !!(this._router = new Router(input, core))
      }`)
        .debug(`options exists: ${
        // Set options
        !!(this._options = core.options.parser)
      }`);

    }
    /**
     * Finds the data from a string that is a phrase
     * @return {String | Object | undefined}
     */
  getPhrase() {
      var keywords = this._options.keywords,
        result, local, global, key = super.parse().key;
      try {
        // local data is
        local = this._router.local();
        // Check if global data exists
        global = this._router.global(keywords.global);
        // Check if the value exists under that key
        result = _.has(global, key) ?
          global[key] : _.has(local, key) ?
          local[key] : undefined;
      } catch (error) {
        if (this._router.isEnabled())
          log.warn('Oops! Couldn\'t find key: ' + key +
            ' with router enabled.');
        else log.error(error.stack || String(error));
      }
      return result;
    }
    /**
     * Parses a string that contains a bracket notation
     * @return {String | undefined}
     */
  getBracket() {
      var keywords = this._options.keywords,
        key = super.parse().key,
        seek = super.parse().seek,
        result, local, global;
      try {
        // Check if router is enabled and data exists under router
        local = this._router.local();
        // Check if local data exists or even has the value from the key
        if (!_.isUndefined(local))
          local = (_.has(local, key)) ? (local[key] || local) : local;
        // Check if global data exists
        global = this._router.global(keywords.global);
        // Find the phrase in the local scope
        local = _.has(local, key) ? local[key] : undefined;
        // Find the phrase in the global scope
        global = _.has(global, key) ? global[key] : undefined;
        // If the bracket contains a dot notation
        if (seek) {
          //match the dot.dot.dot
          if (Notation.isDot(seek)) {
            //deep search for the data and parse the result
            result = Find.find(local, seek) || Find.find(global, seek);
            //check if key exists
            result = _.has(result, key) ? result[key] : (result || undefined);
          } else result = local ? local[seek] :
            local || global ? global[seek] : global;
        } else {
          // Since it contains only a single dot
          // Check if the local or global scope contains the key
          if (local)
            result = (_.has(local, key)) ? local[key] : local;
          else if (global)
            result = (_.has(global, key)) ? global[key] : global;
        }

      } catch (error) {
        if (this._router.isEnabled())
          log.warn('Oops! Couldn\'t find key: ' + seek || key +
            ' with router enabled.');
        else log.error(error.stack || String(error));
      }
      return result;
    }
    /**
     * Parses a string that contains a dot notation
     * @return {String | undefined}
     */
  getDot() {
    var keywords = this._options.keywords,
      key = super.parse().key,
      result, local, global;
    try {
      // Find the phrase in the local scope
      local = this._router.local();
      // Find the phrase in the global scope
      global = this._router.global(keywords.global);

      result = Find.find(local, key) || Find.find(global, key);
    } catch (error) {
      if (this._router.isEnabled())
        log.warn('Oops! Couldn\'t find key: ' + this._type.key +
          ' with router enabled.');
      else log.error(error.stack || String(error));
    }
    return result;
  }
}

export default Type;