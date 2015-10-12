# gengojs-default-localize
The default localisation plugin for gengojs

[![Build Status](https://travis-ci.org/gengojs/plugin-localize.svg?branch=master)](https://travis-ci.org/gengojs/plugin-localize)

This module is a "plugified" version of [Tokei](https://github.com/iwatakeshi/tokei) for [gengo.js](https://github.com/gengojs/gengojs).

## Documentation

See [documentation](https://gengojs.github.io/plugin-localize) or see [Tokei](https://github.com/iwatakeshi/tokei).

An example usage with options is:

```javascript

var gengo = require('gengojs');
var localize = require('gengojs-default-header');

/* In whatever framework you are using: */

// I'll use express for an example
// but it shouldn't matter

var app = require('express')();
app.use(gengo({
   // Specify the type
   // of option to modify
	localize:{
		/* options */
	}
},/*localize()*/));
```
The default localize is already included in gengojs so you should not have to require it.


## Options

None

## Internal API

* `this.localize` from [Tokei](https://github.com/iwatakeshi/tokei)

For more documentation, visit the [Tokei](https://github.com/iwatakeshi/tokei).

## Dependencies

* `this.header.getLocale()` from `Header` class
  * Should return the current locale.

## Debug

Not Applicable

## Contribute

Feel free to contribute or even fork the project. This plugin has been
written in ES6 and can be seen under `lib/index.js`. If you would like
to contribute to the localization library, visit
[Tokei's GitHub page](https://github.com/iwatakeshi/tokei).
