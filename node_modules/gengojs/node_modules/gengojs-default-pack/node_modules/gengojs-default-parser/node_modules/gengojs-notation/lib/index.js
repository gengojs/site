/** @type {Object} The definition for notations */
var notations = {
  bracket: /^\[([\s\S]+)\][\.]?([\w\S]+)*/,
  dot: /\.[^.]/,
  spaces: /\s/
};
/**
 * This class determines whether a
 * string is in phrase, bracket, or dot notation.
 * @class Notation
 */
class Notation {
  constructor(str) {
      this._key = str;
    }
    /**
     * Determines whether a string is in bracket notation
     * @param  {String}  str The string to determine.
     * @return {Boolean}     Returns true if the string is in bracket notation.
     */
  static isBracket(str) {
      let hasBracket = Notation.hasPattern(str, notations.bracket);
      let hasEscaped = str.indexOf('[\\') > -1;
      return hasBracket && !hasEscaped;
    }
    /**
     * Determines whether a string is in dot notation
     * @param  {String}  str The string to determine.
     * @return {Boolean}     Returns true if the string is in dot notation.
     */
  static isDot(str) {
      let hasDot = Notation.hasPattern(str, notations.dot);
      let hasSpaces = Notation.hasPattern(str, notations.spaces);
      return hasDot && !hasSpaces;
    }
    /**
     * Determines whether a string is in dot notation
     * @param  {String}  str The string to determine.
     * @return {Boolean}     Returns true if the string is in dot notation.
     */
  static isPhrase(str) {
      return !Notation.isBracket(str) && !Notation.isDot(str);
    }
    /**
     * Determines whether a string contains the pattern.
     * @param  {String}  str The string to determine.
     * @return {Boolean}     Returns true if the string is in the pattern.
     * @private
     */
  static hasPattern(str, regex) {
      return str.search(regex) !== -1;
    }
    /**
     * Returns the notation type based on the string.
     * @return {Object} Returns the notation type.
     */
  parse() {
    if (Notation.isPhrase(this._key)) {
      return {
        type: 'phrase',
        key: this._key.indexOf('[\\') > -1 ?
          this._key.replace('\\', '') : this._key,
        seek: undefined
      };
    }
    if (Notation.isBracket(this._key)) {
      var result = notations.bracket.exec(this._key);
      return {
        type: 'bracket',
        key: result[1],
        seek: result[2]
      };
    }
    if (Notation.isDot(this._key)) {
      return {
        type: 'dot',
        key: this._key,
        seek: undefined
      };
    }
  }
}

export default Notation;