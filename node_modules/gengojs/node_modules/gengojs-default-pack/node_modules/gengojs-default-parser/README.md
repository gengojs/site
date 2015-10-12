# gengojs-default-parser

The default parser plugin for gengo.js.

[![Build Status](https://travis-ci.org/gengojs/plugin-parser.svg?branch=master)](https://travis-ci.org/gengojs/plugin-parser)

This module will be used for [gengo.js](https://github.com/gengojs/gengojs).


## Documentation

See [documentation](https://gengojs.github.io/plugin-parser)

## Usage

An example usage with options is:

```javascript

var gengo = require('gengojs');
var parser = require('gengojs-default-parser');

/* In whatever framework you are using: */

// I'll use express for an example
// but it shouldn't matter

var app = require('express')();
app.use(gengo({
   // Specify the type
   // of option to modify
	parser:{
		/* options */
	}
},/*parser()*/));
```
The default parser is already included in gengojs so you should not have to require it.


## Options

```javascript
{
  // Specify the type of parser to use:
  // default, format, * (all)
  'type': 'default',
  // Markdown options
  'markdown': {
  	// Enable markdown
    'enabled': false,
    // From options 'html' to 'quotes'
    // see https://github.com/markdown-it/markdown-it
    'html': false,
    'xhtmlOut': false,
    'breaks': false,
    'langPrefix': 'language-',
    'linkify': false,
    'typographer': false,
    'quotes': '“”‘’'
  },
  // Interpolation options
  'template': {
  	// Enable Interpolate
    'enabled': true,
    // Openings
    'open': '{{',
    // Closings
    'close': '}}'
  },
  // Sprintf options
  'sprintf': {
    // Enable Sprintf
    'enabled': true
  },
  // Dictionary options
  'keywords': {
	  	// Default key used in dictionary
	  	// when your page is loaded in the
	  	// default language.
    'default': 'default',
    // Translated key used in dictionary
  	// when your page is loaded in a
  	// language other than your default.
    'translated': 'translated',
    // Global key used in dictionary
  	// across views.
    'global': 'global'
  }
}
```
## Internal API

Not Applicable

## Dependencies

* `getLocale(locale:String)` from `Header`
  * Should return a string of the current locale.
* `setLocale(locale:String)` from `Header`
  * Should set the locale.
* `toDot()` from `Router`
  * Should return the URL path as an dotted string.
* `toArray()` from `Router`
  * Should return the URL path as an array.
* `isEnabled()` from `Router`
  * Should return true if router is enabled.

## Selecting a Parser

There are two types of parsers in gengojs-default-parser. The former is the `default` parser
which manages Sprintf and Interpolation, and the latter is `format` which manages
[MessageFormat](https://github.com/yahoo/intl-messageformat).

By default, the former is your primary parser and can be changed in the options. You may also specify the type to use
when you use the [API](https://github.com/iwatakeshi/gengojs-default-api). To do so, see the following example:

```javascript
// Using default parser:
__('Hello', {parser:'default'});
// Using format parser:
__('You have {n, plural, =0 {no photos.}=1 {one photo.}other {# photos.}}', {parser:'format'});
```

## Debug

Unix:

```bash
DEBUG=gengo.parser
```
Windows:

```bash
SET DEBUG=gengo.parser
```

See [gengojs-debug](https://github.com/gengojs/gengojs-debug) for usage.
