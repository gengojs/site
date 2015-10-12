# Tokei

Date, time, and number localization for node.js

[![Dependency Status](https://david-dm.org/iwatakeshi/tokei.svg)](https://github.com/iwatakeshi/tokei/blob/master/package.json) [![License Status](http://img.shields.io/npm/l/tokei.svg)](https://github.com/iwatakeshi/tokei/blob/master/LICENSE) [![Downloads](http://img.shields.io/npm/dm/tokei.svg)]() [![Version](http://img.shields.io/npm/v/tokei.svg)]()
[![Build Status](https://travis-ci.org/iwatakeshi/tokei.svg?branch=master)](https://travis-ci.org/iwatakeshi/tokei)

Tokei is a localization library that combines and wraps **Intl.DateTimeFormat**, **Intl.NumberFormat**, and **Moment.js** (including **Moment.js Timezone**) with a very simple API.


## Documentation

See [documentation](http://iwatakeshi.github.io/tokei/).

## Usage

```bash
# Install
npm install --save tokei
```


```javascript
var tokei = require('tokei');

tokei(locale).date().now();
```

## Contribution

I would gladly accept any contribution! Just use gulp to lint and beautify your code.

## Known Issues

Formatting Japanese and Chinese are incorrect so I recommend you to use moment.