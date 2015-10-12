# gengojs-debug
The debugger console for [gengo.js](http://github.com/gengojs/gengojs)

## Usage

#### ES6
```javascript
import debug from 'gengojs-debug';

debug(namespace:string).[level](args:*);
```
#### ES5
```javascript
var debug = require('gengojs-debug');

debug(namespace:string).[level](args:*);
```

It's even possible to chain the methods:

```javascript
/* Example */

debug('core')
	.warn('This is a warning')
	.error('This is an error!');
```

**Notes**

It's best if you define a logger with a namespace set when you require `gengojs-debug`:

```javascript
/* Example */

var debug = require('gengojs-debug');
var log = debug('core');

log.debug(/*...*/);

```

In terminal:

```bash
# In OSX, set the namespace and the debug level then run a file:
DEBUG=gengo.core:warn, node index.js

# In Windows, set the namespace and the debug level:
DEBUG=gengo.core:warn
# Run the file
node index.js
```

## Namespaces
The available namespaces are:

* core
* parser
* router
* backend
* api
* localize
* header

## Levels

The available levels are:

* debug
* warn
* error
* info
* verbose
* silly

Note that you must prepend `'gengo'` before the namespaces
as you access the namespace with a `'.'` and then specify
the debug level after appending a `':'`.

Example:

```bash
DEBUG=gengo.parser:debug gengo.router:*
```
