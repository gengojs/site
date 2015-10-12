# notation
The official notation used in gengo.js

[![Build Status](https://travis-ci.org/gengojs/notation.svg)](https://travis-ci.org/gengojs/notation)

## Documentation

See [documentation](https://gengojs.github.io/notation)

## Usage

```javascript
import Notation from 'gengojs-notation';
var text = 'Hello world!';

var phrase = new Notation(text).parse();
// -> { type: 'phrase', key: 'Hello world!, seek: undefined }

text = '[Hello world!]';

var bracket = new Notation(text).parse();
// -> { type: 'bracket', key: 'Hello world!, seek: undefined }

text = '[Hello world!].informal';

bracket = new Notation(text).parse();
// -> { type: 'bracket', key: 'Hello world!, seek: 'informal' }

text = 'hello.world';

var dot = new Notation(text).parse();

// -> { type: 'dot', key: 'hello.world', seek: undefined' }

```

## Contribution

Simply fork the project and create a pull request to enhance this project!
