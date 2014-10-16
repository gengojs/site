/*jslint node: true, forin: true, jslint white: true, newcap: true*/
/*global console*/
/*
 * cout.js
 * version : 0.0.5
 * author : Takeshi Iwana
 * license : MIT
 * Code heavily borrowed from Adam Draper
 */

(function() {
  'use strict';

  /************************************
      Constants & Variables
  ************************************/

  var cout,
    // check for nodeJS
    hasModule = (typeof module !== 'undefined' && module.exports),
    VERSION = '0.0.5',
    //npm modules
    util = require('util'),
    _ = require('lodash'),
    colors = require('colors'),
    moment = require('moment'),
    bgmap = {
      black: 'bgBlack',
      red: 'bgRed',
      green: 'bgGreen',
      yellow: 'bgYellow',
      blue: 'bgBlue',
      magenta: 'bgMagenta',
      cyan: 'bgCyan',
      white: 'bgWhite'
    },
    defaults = {
      cout: ['*'],
      theme: {
        data: 'grey',
        debug: 'blue',
        error: 'red',
        help: 'cyan',
        info: 'green',
        input: 'grey',
        prompt: 'grey',
        silly: 'rainbow',
        verbose: 'cyan',
        warn: 'yellow',
      },
      json: {
        space: 2
      },
      newline: '\n',
      timestamp: false
    },
    config = defaults;

  /************************************
      Helpers
  ************************************/
  /*
   * @param input
   * @description if arguments contains any objects
   * then reconstruct the array and use JSON.stringify.
   */
  function filter(input) {
    var array = [];
    _.forEach(input, function(item) {
      if (_.isPlainObject(item)) {
        var space = parseInt(config.json.space) || config.json.space;
        array.push(timestamp(config.newline + JSON.stringify(item, null, space) + config.newline));
      } else {
        if (_.isArray(item)) {
          array.push(timestamp(stringify(item)));
        } else {
          array.push(timestamp(item.toString()));
        }
      }
    });
    return array;
  }

  /*
   * @param array
   * @description transforms an array to a string like array
   */
  function stringify(array) {
    var str = array.toString().split(',').map(function(item) {
      return "'" + item + "'";
    }).toString();
    return str;
  }

  /*
   * @param input
   * @param level
   * @param bg
   * @param styles
   * @description applies the color to the objects
   */
  function apply(input, level, bg, styles) {
    var array = [];
    var result;
    _.forEach(input, function(item) {
      if (bg) {
        result = item[config.theme[level]][bgmap[bg]];
      } else {
        result = item[config.theme[level]];
      }

      if (styles) {
        if (_.isArray(styles)) {
          _.forEach(styles, function(style) {
            result = result[style];
          });
        }
        if (_.isString(styles)) {
          result = result[styles];
        }
      }
      array.push(result);

    });
    return array;
  }

  /*
   * @param input
   * @description if the config specifies certain levels to display
   * then match them and return a boolean
   */
  function match(level) {
    var result;
    if (_.isArray(config.cout)) {
      result = _.indexOf(config.cout, '*') > -1 ? true : _.indexOf(config.cout, level.toString().toLowerCase()) > -1 ? true : false;

    } else if (_.isString(config.cout)) {
      if (level === '*') {
        result = true;
      } else {
        result = config.cout === level;
      }
    } else if (_.isBoolean(config.cout)) {
      if (config.cout === true) {
        result = true;
      }
    }
    return result;
  }

  function timestamp(str) {
    if (_.isBoolean(config.timestamp)) {

      str = config.timestamp ? moment().format() + ":" + config.newline + str : str;

      return str;
    } else if (_.isPlainObject(config.timestamp)) {

      var time = config.timestamp.format ? moment().format(config.timestamp.format) : time = moment().format();
      str = config.timestamp.space ? time + config.timestamp.space + str : time + "\t" + str;

      return str;
    }
  }

  /************************************
      Constructors
  ************************************/

  // cout prototype object
  function Cout(input) {
      this._input = Array.prototype.slice.call(input);
    }
    /************************************
        Top Level Functions
    ************************************/

  cout = function() {
    return new Cout(arguments);
  };

  cout.fn = Cout.prototype = {
    end: function() {
      if (config.cout !== false || normal('normal')) {
        console.log.apply(console, this._input);
      }
    },
    endl: function() {
      if (config.cout !== false || match('normal')) {
        console.log.apply(console, filter(this._input));
      }
    },
    warn: function(opt) {
      if (match('warn')) {
        var bg = opt ? opt.bg : undefined,
          style = opt ? opt.style : undefined;
        console.log.apply(console, apply(filter(this._input), 'warn', bg, style));
      }

    },
    data: function(opt) {

      if (match('data')) {
        var bg = opt ? opt.bg : undefined,
          style = opt ? opt.style : undefined;
        console.log.apply(console, apply(filter(this._input), 'data', bg, style));
      }

    },
    debug: function(opt) {

      if (match('debug')) {
        var bg = opt ? opt.bg : undefined,
          style = opt ? opt.style : undefined;
        console.log.apply(console, apply(filter(this._input), 'debug', bg, style));
      }

    },
    error: function(opt) {

      if (match('error')) {
        var bg = opt ? opt.bg : undefined,
          style = opt ? opt.style : undefined;
        console.log.apply(console, apply(filter(this._input), 'error', bg, style));
      }

    },
    help: function(opt) {

      if (match('help')) {
        var bg = opt ? opt.bg : undefined,
          style = opt ? opt.style : undefined;
        console.log.apply(console, apply(filter(this._input), 'help', bg, style));
      }

    },
    info: function(opt) {

      if (match('info')) {
        var bg = opt ? opt.bg : undefined,
          style = opt ? opt.style : undefined;
        console.log.apply(console, apply(filter(this._input), 'info', bg, style));
      }

    },
    input: function(opt) {

      if (match('input')) {
        var bg = opt ? opt.bg : undefined,
          style = opt ? opt.style : undefined;
        console.log.apply(console, apply(filter(this._input), 'input', bg, style));
      }

    },
    prompt: function(opt) {

      if (match('prompt')) {
        var bg = opt ? opt.bg : undefined,
          style = opt ? opt.style : undefined;
        console.log.apply(console, apply(filter(this._input), 'prompt', bg, style));
      }

    },
    silly: function(opt) {

      if (match('silly')) {
        var bg = opt ? opt.bg : undefined,
          style = opt ? opt.style : undefined;
        console.log.apply(console, apply(filter(this._input), 'silly', bg, style));
      }

    },
    verbose: function(opt) {

      if (match('verbose')) {
        var bg = opt ? opt.bg : undefined,
          style = opt ? opt.style : undefined;
        console.log.apply(console, apply(filter(this._input), 'verbose', bg, style));
      }

    }

  };

  // version number
  cout.version = VERSION;

  cout.config = function(opt) {
    config = _.assign(_.extend(defaults, opt));
    //configure moment's locale
    if (_.isBoolean(config.timestamp)) {
      moment.locale('en');
    } else if (_.isPlainObject(config.timestamp)) {
      if (config.timestamp.locale) {
        moment.locale(config.timestamp.locale);
      } else {
        moment.locale('en');
      }

    }
  };

  cout.kawari = require('kawari');
  /************************************
      Exposing cout
  ************************************/

  // CommonJS module is defined
  if (hasModule) {
    module.exports = cout;
  }

  /*global ender:false */
  if (typeof ender === 'undefined') {
    // here, `this` means `window` in the browser, or `global` on the server
    // add `cout` as a global object via a string identifier,
    // for Closure Compiler 'advanced' mode
    this.cout = cout;
  }

  /*global define:false */
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return cout;
    });
  }
}).call(this);
