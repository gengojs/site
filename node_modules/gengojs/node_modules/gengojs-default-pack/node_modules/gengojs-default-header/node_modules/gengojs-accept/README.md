# gengojs-accept
Express, Koa, Hapi locale parser that powers [gengo.js](https://github.com/gengojs/gengojs).

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/iwatakeshi/gengojs-accept?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/gengojs/accept.svg)](https://travis-ci.org/gengojs/accept)
[![Dependency Status](https://david-dm.org/gengojs/accept.svg)](https://github.com/gengojs/accept/blob/master/package.json) 
[![License Status](http://img.shields.io/npm/l/gengojs-accept.svg)](https://github.com/iwatakeshi/gengojs-accept/blob/master/LICENSE) 
[![Downloads](http://img.shields.io/npm/dm/gengojs-accept.svg)](https://www.npmjs.com/package/gengojs-accept) [![Version](http://img.shields.io/npm/v/gengojs-accept.svg)](https://www.npmjs.com/package/gengojs-accept)

This module parses the accept-language header from Express, Koa, or Hapi and returns the appropriate locale.


## Documentation

See the beautifully generated documenation at [GitHub](http://gengojs.github.io/accept/index.html).

## Usage

```bash
$ npm i --save gengojs-accept
```

### Express

```javascript
import express from 'express';
import accept from 'gengojs-accept/express';

let app = express();

app.use(accept());

app.use('/', function(req, res, next){
	console.log(req.getLocale());
});

// ...
```

### Hapi

```javascript
import Hapi from 'hapi';
import accept from 'gengojs-accept/hapi';

let server = new Hapi.Server();
server.connection({
	port:3000
})
 
server.register(accept(), function(error){
 	if(error) console.log(error);
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        console.log(request.accept.getLocale());
        reply();
    }
});

// ...
```

### Koa

```javascript
import koa from 'koa';
import accept from 'gengojs-accept/koa';

let app = koa();

app.use(accept());

app.use('/', function *(){
	console.log(this.accept.getLocale());
    // or
    console.log(this.request.accept.getLocale());
    // or
    console.log(this.response.accept.getLocale());
});

// ...
```

### Standalone

```javascript
import accept from 'gengojs-accept';

// pass the request object from express or hapi 
// or the 'this' context from koa;
let currentLocale = accept(req || this, options).getLocale();
```

## Options

```json
{
    "check": true,
    "default": "en-US",
    "supported": [
        "en-US"
    ],
    "keys": {
        "cookie": "locale",
        "query": "locale"
    },
    "detect": {
        "header": true,
        "cookie": false,
        "query": false,
        "url": false,
        "domain": false,
        "subdomain": false
    }
}  

```