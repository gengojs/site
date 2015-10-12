import sprintf from 'sprintf-js';
import S from 'string';
import MessageFormat from 'intl-messageformat';
import Markdown from 'markdown-it';
import debug from 'gengojs-debug';
import _ from 'lodash';

import Filter from './filter';
import Type from './type';
import Find from './find';

var log = debug('parser');
var vsprintf = sprintf.vsprintf;
/**
 * This class parsees the input and returns 
 * the i18n string depending on the parser specified
 * @class Parser
 * @extends {Filter}
 */
class Parser extends Filter {
  constructor(input, core) {
      super(input);
      log
        .debug(`class: ${Parser.name}`, `process: constructor`)
        .debug('filtered input:', (this.input = super.filter()));
      // Set locale
      this.locale = core.header.getLocale();
      // Set options
      this.options = core.options;

      var result = new Type(this.input, core);
      switch (result.parse().type) {
        case 'phrase':
          this.input.phrase = this.preparse(result.getPhrase());
          log
            .debug('type', 'phrase')
            .debug('phrase :', this.input.phrase);
          break;
        case 'bracket':
          this.input.phrase = this.preparse(result.getBracket());
          log
            .debug('type', 'bracket')
            .debug('phrase :', this.input.phrase);
          break;
        case 'dot':
          this.input.phrase = this.preparse(result.getDot());
          log
            .debug('type', 'dot')
            .debug('phrase :', this.input.phrase);
          break;
      }
    }
    /**
     * Starts the engine and parses the input
     * @return {String} The i18ned string.
     */
  parse() {
      log
        .debug(`class: ${Parser.name}`, `process: parse`)
        .info('parsing phrase:', this.input.phrase);
      if (_.isUndefined(this.input.phrase)) return '';
      else {
        var _format, _default;
        try {
          // Parse both at once
          _format = this.formatParser();
          _default = this.defaultParser();
        } catch (error) {
          log.error(error.stack || String(error));
        }
        log.info('selected parser: ',
          this.input.keywords.parser || this.options.parser.type);
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
            if (!S(_format).isEmpty() && !S(_default).isEmpty()) {
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
              if (S(result).isEmpty()) result = _default;
              log.info('parse result:', result);
              return result;
            }
            // If formatted string was empty, then it could be
            // in the default string else just return an empty
            // string.
            else if (!S(_format).isEmpty() && !_default) {
              log.info('parse result - format:', _format);
              return _format;
            } else if (!S(_default).isEmpty() && !_format) {
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
  defaultParser(str) {
      log.debug(`class: ${Parser.name}`, `process: defaultParser`);
      var phrase = str || this.input.phrase;
      var {
        markdown, template, sprintf
      } = this.options.parser;
      try {
        // Check if markdown is enabled
        if (markdown.enabled) phrase = this.markdown(phrase);
        // Apply interpolation
        if (!_.isEmpty(this.input.template) && template.enabled)
          phrase = this.template(phrase);
        // Apply vsprintf
        if (!_.isEmpty(this.input.arguments) && sprintf.enabled)
          phrase = this.vsprintf(phrase);
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
  formatParser(str) {
    log.debug(`class: ${Parser.name}`, `process: formatParser`);
    var phrase = str || this.input.phrase,
      result;
    var {
      markdown
    } = this.options.parser;
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
  preparse(object) {
    var {
      parser, header
    } = this.options;
    var key = (
      this.locale.toLowerCase() ===
      header.default.toLowerCase() ?
      parser.keywords.default : parser.keywords.translated);
    if (!object) return '';
    // If the object is already a string then return
    if (_.isString(object)) return object;
    // If it's an object
    if (_.isPlainObject(object)) {
      // Check if already contains the key 'default' or 'translated'
      if (_.has(object, key)) {
        return _.has(object, key) ? object[key] : object;
      }
    }
  }

  /* Messageformat */
  messageFormat(str) {
    str = this.preparse(str);
    return !S(str).isEmpty() || !str ?
      new MessageFormat(str, this.locale) : '';
  }

  /* Markdown */
  markdown(str) {
    return new Markdown(_.omit(this.options.markdown,
      'enabled')).renderInline(str);
  }

  /* Sprintf */
  vsprintf(str) {
    return vsprintf(str, this.input.arguments);
  }

  /* Interpolation */
  template(str) {
    var phrase = str;
    var {
      parser
    } = this.options;
    // Get the opening and closing template
    // from options
    var open = parser.template.open,
      close = parser.template.close;
    if (S(phrase).include(open) && S(phrase).include(close)) {
      var opening = open;
      var closing = close;

      open = opening.replace(/[-[\]()*\s]/g, '\\$&').replace(/\$/g, '\\$');
      close = closing.replace(/[-[\]()*\s]/g, '\\$&').replace(/\$/g, '\\$');
      var r = new RegExp(open + '(.+?)' + close, 'g');
      // Process the interpolation
      var matches = phrase.match(r) || [];
      _.forEach(matches, match => {
        var keys = match.substring(opening.length,
          // Chop {{ and }}
          match.length - closing.length).trim().split('.');
        var value = Find.findR(this.input.template, keys);
        phrase = phrase.replace(match, value);
      });
    }
    return phrase;
  }
}

export default Parser;