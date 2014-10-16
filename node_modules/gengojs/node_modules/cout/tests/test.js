var cout = require('../cout.js');

cout.config({
  //should only display level 'warn' and 'silly'
  cout: ['normal', 'warn'],
  timestamp: {
    locale: 'ja',
  }
});

cout("Hello", "World", {
  hello: "world"
}, ['hello', 'world'], 1, 2, 3).end();

cout(['one', 'two', 2], {
  hello: "world"
}, ['hello', 'world']).warn({
  bg: 'black',
  style: 'bold'
});

cout(['one', 'two', 2], {
  hello: "world"
}, ['hello', 'world']).data();

cout(['one', 'two', 2], {
  hello: "world"
}, ['hello', 'world']).debug();

cout(['one', 'two', 2], {
  hello: "world"
}, ['hello', 'world']).silly({
  bg: 'white'
});

cout(cout.kawari('I\'m known as %s', "iwatakeshi")).warn();
