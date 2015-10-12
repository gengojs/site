'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _2 = require('../');

var _3 = _interopRequireDefault(_2);

require('babel/polyfill');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

exports['default'] = function (opt) {
  'use strict';
  return regeneratorRuntime.mark(function callee$1$0(next) {
    var methods, a;
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      var _this = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          methods = ['getAcceptLanguage', 'getLocale', 'getFromHeader', 'getFromQuery', 'getFromDomain', 'getFromSubdomain', 'getFromCookie', 'getFromUrl', 'detectLocale', 'isSupported'];
          a = (0, _3['default'])(this, opt);

          _lodash2['default'].forEach(methods, function (method) {
            _this.accept[method] = a[method].bind(a);
          });
          this.request.accept = this.response.accept = (0, _3['default'])(this, opt);
          context$2$0.next = 6;
          return next;

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  });
};

module.exports = exports['default'];
//# sourceMappingURL=../source maps/koa/index.js.map