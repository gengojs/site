var tokei = require('tokei');
var _ = require('lodash');
export
default () => {
  'use strict';
  return {
    main: function() {
      tokei.locale(this.header.getLocale());
      this.localize = tokei;
    },
    package: _.merge({
      type: 'localize'
    }, require('../package')),
    defaults: {}
  };
};