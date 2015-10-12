import _ from 'lodash';
import debug from 'gengojs-debug';
let log = debug('core');
/**
 * This class determines whether the
 * plugins are properly shipped and
 * sets them for the core.
 * @class Plugify
 */
class Plugify {
  constructor(plugins, options, defaults) {
      log.debug(`class: ${Plugify.name}`, `process: constructor`);
      // Local options
      this.options = {};
      this.defaults = {};
      // Initialize the plugins
      this.plugins = (() => {
        // Check if defaults is empty
        if (_.isEmpty(defaults)) {
          // Fill the defaults with placeholders (functions that don't do anything)
          _.forEach(['api', 'backend', 'parser', 'header', 'localize', 'router'], item => {
            this.defaults[Plugify.normalize(item)] = () => {};
          });
        } else Plugify.unPack(defaults, (key, plugin) => {
          // Unpack the gengo-pack and generate the default plugins
          Plugify.setPlugin(this.defaults, plugin, this.options);
        });
        return this.defaults;
      })();
      // Register the plugins
      this.register(plugins);
      // Debug
      _.forOwn(this.plugins, (value, key) => {
        var name = value.package ? value.package.name : '';
        log.info(
          `class: ${Plugify.name}`,
          `plugins: name - ${name}, type - ${key}, typeof - ${typeof value}`);
      });
      // Create the default options
      _.defaultsDeep(options, this.options);
    }
    /**
     * Registers the plugin
     * @param {Function | Array | Object} The plugin to register
     */
  register(plugins) {
    log.debug(`class: ${Plugify.name}`, `process: register`);
    var process = (plugin) => {
      if (_.isPlainObject(plugin)) {
        if (Plugify.isPack(plugin)) {
          Plugify.unPack(plugin, (key, p) => {
            if (Plugify.assert(p)) {
              Plugify.setPlugin(this.plugins, p, this.options);
            }
          });
        } else
        if (Plugify.assert(plugin)) {
          Plugify.setPlugin(this.plugins, plugin, this.options);
        }
      }
    };
    if (_.isArray(plugins)) {
      _.forEach(plugins, plugin => {
        plugin = _.isFunction(plugin) ? plugin() :
          _.isPlainObject(plugin) ? plugin : undefined;
        process(plugin);
      });
    } else if (_.isFunction(plugins)) {
      process(plugins());
    } else if (_.isPlainObject(plugins)) process(plugins);
  }
  static isPack(plugin) {
      return !_.has(plugin, 'main') && (() => {
        return _.forEach(Object.keys(plugin), key =>
          key === 'api' || key === 'parser' || key === 'backend' ||
          key === 'header' || key === 'localize' || key === 'router');
      })();
    }
    /**
     * Unpacks the gengo-pack and returns the plugin
     * through a callback
     * @param {Object | Function} plugins The plugins to unpack.
     * @param {Function} callback The callback function
     */
  static unPack(plugins, callback) {
      _.forOwn(plugins, (plugin, type) => {
        callback(type, _.isFunction(plugin) ? plugin() : plugin);
      });
    }
    /**
     * Sets the attributes of the plugin
     * @param {Object} object  The object to set its attributes.
     * @param {Object} plugin  The plugin to apply to the object
     * @param {Object} options The options to apply
     */
  static setPlugin(object, plugin, options) {
      log.debug(`class: ${Plugify.name}`, `process: setPlugin`);
      var {
        main, defaults
      } = plugin;
      var {
        type
      } = plugin.package;
      type = Plugify.normalize(type);
      if (object[type]) object[type] = {};
      // Set the plugin fn
      object[type] = main;
      // Set the package
      object[type].package = plugin.package;
      // Set the default options
      if (!options[type])
        options[type] = defaults;
    }
    /**
     * Normalizes a string
     * @param  {String} str The string to normalize
     * @return {String}     The normalized string
     * @private
     */
  static normalize(str) {
      return str.toLowerCase().replace('-', '');
    }
    /**
     * Asserts the plugin is in proper format.
     * @param {object} plugin - The plugin to assert.
     * @private
     */
  static assert(plugin) {
    log.debug(`class: ${Plugify.name}`, `process: assert`);
    try {
      if (!plugin) throw new Error('Whoops! Did you forget to ship your plugin?');
      if (!_.has(plugin, 'main')) throw new Error('Whoops! Did you forget the main function?');
      if (!_.has(plugin, 'package')) throw new Error('Whoops! Did you forget the package?');
      if (!_.has(plugin.package, 'type')) throw new Error('Whoops! Did you forget the "type" of plugin?');
      if (!_.has(plugin.package, 'name')) throw new Error('Whoops! Did you forget the "name" of plugin?');
      if (!_.has(plugin, 'defaults')) throw new Error('Whoops! Did you forget to add the "defaults"?');
    } catch (error) {
      log.error(`class: ${Plugify.name}`,
        error.stack || error.toString());
      return false;
    }
    return true;
  }
}
/**
 * Returns the plugins after creating an instance
 * of Plugify
 * @param  {Object | Function | Array} plugins  The user plugins or plugins to override the default
 * @param  {Object} options  The options to apply to the plugins
 * @param  {Object} defaults The default plugins
 * @return {Plugify}         An instance of Plugify
 */
function plugify(plugins = {}, options = {}, defaults = {}) {
  'use strict';
  return new Plugify(plugins, options, defaults).plugins;
}
/**
 * @module plugify
 */
export default plugify;