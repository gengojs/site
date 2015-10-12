/**
 * Takeshi Iwana aka iwatakeshi
 * MIT 2015
 * Router
 * This module parses the routes
 * and sets the dot notation
 * according to the path.
 */
import _ from 'lodash';
import debug from 'gengojs-debug';
import Path from './path';
var log = debug('router');

/**
 * @class Router
 * @extends Path
 */
class Router extends Path {
  constructor(path, enabled) {
      super(path);
      this.enabled = enabled;
    }
    /**
     * Determines if router is enabled
     * @return {Boolean} Returns true if router is enabled.
     */
  isEnabled() {
    return this.enabled;
  }
}

export default () => {
  'use strict';
  return {
    main: function ship(req) {
      // Set options
      var options = this.options.router;
      // Expose internal API
      this.router = new Router(req.path, options.enabled);
      // Debug
      if (this.router && options.enabled)
        log.debug(
          'path:', this.router.path,
          'toArray:', this.router.toArray(),
          'toDot:', this.router.toDot());
    },
    package: _.merge({
      type: 'router'
    }, require('../package')),
    defaults: require('../defaults'),
    // Export the class for
    // test purposes
    mock: Router
  };
};