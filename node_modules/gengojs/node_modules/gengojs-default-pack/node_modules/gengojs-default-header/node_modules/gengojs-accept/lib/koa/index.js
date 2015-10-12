import accept from '../';
import 'babel/polyfill';
import _ from 'lodash';
export default (opt) => {
  'use strict';
  return function*(next) {
    var methods = [
      'getAcceptLanguage',
      'getLocale',
      'getFromHeader',
      'getFromQuery',
      'getFromDomain',
      'getFromSubdomain',
      'getFromCookie',
      'getFromUrl',
      'detectLocale',
      'isSupported'
    ];
    var a = accept(this, opt);
    _.forEach(methods, (method) => {
      this.accept[method] = a[method].bind(a);
    });
    this.request.accept = this.response.accept = accept(this, opt);
    yield next;
  };
};