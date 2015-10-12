import _ from 'lodash';
import debug from 'gengojs-debug';

const log = debug('core');
/**
 * This class extracts the input and seperates the arguments
 * into phrase, args, and values.
 * @class Extractify
 */
class Extractify {
  constructor(phrase, array) {
    // Debug the current process
    log.debug(`class: ${Extractify.name}`, `process: constructor`);
    // Store the extracted values
    var values = {},
      // Stores the extracted arguments
      args = [],
      // Temp
      value,
      // Stores the length of the array
      length = array ? array.length : 0;
    // Debug the inputs
    log.debug('phrase:', phrase)
      .debug('array', array)
      .debug('length:', length);
    // If the arguments are greater than 2 (because of offset)
    if (length > 1) {
      // Just append them to the array
      array.forEach(item => args.push(item));
    }
    // If they are exactly 2 arguments
    else if (length === 1) {
      // Get the first value
      value = array[0];
      // Set arguments [...]
      if (_.isArray(value)) args = value;
      else if (_.isPlainObject(value)) args = [];
      else args.push(value);
      // Set values {...}
      values = _.isPlainObject(value) ? value : {};
    }
    // If called like __({phrase:'hello', locale:'en'})
    if (_.isPlainObject(phrase) && !_.isEmpty(values)) {
      if (_.has(phrase, 'locale')) values.locale = phrase.locale;
      if (_.has(phrase, 'phrase')) phrase = phrase.phrase;
    }
    // Store the extracted arguments
    this.extracts = {
      phrase, values, args
    };
  }
}

/**
 * @module Extractify
 */
export default Extractify;