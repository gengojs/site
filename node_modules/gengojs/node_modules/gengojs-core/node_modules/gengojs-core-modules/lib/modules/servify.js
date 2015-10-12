import _ from 'lodash';
import debug from 'gengojs-debug';

const log = debug('core');
/**
 * This class detects the server
 * and applies the API to the
 * request and response objects
 * @class Servify
 */
class Servify {
  constructor(core) {
      log.debug(`class: ${Servify.name}`, `process: constructor`);
      this.server = '';
      this.core = core;
    }
    /**
     * Applies the API to the objects
     * @param  {Object}   req  The request object
     * @param  {Object}   res  The request object
     * @param  {Function} next The next function
     * @return {Servify}       The context of Servify
     */
  apply(req, res, next) {
    log.debug(`class: ${Servify.name}`, `process: apply`);
    var _this = this.core;
    // Koa?
    if (this.isKoa(req) && !_.isEmpty(req)) {
      this.server = 'koa';
      // Apply api to koa
      _this.assign(req);
      _this.assign(req.request, req.response);
      if (req.req || req.res) _this.assign(req.req, req.res);
      if (req.state) _this.assign(req.state);
    }
    // Hapi?
    if (this.isHapi(req) && !_.isEmpty(req)) {
      this.server = 'hapi';
      if (req.response)
        if (req.response.variety === 'view')
          _this.assign(req.response.source.context);
      _this.assign(req);
    }
    // Express ?
    if (this.isExpress(req) && !_.isEmpty(req)) {
      this.server = 'express';
      _this.assign(req, res);
      // Apply to API to the view
      if (res && res.locals) _this.assign(res.locals);
    }
    log.info(`class: ${Servify.name}`, `server: ${this.server}`);
    // Make sure next exists and call it.
    if (_.isFunction(next)) next();
    return this;
  }

  /**
   * Determines if the current server is Koa.
   * @param  {Object}  req The request object
   * @return {Boolean} True if the server is Koa.
   */
  isKoa(req) {
      return req && !req.raw ? (req.response && req.request) :
        !_.isEmpty(this.server) ? this.server === 'koa' : false;
    }
    /**
     * Determines if the current server is Hapi.
     * @param  {Object}  req The request object
     * @return {Boolean} True if the server is Hapi.
     */
  isHapi(req) {
      return req ? (req.raw) :
        !_.isEmpty(this.server) ? this.server === 'hapi' : false;
    }
    /**
     * Determines if the current server is Express.
     * @param  {Object}  req The request object
     * @return {Boolean} True if the server is Express.
     */
  isExpress(req) {
    return req && !req.raw ? (req && !req.raw && !req.response) :
      !_.isEmpty(this.server) ? this.server === 'express' : false;
  }
}

/** 
 * Creates an instance of Servify
 * @param  {Core} core The context of Core
 * @return {Servify}      An instance of Servify
 */
function servify(core) {
  'use strict';
  return new Servify(core);
}
/** 
 * @module servify
 */
export default servify;