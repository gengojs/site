/*jslint node: true, ass: true, forin: true, newcap: true*/
/*global console*/
/*
 * kawari
 * version : 0.0.1
 * author : Takeshi Iwana
 * https://github.com/iwatakeshi
 * Javascript sprintf
 * http://www.webtoolkit.info/
 */

(function() {
    'use strict';

    var kawari,
        VERSION = "0.0.1",
        hasModule = (typeof module !== 'undefined' && module.exports),
        exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);

    kawari = function() {
        var index = 0,
            string,
            matches = [],
            strings = [],
            stringPosStart = 0,
            stringPosEnd = 0,
            matchPosEnd = 0,
            newString = '',
            match = null,
            substitution;

        rebuild(arguments);
        string = arguments[0];

        while ((match = exp.exec(string))) {
            if (match[9]) {
                index += 1;
            }
            stringPosStart = matchPosEnd;
            stringPosEnd = exp.lastIndex - match[0].length;
            strings[strings.length] = string.substring(stringPosStart, stringPosEnd);

            matchPosEnd = exp.lastIndex;
            matches[matches.length] = {
                match: match[0],
                left: match[3] ? true : false,
                sign: match[4] || '',
                pad: match[5] || ' ',
                min: match[6] || 0,
                precision: match[8],
                code: match[9] || '%',
                negative: parseInt(arguments[index]) < 0 ? true : false,
                argument: String(arguments[index])
            };
        }
        strings[strings.length] = string.substring(matchPosEnd);

        if (matches.length === 0) {
            return string;
        }
        for (var i = 0; i < matches.length; i++) {

            if (matches[i].code == '%') {
                substitution = '%';
            } else if (matches[i].code == 'b') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(2));
                substitution = convert(matches[i], true);
            } else if (matches[i].code == 'c') {
                matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument)))));
                substitution = convert(matches[i], true);
            } else if (matches[i].code == 'd') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)));
                substitution = convert(matches[i]);
            } else if (matches[i].code == 'f') {
                matches[i].argument = String(Math.abs(parseFloat(matches[i].argument)).toFixed(matches[i].precision ? matches[i].precision : 6));
                substitution = convert(matches[i]);
            } else if (matches[i].code == 'o') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(8));
                substitution = convert(matches[i]);
            } else if (matches[i].code == 's') {
                matches[i].argument = matches[i].argument.substring(0, matches[i].precision ? matches[i].precision : matches[i].argument.length);
                substitution = convert(matches[i], true);
            } else if (matches[i].code == 'x') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
                substitution = convert(matches[i]);
            } else if (matches[i].code == 'X') {
                matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
                substitution = convert(matches[i]).toUpperCase();
            } else {
                substitution = matches[i].match;
            }

            newString += strings[i];
            newString += substitution;

        }
        newString += strings[i];

        return newString;
    };

    function convert(match, nosign) {
        if (nosign) {
            match.sign = '';
        } else {
            match.sign = match.negative ? '-' : match.sign;
        }
        var l = match.min - match.argument.length + 1 - match.sign.length;
        var pad = new Array(l < 0 ? 0 : l).join(match.pad);
        if (!match.left) {
            if (match.pad == "0" || nosign) {
                return match.sign + pad + match.argument;
            } else {
                return pad + match.sign + match.argument;
            }
        } else {
            if (match.pad == "0" || nosign) {
                return match.sign + match.argument + pad.replace(/0/g, ' ');
            } else {
                return match.sign + match.argument + pad;
            }
        }
    }

    function rebuild(input) {
        var index;
        if (input[1] instanceof Array) {
            index = 1;
            input[1].forEach(function(source) {
                input[index++] = source;
            });
            return input;
        } else if (typeof input[1] === 'object') {
            if (Object.keys(input[1]).indexOf('0') !== -1) {
                var newInput = [];
                //convert the Object to an array
                Object.keys(input[1]).forEach(function(prop) {
                    newInput.push(input[1][prop]);
                });
                //from the array create a fake arguments object
                index = 1;
                newInput.forEach(function(source) {
                    input[index++] = source;
                });
                return input;
            } else {
                return input;
            }
        } else {
            return input;
        }
    }

    kawari.version = VERSION;

    /************************************
        Exposing kawari
    ************************************/

    // CommonJS module is defined
    if (hasModule) {
        module.exports = kawari;
    }

    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `kawari` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode
        this.kawari = kawari;
    }

    /*global define:false */
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return kawari;
        });
    }
}).call(this);
