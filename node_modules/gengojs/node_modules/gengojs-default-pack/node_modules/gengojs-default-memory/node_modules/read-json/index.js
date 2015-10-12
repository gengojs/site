var fs = require("fs");
var call = require("try-call");

module.exports = readJSON;

function readJSON(filename, options, callback){
  if(arguments.length == 2){
    callback = options;
    options = {};
  }

  fs.readFile(filename, options, function(error, bf){
    if(error) return callback(error);
    call(parse.bind(null, bf), callback);
  });

  function parse (bf) {
    return JSON.parse(bf.toString().replace(/^\ufeff/g, ''));
  }

}
