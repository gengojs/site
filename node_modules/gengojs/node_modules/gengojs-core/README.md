# gengo.js/core

[![Join the chat at https://gitter.im/iwatakeshi/gengojs-core](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/iwatakeshi/gengojs-core?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/gengojs/core.svg?branch=master)](https://travis-ci.org/gengojs/core)
[![Dependency Status](https://david-dm.org/gengojs/core.svg)](https://github.com/iwatakeshi/gengojs-core/blob/master/package.json) [![License Status](http://img.shields.io/npm/l/gengojs-core.svg)](https://github.com/iwatakeshi/gengojs-core/blob/master/LICENSE) [![Downloads](http://img.shields.io/npm/dm/gengojs-core.svg)](https://nodei.co/npm/gengojs-core/)
[![Version](http://img.shields.io/npm/v/gengojs-core.svg)](https://nodei.co/npm/gengojs-core/)

The core of gengo.js that manages i18n and l10n.

## Documentation

See [documentation](https://gengojs.github.io/core/).


## Status

**10/8/15**

Another release!? Yup and it's going fast. **1.0.0-alpha.2** has already been released but expect more alphas to
be released within this month. Also, I have released `sails-hook-gengojs` on npm which will allow you to use
gengo.js in your Sails app as if it was built into Sails in the first place. In future releases expect gengo.js to move from
alpha -> beta -> rc (release candidate). I will also be working on gengojs.com so expect that to happen soon as well! Well, happy coding!

10/6/15

Greetings! As promised, I have added documentation to the core and to the plugins. It should be
self explanatory but if there is something that needs clarification then feel free to create an issue
about it.
As far as gengo.js is concernced, expect **1.0.0-alpha.2** to be released within this week or next (hopefully soon).
I'll also be creating an example app with Sails so that it will show how gengo.js works. I do plan to create a sails hook
that will replace the default i18n of sails so be watching! **;)** In the mean time, please checkout the documentations
of the plugins. Anyways, happy coding!

09/24/15: 

Hey! First of all, apologies for any delays in gengo.js. I've been working on another project
called [Mr Doc](https://www.github.com/mr-doc/mr-doc). It's a tool that generates beautiful docs and I've
improved it because I really needed a better way to document my source. So I hope to go through
everything as I document them well. Some changes did occur as I was working on Mr. Doc. I've decided to
move all gengo.js related projects from my personal Github account to a dedicated [account](https://github.com/gengojs).
There, you will find everthing you need to work on gengo and contribute. Finally, I did generate
the docs for the core so see [Documentation](https://gengojs.github.io/core/). Well, that's all for now! Happy coding!


~~As of 8/29/15, I've decided to go through the core and the plugins and refine them so that it will
be easier to create the docs and hopefully easier to understand how to create plugins.~~

~~Some from the docs below may still work as far as exporting plugins but the idea of internal API
still needs some refinement.~~

## Introduction

**gengojs-core** is the actual core of [gengo.js](https://github.com/gengojs/gengojs). It serves to be
a server agnostic middle-ware supporting the popular servers such as Express,
Koa, Hapi, and even more with ease. It is also modular-tastic, and easy
to debug with less than 40 lines of source code according to [sloc](https://www.npmjs.com/package/sloc).

To get started, there are three things to know about how the core works:

* Initialize
* Ship
* Parse

**Initialize** is the starting point of the core. It handles the initialization of the
plugin's stack, options, and also the back-end. The reason the back-end is initialized first is
because of the possible use of asynchronous programming needs. Note that if you are to
create a plugin for the back-end, you will need to load every locale into memory so that
the parser can readily use the data.

**Ship** is a function that applies the API to requests and also to the view.
It begins by getting the locale from the client, letting the router know about
the current URL path, applying the locale to the localization plugin, and finally
assigning the API such as `__` or `__l` (can be changed) to the objects
that are provided by the request and response..

**Parse** is the final step in the core. It is called only when the API such as
`__('Hello')` are used. In this step, the parser plugin must return the i18ned string.

**So...** you may be wondering why is the core a separate module from the rest? The reason is
because having the core on its own allows you, developers, to create awesome plugins. I personally
feel as if i18n modules are **a bit limited** in what it can do and myself as well.

Anyways, one thing to note is that this module *should not be used on its own*. The actual i18n library is
[gengo.js](https://github.com/gengojs/gengojs). If you want to extend the core to support
server x, then here is where you want to do that but if you want to create the wrapper for server x,
then [gengo.js](https://github.com/gengojs/gengojs) is where you would do that.

## Getting Started

**How gengo.js works** is similar to how Hapi works in terms of creating plugins and how Grunt works
in terms of options.

To create plugins, the one thing to keep in mind is core's `this` context. When a plugin is initialized,
the core calls the plugin as it binds its context to that plugin (see **Creating Plugins**). Another thing to keep in mind is *dependency*. Dependencies are really
internal API. For example, the parser plugin needs to know about the data. Therefore it is dependent on the
back-end plugin and is expecting the back-end to supply an internal API to retrieve the locale/data. To see how dependencies work,
checkout the default plugins. Each plugin show the dependencies and the exposed internal api and also have their own documentation.

* [gengojs-default-api](https://github.com/gengojs/plugin-api)
* [gengojs-default-backend](https://github.com/gengojs/plugin-backend)
* [gengojs-default-header](https://github.com/gengojs/plugin-header)
* [gengojs-default-localize](https://github.com/gengojs/plugin-localize)
* [gengojs-default-parser](https://github.com/gengojs/plugin-parser)
* [gengojs-default-router](https://github.com/gengojs/plugin-router)


## Creating Plugins

**Creating plugins** is quite similar, if not, the same as creating plugins for Hapi. As mentioned above,
the core is really all about context. The following shows you the recommended way to create your plugins:

For this example we will create a dummy header plugin:

### ES5

```javascript
function MyHeaderClass (options){

   this.getLocale = function(){
    // ...
   }
}
```

### ES6

```javascript
class MyHeaderClass {
  constructor (options){
    // ...
  }
  
  getLocale(){
    // ...
  }
}
```

## Exporting Plugins

Now we will export our dummy header plugin. Our plugin must specify a type which we know it's a header but here are the available types:
* parser
* header
* api
* localize
* backend
* router

In this example, I will use [Lodash](https://lodash.com/) to merge the type of plugin
with the package. 

Our plugin must also have defaults provided. 

```javascript
module.exports = function ship() {
 var pkg = require('./package');
  return {
    main: function ship(){
      // Pass options and expose internal API
      this.header = new MyHeaderClass(this.options.header);
    },
    package: _.merge({
      type: 'header'
    }, require('../package')),,
    // Provide option defaults
    defaults: require('./defaults.json')
  };
};
```


**Notes**:

* You may have noticed that defaults are provided in the example. Defaults are required (See **Options**). If you
do not have any defaults, then you can just pass `{}`, and the core will not complain.

* Keep in mind that you are limited to one plugin per type. This was done to prevent problems that may arise
when dealing with the core's context.

## Exporting Multiple Plugins

Now you may be wondering, *Can I release a set of plugins?* The answer is
**YES!**. I call these sets, *packs* or *gengo-pack*. To create a pack, simply export the individual
*ships* like the following:

```javascript
module.exports = function(){
  return {
    parser: /*parser ship*/,
    router: /*router ship*/,
    backend: /*backend ship*/,
    api: /*api ship*/,
    header: /*header ship*/,
    localize: /*localize ship*/
  }
};
```

## Testing your plugins

To test your plugins, simply install the core and also the default plugins needed for your plugin. The simplest way to require all the default plugins is by installing `gengojs-default-pack` which
contains all the default plugins. Since the pack is an object, you
can simply use it like so:

```javascript
var pack = require('gengojs-default-pack');

// Use only what you need
var header = pack.header;
var backend = pack.backend;
// or you can just replace the plugin:
pack.backend = myBackendPlugin;

// Then use the core for tests

var core = require('gengojs-core');

var gengo = core({}, pack);

// Test for your plugins existence:

if(!_.isUndefined(gengo.plugins.backend))
// ...
```

## Options

The core doesn't have the best option system but the official way to access options per plugin is
by the context as in the example:

```javascript
function ship(){
  // To access the options,
  // simply use: this.options[type]:
  console.log(this.options.parser);
}
```
In general, you can access any other plugin's options through the same syntax as in the example, but
make sure to provide the defaults when you create your plugins. The core will apply them to the options
as soon as it loads the plugin.

## Contributing

Feel free to contribute. To contribute, see the requirements. If you have any suggestions,
create issues at the core's [GitHub Issues](https://github.com/gengojs/core). Also,
all ES6 modules are located under `lib/`.

* Requirements
	* Gulp
	* [Airbnb Javascript Style](https://github.com/airbnb/javascript)
	* [semver versioning](http://semver.org/)
	* Fork and Pull
	* Your skills

## Debug

The core uses [gengojs-debug](https://github.com/gengojs/debug), 
an extension of [debug](https://github.com/visionmedia/debug), to output debugging statements. 
To debug, simply set the type of debug in the shell:

Unix:

```bash
$ DEBUG=gengo.core:*
```

Windows

```bash
$ SET DEBUG=gengo.core:*
```

The levels used in the core are:

* debug
* error
* info

## Develop

```bash
# Build modules with gulp for development
gulp
```

## Test

```bash
# Build modules with gulp for production
gulp test
```

## Changelog

See [changelog](https://github.com/gengojs/core/blob/master/CHANGELOG.md).