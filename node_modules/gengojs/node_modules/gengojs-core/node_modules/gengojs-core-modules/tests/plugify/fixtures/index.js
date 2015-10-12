var _ = require('lodash');

function fixture() {
  /*jshint validthis:true, strict: false  */
  return _.isPlainObject(this.options);
}

function fixture1() {
  /*jshint validthis:true, strict: false  */
  return _.isPlainObject(this.options);
}

function fixture2() {
  /*jshint validthis:true, strict: false  */
  return _.isPlainObject(this.options);
}

function fixture3() {
  /*jshint validthis:true, strict: false  */
  return _.isPlainObject(this.options);
}

function fixture4() {
  /*jshint validthis:true, strict: false  */
  return _.isPlainObject(this.options);
}

function fixture5() {
  /*jshint validthis:true, strict: false  */
  return _.isPlainObject(this.options);
}

var gengopack = {
  //exports
  parser: function() {
    'use strict';
    var pkg = {};
    pkg.name = 'mocha-parser';
    // ! add type
    pkg.type = 'parser';
    return {
      main: fixture,
      package: pkg,
      defaults: {
        greet:'hello'
      }
    };
  },
  router: function() {
    'use strict';
    var pkg = {};
    pkg.name = 'mocha-router';
    pkg.type = 'router';
    return {
      main: fixture1,
      package: pkg,
      defaults: {
        greet2:'hello'
      }
    };
  },
  backend: function() {
    'use strict';
    var pkg = {};
    pkg.name = 'mocha-backend';
    pkg.type = 'backend';
    return {
      main: fixture2,
      package: pkg,
      defaults: {
        greet3:'hello'
      }
    };
  },
  api: function() {
    'use strict';
    var pkg = {};
    pkg.name = 'mocha-api';
    pkg.type = 'api';
    return {
      main: fixture3,
      package: pkg,
      defaults: {
        greet4:'hello'
      }
    };
  },
  header: function() {
    'use strict';
    var pkg = {};
    pkg.name = 'mocha-header';
    pkg.type = 'header';
    return {
      main: fixture4,
      package: pkg,
      defaults: {
        greet5:'hello'
      }
    };
  },
  localize: function() {
    'use strict';
    var pkg = {};
    pkg.name = 'mocha-localize';
    pkg.type = 'localize';
    return {
      main: fixture5,
      package: pkg,
      defaults: {
        greet6:'hello'
      }
    };
  }
};

module.exports = function() {
  'use strict';
  return gengopack;
};