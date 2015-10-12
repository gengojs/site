'use strict';

import debug from 'debug';
import chalk from 'chalk';
import _ from 'lodash';
import util from 'util';
import 'source-map-support/register';
var inspect = function(object) {
  return util.inspect(object, {
    showHidden: true,
    depth: 15
  });
};
/**
 * Debug is a debug wrapper for gengo.js
 * @class Debug
 */
class Debug {
  constructor(namespace) {
    // Set the namespace
    this.namespace = namespace;
    // Set the levels
    var levels = ['debug', 'warn', 'error', 'info', 'verbose', 'silly'];
    // Set up our personal console which 
    // will be build the log functions by type
    this.console = (() => {
      var obj = {};
      var gengo = 'gengo';
      var namespaces = ['core', 'parser', 'router',
        'backend', 'api', 'localize', 'header'
      ];
      // Build it!
      namespaces.forEach(function(namespace) {
        levels.forEach(function(level) {
          var key = gengo + '.' + namespace + ':' + level;
          obj[key] = debug(gengo + '.' + namespace + ':' + level);
        }, this);
      }, this);
      return obj;
    })();

    // Apply color to the arguments if necessary and output them!
    levels.forEach(level => {
      this[level] = (...args) => {
        var namespace = 'gengo' + '.' + this.namespace.toLowerCase() + ':' + level;

        args = args.map(a => {
          var temp;
          try {
            if (!_.isFunction(a) || !_.isString(a))
              temp = inspect(a);
          } catch (error) {}
          return temp || a;
        });
        if (level === 'error') args = args.map(a => {
          return chalk.red(a);
        });
        if (level === 'warn') args = args.map(a => {
          return chalk.yellow(a);
        });
        this.console[namespace].apply(null, args);
        return this;
      };
    });
  }
}

/**
 * Wraps 'debug' and outputs the arguments using namespaces.
 * @param {string} namespace - The namespace of the gengo to debug.
 * @example 
 *  debugify('core.plugins').warn('hello')
 */
export default (namespace) => {
  return new Debug(namespace);
};