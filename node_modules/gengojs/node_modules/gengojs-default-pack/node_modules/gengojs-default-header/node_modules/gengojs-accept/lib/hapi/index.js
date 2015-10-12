import accept from '../';
export default (opt) => {
  'use strict';
  var register = function(plugin, options, next) {
    plugin.ext('onPreHandler', function(request, reply) {
      if (!request.accept)
        request.accept = accept(request, options);
      reply.continue();
    });
    next();
  };
  register.attributes = {
    name: require('../package').name
  };
  return {
    register: register,
    options: opt || {}
  };
};