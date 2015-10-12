# gengojs-default-router

The default router plugin for gengo.js.

[![Build Status](https://travis-ci.org/gengojs/plugin-router.svg?branch=master)](https://travis-ci.org/gengojs/plugin-router)

An example usage with options is:

```js

var gengo = require('gengojs');
var router = require('gengojs-default-router');

/* In whatever framework you are using: */

// I'll use express for an example
// but it shouldn't matter

var app = require('express')();
app.use(gengo({
   // Specify the type
   // of option to modify
	router:{
		/* options */
	}
},/*router()*/));
```


## Options

```json
{
	"enabled":false
}
```
## Internal API

* `this.router.toArray()`
	* Should return the URL path as an array.
* `this.router.toDot()`
	* Should return the URL path as an dotted string.
* `this.router.isEnabled()`
	* Should return true if router is enabled.

## Dependencies

Not Applicable

## Debug

Unix:

```bash
DEBUG=gengo.router
```
Windows:

```bash
SET DEBUG=gengo.router
```

See [gengojs-debug](https://github.com/gengojs/gengojs-debug) for usage.

## Contribute

Feel free to contribute or even fork the project.
This plugin has been written in ES6 and can be seen under lib/index.js.
