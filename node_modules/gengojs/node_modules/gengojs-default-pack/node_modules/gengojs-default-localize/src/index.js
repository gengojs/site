'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var tokei = require('tokei');
var _ = require('lodash');

exports['default'] = function () {
  'use strict';
  return {
    main: function main() {
      tokei.locale(this.header.getLocale());
      this.localize = tokei;
    },
    'package': _.merge({
      type: 'localize'
    }, require('../package')),
    defaults: {}
  };
};

module.exports = exports['default'];
//# sourceMappingURL=source maps/index.js.map
