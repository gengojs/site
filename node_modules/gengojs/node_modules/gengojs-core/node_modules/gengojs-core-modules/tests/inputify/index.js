var assert = require('chai').assert;
var __ = require('../../src/modules/inputify');

describe("Inputify", function () {

  describe("api", function () {

    var input = __('Hello', { greet: 'hello' });
    describe("phrase()", function () {
      it('should return a string', function () {
        assert.isFunction(input.phrase);
        assert.typeOf(input.phrase(), 'string');
      });
    });

    describe("arguments()", function () {
      it('should return an array', function () {
        assert.isFunction(input.arguments);
        assert.typeOf(input.arguments(), 'array');
        assert.deepEqual(input.arguments(), []);
      });
    });
    describe("values()", function () {
      it('should return an object', function () {
        assert.isFunction(input.values);
        assert.typeOf(input.values(), 'object');
      });
    });

    describe("hasArgs()", function () {
      it('should return a boolean', function () {
        assert.isFunction(input.hasArgs);
        assert.typeOf(input.hasArgs(), 'boolean');
        assert.strictEqual(input.hasArgs(), false);
      });
    });
    describe("hasValues()", function () {
      it('should return a boolean', function () {
        assert.isFunction(input.hasValues);
        assert.typeOf(input.hasValues(), 'boolean');
        assert.strictEqual(input.hasValues(), true);
      });
    });
  });

  describe("input", function () {
    describe("__('Hello')", function () {
      var input = __('Hello');
      it('should return a phrase', function () {
        assert.strictEqual(input.phrase(), 'Hello');
      });
    });
    describe("__('Hello', ['hello', 'world'])", function () {
      var input = __('Hello', ['hello', 'world']);
      it('should return a phrase and args', function () {
        assert.strictEqual(input.phrase(), 'Hello');
        assert.deepEqual(input.arguments(), ['hello', 'world']);
      });
    });

    describe("__('Hello', {greet:'hello'})", function () {
      var input = __('Hello', { greet: 'hello' });
      it('should return a phrase and values', function () {
        assert.deepEqual(input.values(), { greet: 'hello' });
      });
    });
  });
});