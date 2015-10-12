import _ from 'lodash';
import debug from 'gengojs-debug';
import Find from './find';
const log = debug('parser');

/**
 * This class routes the data depending on the
 * structure of the dictionary
 * @class Router
 */
class Router {
  constructor(input, core) {
      this._router = core.router;
      this._header = core.header;
      this._backend = core.backend;

      log
        .debug(`class: ${Router.name}`, `process: constructor`)
        .debug('router exists:', !!this._router)
        .debug('header exists:', !!this._header)
        .debug('header exists:', !!this._backend)
        .debug(
          // Get the locale from either the keyword
          // or header
          'locale:', (this._locale = _.has(input.keywords, 'locale') ?
            this._header.setLocale(input.keywords.locale) :
            this._header.getLocale())
        );

      this._data = this._backend.find(this._locale);
    }
    /**
     * Determines whether router is enabled.
     * @return {Boolean} True if router is enabled
     */
  isEnabled() {
      log
        .debug(`class: ${Router.name}`, `process: isEnabled`)
        .debug('isEnabled: ', this._router.isEnabled());
      return this._router.isEnabled();
    }
    /**
     * Returns the global data based on the keyword
     * @param  {String} keyword The keyword to the value
     * @return {Object}         The value
     */
  global(keyword) {
      log
        .debug(`class: ${Router.name}`, `process: global`);
      var result = this.isEnabled() && keyword ?
        (this._data[keyword]) : this._data;
      log
        .info('global result: ', result);
      return result;
    }
    /**
     * Returns the locale data based on the keyword
     * @param  {String} keyword The keyword to the value
     * @return {Object}         The value
     */
  local() {
    log
      .debug(`class: ${Router.name}`, `process: local`);
    var result;
    //check if router is enabled
    if (this.isEnabled()) {
      //if dot depth is 0 else deep search for the data
      if (this._router.toArray().length === 0) {
        result = (this._data[this._router.toDot()]);
        log.info('local result: ', result);
        return result;
      } else {
        result = Find.find(this._data, this._router.toDot());
        log.info('local result: ', result);
        return result;
      }
    } else return undefined;
  }
}
export default Router;