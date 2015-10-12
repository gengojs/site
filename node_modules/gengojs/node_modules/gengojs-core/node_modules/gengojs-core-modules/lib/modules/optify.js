import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import debug from 'gengojs-debug';

const log = debug('core');
/*
    ## Options
    
    **Definition**: 

    1. Options must be a string that specifies 
       the path to the options file.
    2. Options must be an object that specifies the type 
       such as 'parser' followed by additional options for
       that type.
       
    **Note**:
    
    * Every plugin created must offer default options and must 
      be responsible with letting the developers know about the options
      for your plugin (through GitHub, etc).
*/
/**
 * This class sets the options used for the plugins
 * @class Optify
 */
class Optify {
  constructor(options) {
    log.debug(`class: ${Optify.name}`, `process: constructor`);
    this.options = {};
    var settings;
    try {
      if (_.isPlainObject(options) && !_.isEmpty(options))
        this.options = options;
      else if (_.isString(options)) {
        // Normalize the string and if it ends in yml replace it
        options = path.normalize(options.replace('yml', 'yaml'));
        // Load the json or javascript file
        if (/\.json/.test(options) || /\.js/.test(options)) {
          settings = require(options);
          this.options = settings;
        } else if (/\.yaml/.test(options)) {
          // Load yaml
          settings = yaml.safeLoad(fs.readFileSync(options, 'utf8'));
          this.options = settings;
        } else {
          throw new Error
            ('Oops! Did you forgt to add the extension? \n' +
              'The supported extensions are .json, .js, and .yaml.');
        }
      } else this.options = settings || {};
    } catch (error) {
      log.error(`class: ${Optify.name}`,
        `error: ${error.stack || error.toString()}`);
    }
  }
}

/**
 * Returns the parsed options after
 * creating an instance of Optify
 * @param  {object} options The options to parse
 * @return {object}         The parsed options
 */
function optify(options) {
  'use strict';
  return new Optify(options).options;
}

/**
 * @module optify
 */
export default optify;