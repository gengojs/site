/*jslint node: true, forin: true, jslint white: true, newcap: true*/
/*
 * gcl
 * author : Takeshi Iwana
 * https://github.com/iwatakeshi
 * license : MIT
 * Code heavily borrowed from Adam Draper
 * https://github.com/adamwdraper
 */
 
(function() {
  'use strict';
 
  var gcl,
      cookiName = 'locale',
      version = '0.0.1',
      hasModule = (typeof module !== 'undefined' && module.exports);
 
    var GCL = function (opt) {
      if(opt){
        if(opt.cookiName){
          cookiName = opt.cookiName;
        }
      }
    };

  gcl = function(opt) {
      if($){
        return new GCL(opt);
      }else{
        throw new Error('Jquery not found.');
      }
  };

  gcl.version = version;

  GCL.prototype.setLocale = function(locale) {
    if(typeof(locale) === String){
      $.cookie(cookiName, locale);
    }else{
      $.cookie(cookiName, $(locale).attr('class'));
    }
    
    location.reload();
  };

  /************************************
      Exposing gcl
  ************************************/
 
  // CommonJS module is defined
  if (hasModule) {
    module.exports = gcl;
  }
 
  /*global ender:false */
  if (typeof ender === 'undefined') {
    // here, `this` means `window` in the browser, or `global` on the server
    // add `gcl` as a global object via a string identifier,
    // for Closure Compiler 'advanced' mode
    this.gcl = gcl;
  }
 
  /*global define:false */
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return gcl;
    });
  }
}).call(this);