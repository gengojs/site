'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ship;

function ship() {
  'use strict';
  return {
    parser: require('gengojs-default-parser'),
    router: require('gengojs-default-router'),
    backend: require('gengojs-default-memory'),
    api: require('gengojs-default-api'),
    header: require('gengojs-default-header'),
    localize: require('gengojs-default-localize')
  };
}

module.exports = exports['default'];
//# sourceMappingURL=source maps/index.js.map
