# gengojs-default-memory

The default memory backend plugin for gengo.js.

[![Build Status](https://travis-ci.org/gengojs/plugin-backend.svg)](https://travis-ci.org/gengojs/plugin-backend)

This module will be used for [gengo.js](https://github.com/gengojs/gengojs).

## Documentation

See [documentation](https://gengojs.github.io/plugin-backend).

## Usage

An example usage with options is:

```js

var gengo = require('gengojs');
var backend = require('gengojs-default-memory');

/* In whatever framework you are using: */

// I'll use express for an example
// but it shouldn't matter

var app = require('express')();
app.use(gengo({
   // Specify the type
   // of option to modify
	backend:{
		/* options */
	}
},/*backend()*/));
```
The default backend is already included in gengojs so you should not have to require it.


## Options

```json
{
  "directory": "./locales",
  "extension": "json",
  "prefix": "",
  "cache": true
}
```

## Supported Extensions

The supported file types are:

* `.json`
* `.yaml`
* `.js`


## Internal API

* `find(locale:String)`
  * Should return the dictionary by locale
* `catalog(locale:String)` 
  * Should return the dictionary by locale or the entire dictionary.

For more see [documentation](https://gengojs.github.io/plugin-backend)

## Dependencies

Not Applicable

## Debug

Unix:

```bash
DEBUG=gengo.backend
```
Windows:

```bash
SET DEBUG=gengo.backend
```

See [gengojs-debug](https://github.com/gengojs/gengojs-debug) for usage.

## Contribute

Feel free to contribute or even fork the project. This plugin has been
written in ES6 and can be seen under `lib/index.js`.
