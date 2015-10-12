# gengojs-default-header

The default accept plugin for gengo.js.

[![Build Status](https://travis-ci.org/gengojs/plugin-header.svg?branch=master)](https://travis-ci.org/gengojs/plugin-header)

This module is a plugified version of [gengojs-accept](https://github.com/iwatakeshi/gengojs-accept) for [gengo.js](https://github.com/iwatakeshi/gengojs).

## Documentation

See [documentation](https://gengojs.github.io/plugin-header).

## Internal API

* `getLocale(locale:String)`
	* Should return a string of the current locale.
* `setLocale(locale:String)`
	* Should set the locale.
* `detectLocale(locale:String)`
	* Should detect the current locale by parsing the 
	Accept-Language, domains, sub-domains, queries, URLs, and cookies.
* `supported:Array` from options
	* Should be an array of supported locales.

For more see [documentation](https://gengojs.github.io/plugin-header)

## Dependencies

Not Applicable

## Debug

Unix:

```bash
DEBUG=gengo.header
```
Windows:

```bash
SET DEBUG=gengo.header
```

See [gengojs-debug](https://github.com/gengojs/gengojs-debug) for usage.

## Contribute

Feel free to contribute or even fork the project. This plugin has been
written in ES6 and can be seen under `lib/index.js`.
If you would like to contribute to the header parser,
visit [gengojs-accept's GitHub page](https://github.com/gengojs/accept).
