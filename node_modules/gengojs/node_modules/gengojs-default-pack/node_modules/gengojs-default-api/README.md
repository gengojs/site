# gengojs-default-api

The default API plugin for gengo.js.

[![Build Status](https://travis-ci.org/gengojs/plugin-api.svg?branch=master)](https://travis-ci.org/gengojs/plugin-api)

This module will be used for [gengo.js](https://github.com/gengojs/gengojs).

Note: The API examples defined are respect to the [default parser](https://github.com/gengojs/plugin-parser).

## Documentation

See [documentation](https://gengojs.github.io/plugin-api)


An example usage with options is:

```javascript

var gengo = require('gengojs');
var api = require('gengojs-default-api');

/* In whatever framework you are using: */

// I'll use express for an example
// but it shouldn't matter

var app = require('express')();
app.use(gengo({
   // Specify the type
   // of option to modify
	api:{
		/* options */
	}
},/*api()*/));
```

## Internal API

Not Applicable

## Dependencies

* `this.header.getLocale(locale:String)` from `Header`
	* Should return a string of the current locale.
* `this.header.setLocale(locale:String)` from `Header`
	* Should set the locale.
* `this.header.detectLocale(locale:String)` from `Header` (optional)
	* Should detect the current locale by parsing the 
	Accept-Language, domains, sub-domains, queries, URLs, and cookies.
* `this.header.options.supported:Array` from `Header` options
	* Should be an array of supported locales.
* `this.backend.catalog(locale:String)` from `Backend`
	* Should return an object containing the dictionaries for each locale.

## Options

```json
{
	"global":"__",
	"localize":"__l"
}
```

## Debug

Unix:

```bash
DEBUG=gengo.api
```
Windows:

```bash
SET DEBUG=gengo.api
```

See [gengojs-debug](https://github.com/gengojs/gengojs-debug) for usage.

## Contribute

Feel free to contribute or even fork the project. This plugin has been
written in ES6 and can be seen under `lib/index.js`.
