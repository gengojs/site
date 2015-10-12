'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gengojsDebug = require('gengojs-debug');

var _gengojsDebug2 = _interopRequireDefault(_gengojsDebug);

var log = (0, _gengojsDebug2['default'])('core');
/**
 * This class detects the server
 * and applies the API to the
 * request and response objects
 * @class Servify
 */

var Servify = (function () {
  function Servify(core) {
    _classCallCheck(this, Servify);

    log.debug('class: ' + Servify.name, 'process: constructor');
    this.server = '';
    this.core = core;
  }

  /** 
   * Creates an instance of Servify
   * @param  {Core} core The context of Core
   * @return {Servify}      An instance of Servify
   */

  /**
   * Applies the API to the objects
   * @param  {Object}   req  The request object
   * @param  {Object}   res  The request object
   * @param  {Function} next The next function
   * @return {Servify}       The context of Servify
   */

  _createClass(Servify, [{
    key: 'apply',
    value: function apply(req, res, next) {
      log.debug('class: ' + Servify.name, 'process: apply');
      var _this = this.core;
      // Koa?
      if (this.isKoa(req) && !_lodash2['default'].isEmpty(req)) {
        this.server = 'koa';
        // Apply api to koa
        _this.assign(req);
        _this.assign(req.request, req.response);
        if (req.req || req.res) _this.assign(req.req, req.res);
        if (req.state) _this.assign(req.state);
      }
      // Hapi?
      if (this.isHapi(req) && !_lodash2['default'].isEmpty(req)) {
        this.server = 'hapi';
        if (req.response) if (req.response.variety === 'view') _this.assign(req.response.source.context);
        _this.assign(req);
      }
      // Express ?
      if (this.isExpress(req) && !_lodash2['default'].isEmpty(req)) {
        this.server = 'express';
        _this.assign(req, res);
        // Apply to API to the view
        if (res && res.locals) _this.assign(res.locals);
      }
      log.info('class: ' + Servify.name, 'server: ' + this.server);
      // Make sure next exists and call it.
      if (_lodash2['default'].isFunction(next)) next();
      return this;
    }

    /**
     * Determines if the current server is Koa.
     * @param  {Object}  req The request object
     * @return {Boolean} True if the server is Koa.
     */
  }, {
    key: 'isKoa',
    value: function isKoa(req) {
      return req && !req.raw ? req.response && req.request : !_lodash2['default'].isEmpty(this.server) ? this.server === 'koa' : false;
    }

    /**
     * Determines if the current server is Hapi.
     * @param  {Object}  req The request object
     * @return {Boolean} True if the server is Hapi.
     */
  }, {
    key: 'isHapi',
    value: function isHapi(req) {
      return req ? req.raw : !_lodash2['default'].isEmpty(this.server) ? this.server === 'hapi' : false;
    }

    /**
     * Determines if the current server is Express.
     * @param  {Object}  req The request object
     * @return {Boolean} True if the server is Express.
     */
  }, {
    key: 'isExpress',
    value: function isExpress(req) {
      return req && !req.raw ? req && !req.raw && !req.response : !_lodash2['default'].isEmpty(this.server) ? this.server === 'express' : false;
    }
  }]);

  return Servify;
})();

function servify(core) {
  'use strict';
  return new Servify(core);
}
/** 
 * @module servify
 */
exports['default'] = servify;
module.exports = exports['default'];
//# sourceMappingURL=../source maps/modules/servify.js.map
