import Parser from './parser';
import _ from 'lodash';

export default () => {
  'use strict';
  return {
    main: function(input) {
      return new Parser(input, this).parse();
    },
    package: _.merge({
      type: 'parser'
    }, require('../package')),
    defaults: require('../defaults')
  };
};