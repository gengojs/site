'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _sprintfJs = require('sprintf-js');

var _sprintfJs2 = _interopRequireDefault(_sprintfJs);

var _string = require('string');

var _string2 = _interopRequireDefault(_string);

var _intlMessageformat = require('intl-messageformat');

var _intlMessageformat2 = _interopRequireDefault(_intlMessageformat);

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

var _gengojsDebug = require('gengojs-debug');

var _gengojsDebug2 = _interopRequireDefault(_gengojsDebug);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _find = require('./find');

var _find2 = _interopRequireDefault(_find);

var log = (0, _gengojsDebug2['default'])('parser');
var _vsprintf = _sprintfJs2['default'].vsprintf;
/**
 * This class parsees the input and returns 
 * the i18n string depending on the parser specified
 * @class Parser
 * @extends {Filter}
 */

var Parser = (function (_Filter) {
  _inherits(Parser, _Filter);

  function Parser(input, core) {
    _classCallCheck(this, Parser);

    _get(Object.getPrototypeOf(Parser.prototype), 'constructor', this).call(this, input);
    log.debug('class: ' + Parser.name, 'process: constructor').debug('filtered input:', this.input = _get(Object.getPrototypeOf(Parser.prototype), 'filter', this).call(this));
    // Set locale
    this.locale = core.header.getLocale();
    // Set options
    this.options = core.options;

    var result = new _type2['default'](this.input, core);
    switch (result.parse().type) {
      case 'phrase':
        this.input.phrase = this.preparse(result.getPhrase());
        log.debug('type', 'phrase').debug('phrase :', this.input.phrase);
        break;
      case 'bracket':
        this.input.phrase = this.preparse(result.getBracket());
        log.debug('type', 'bracket').debug('phrase :', this.input.phrase);
        break;
      case 'dot':
        this.input.phrase = this.preparse(result.getDot());
        log.debug('type', 'dot').debug('phrase :', this.input.phrase);
        break;
    }
  }

  /**
   * Starts the engine and parses the input
   * @return {String} The i18ned string.
   */

  _createClass(Parser, [{
    key: 'parse',
    value: function parse() {
      log.debug('class: ' + Parser.name, 'process: parse').info('parsing phrase:', this.input.phrase);
      if (_lodash2['default'].isUndefined(this.input.phrase)) return '';else {
        var _format, _default;
        try {
          // Parse both at once
          _format = this.formatParser();
          _default = this.defaultParser();
        } catch (error) {
          log.error(error.stack || String(error));
        }
        log.info('selected parser: ', this.input.keywords.parser || this.options.parser.type);
        // Determine if the user specified a parser
        switch (this.input.keywords.parser || this.options.parser.type) {
          case 'default':
            log.info('parse result - default:', _default);
            // Render default
            return _default || '';
          case 'format':
            log.info('parse result - format:', _format);
            // Render format
            return _format || '';
          case '*':
            if (!(0, _string2['default'])(_format).isEmpty() && !(0, _string2['default'])(_default).isEmpty()) {
              var result = '';
              // If interpolation failed for default
              if (/\{[\s\S]*\}/g.test(_default)) {
                result = _format;
              }
              // If interpolation failed for format
              if (/\{[\s\S]*\}/g.test(_format)) {
                result = _default;
              }
              // If all fails then we tried so
              // return the default since it could
              // possibly be that _default and _format
              // are the same.
              if ((0, _string2['default'])(result).isEmpty()) result = _default;
              log.info('parse result:', result);
              return result;
            }
            // If formatted string was empty, then it could be
            // in the default string else just return an empty
            // string.
            else if (!(0, _string2['default'])(_format).isEmpty() && !_default) {
                log.info('parse result - format:', _format);
                return _format;
              } else if (!(0, _string2['default'])(_default).isEmpty() && !_format) {
                log.info('parse result - default:', _default);
                return _default;
              } else return '';
            break;
        }
      }
    }

    /**
     * The default parser
     * @return {String}
     */
  }, {
    key: 'defaultParser',
    value: function defaultParser(str) {
      log.debug('class: ' + Parser.name, 'process: defaultParser');
      var phrase = str || this.input.phrase;
      var _options$parser = this.options.parser;
      var markdown = _options$parser.markdown;
      var template = _options$parser.template;
      var sprintf = _options$parser.sprintf;

      try {
        // Check if markdown is enabled
        if (markdown.enabled) phrase = this.markdown(phrase);
        // Apply interpolation
        if (!_lodash2['default'].isEmpty(this.input.template) && template.enabled) phrase = this.template(phrase);
        // Apply vsprintf
        if (!_lodash2['default'].isEmpty(this.input.arguments) && sprintf.enabled) phrase = this.vsprintf(phrase);
      } catch (error) {
        log.error(error.stack || String(error));
      }
      log.debug('result:', phrase);
      return phrase;
    }

    /**
     * The message formatting parser
     * @return {String}
     */
  }, {
    key: 'formatParser',
    value: function formatParser(str) {
      log.debug('class: ' + Parser.name, 'process: formatParser');
      var phrase = str || this.input.phrase,
          result;
      var markdown = this.options.parser.markdown;

      try {
        // Check if markdown is enabled
        if (markdown.enabled) phrase = this.markdown(phrase);
        // Try to apply message format
        result = this.messageFormat(phrase).format(this.input.template);
      } catch (error) {
        log.error(error.stack || String(error));
      }
      phrase = result;
      log.debug('result:', phrase);
      return phrase;
    }

    /**
     * Finds the translated phrase in the dictionary
     * @param  {Object}
     * @return {String}
     */
  }, {
    key: 'preparse',
    value: function preparse(object) {
      var _options = this.options;
      var parser = _options.parser;
      var header = _options.header;

      var key = this.locale.toLowerCase() === header['default'].toLowerCase() ? parser.keywords['default'] : parser.keywords.translated;
      if (!object) return '';
      // If the object is already a string then return
      if (_lodash2['default'].isString(object)) return object;
      // If it's an object
      if (_lodash2['default'].isPlainObject(object)) {
        // Check if already contains the key 'default' or 'translated'
        if (_lodash2['default'].has(object, key)) {
          return _lodash2['default'].has(object, key) ? object[key] : object;
        }
      }
    }

    /* Messageformat */
  }, {
    key: 'messageFormat',
    value: function messageFormat(str) {
      str = this.preparse(str);
      return !(0, _string2['default'])(str).isEmpty() || !str ? new _intlMessageformat2['default'](str, this.locale) : '';
    }

    /* Markdown */
  }, {
    key: 'markdown',
    value: function markdown(str) {
      return new _markdownIt2['default'](_lodash2['default'].omit(this.options.markdown, 'enabled')).renderInline(str);
    }

    /* Sprintf */
  }, {
    key: 'vsprintf',
    value: function vsprintf(str) {
      return _vsprintf(str, this.input.arguments);
    }

    /* Interpolation */
  }, {
    key: 'template',
    value: function template(str) {
      var _this = this;

      var phrase = str;
      var parser = this.options.parser;

      // Get the opening and closing template
      // from options
      var open = parser.template.open,
          close = parser.template.close;
      if ((0, _string2['default'])(phrase).include(open) && (0, _string2['default'])(phrase).include(close)) {
        var opening = open;
        var closing = close;

        open = opening.replace(/[-[\]()*\s]/g, '\\$&').replace(/\$/g, '\\$');
        close = closing.replace(/[-[\]()*\s]/g, '\\$&').replace(/\$/g, '\\$');
        var r = new RegExp(open + '(.+?)' + close, 'g');
        // Process the interpolation
        var matches = phrase.match(r) || [];
        _lodash2['default'].forEach(matches, function (match) {
          var keys = match.substring(opening.length,
          // Chop {{ and }}
          match.length - closing.length).trim().split('.');
          var value = _find2['default'].findR(_this.input.template, keys);
          phrase = phrase.replace(match, value);
        });
      }
      return phrase;
    }
  }]);

  return Parser;
})(_filter2['default']);

exports['default'] = Parser;
module.exports = exports['default'];
//# sourceMappingURL=source maps/parser.js.map
