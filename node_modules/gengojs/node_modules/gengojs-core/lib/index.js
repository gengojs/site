import pkg from '../package';
import {
  inputify, plugify, optify, servify
}
from 'gengojs-core-modules';
import _ from 'lodash';
const log = require('gengojs-debug')('core');

/**
 * The core of gengo.js
 * @class Gengo
 */
class Gengo {
  /**
   * @constructor 
   * @param {Object} options The options for each plugin.
   * @param {Object | Array | Function} plugins The plugin(s) for the core.
   * @param {Object} defaults The default plugins for the core.
   */
  constructor(options, plugins, defaults) {
      log.debug(`class: ${Gengo.name}`, `process: constructor`)
        // Current version
        .info('version:', (this.version = pkg.version))
        // Options
        .info('options: ', this.options = optify(options));
      // Set Plugins
      this.plugins = plugify(plugins, this.options, defaults);
      // Backend plugin
      if (!_.isEmpty(this.plugins.backend) && this.plugins.backend)
        this.plugins.backend.apply(this);
    }
    /**
     * Parses and i18ns the phrase.
     * @param {Object | String} phrase The phrase to i18n.
     * @param {Array} args The arguments to apply to the phrase.
     * @returns {String} The i18ned phrase.
     */
  parse(phrase, ...args) {
      log.debug(`class: ${Gengo.name}`, `process: parse`);
      // Parser plugin
      return this.plugins.parser.apply(this, [inputify(phrase, args)]);
    }
    /**
     * The Middleware for Node frameworks
     * @param {Object} req The request object.
     * @param {Object} res The response object.
     * @param {Function} next The next function.
     */
  ship(req, res, next) {
      log.debug(`class: ${Gengo.name}`, `process: ship`);
      // Header plugin
      this.plugins.header.apply(this, arguments);
      // Router plugin
      this.plugins.router.apply(this, arguments);
      // Localize plugin
      this.plugins.localize.apply(this, arguments);
      // Apply API to the objects/request/response
      servify(this).apply(req, res, next);
    }
    /**
     * Applies the API to req, res, and other objects.
     * @param {...arguments} arguments The arguments to apply the API.
     * @return {Object} The applied object
     */
  assign() {
    log.debug(`class: ${Gengo.name}`, `process: assign`);
    // API plugin
    return this.plugins.api.apply(this, arguments);
  }
}
/**
 * Creates a new Gengo instance
 */
export default (options, plugins, defaults) => {
  'use strict';
  return new Gengo(options, plugins, defaults);
};