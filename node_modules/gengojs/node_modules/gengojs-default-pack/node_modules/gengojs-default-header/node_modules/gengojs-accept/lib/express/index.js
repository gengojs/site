import accept from '../';
import _ from 'lodash';
export default (opt) => {
  'use strict';
  return function(req, res, next) {
    req.accept = res.accept = accept(req, opt);
    if (_.isFunction(next)) next();
  };
};