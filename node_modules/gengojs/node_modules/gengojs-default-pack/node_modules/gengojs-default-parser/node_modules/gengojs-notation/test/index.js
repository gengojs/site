var
	Notation = require('../src/'),
	chai = require('chai'),
	assert = chai.assert;

describe('Notation', function () {
	describe('isPhrase', function () {
		it('should be defined', function () {
			assert.isDefined(Notation.isPhrase);
		});
		it('should determine correctly', function () {

			assert.isTrue(Notation.isPhrase('[\\hello]'));
			assert.isTrue(Notation.isPhrase('hello'));
			assert.isTrue(Notation.isPhrase('Hello world!'));
			// Use brackets to test
			assert.isFalse(Notation.isPhrase('[hello]'));
			assert.isFalse(Notation.isPhrase('[hello].world'));
			assert.isFalse(Notation.isPhrase('[hello.world]'));
			// Use dots to test
			assert.isFalse(Notation.isPhrase('hello.world'));
		});
	});

	describe('isBracket', function () {
		it('should be defined', function () {
			assert.isDefined(Notation.isBracket);
		});
		it('should determine correctly', function () {
			assert.isTrue(Notation.isBracket('[hello]'));
			assert.isTrue(Notation.isBracket('[hello].world'));
			assert.isTrue(Notation.isBracket('[hello.world]'));
			assert.isTrue(Notation.isBracket('[Test [] ]'));

			assert.isFalse(Notation.isBracket('[\\hello]'));
			assert.isFalse(Notation.isBracket('Hello'));
			assert.isFalse(Notation.isBracket('hello.world'));
		});
	});

	describe('isDot', function () {
		it('should be defined', function () {
			assert.isDefined(Notation.isDot);
		});
		it('should determine correctly', function () {
			assert.isTrue(Notation.isDot('hello.world'));
			assert.isFalse(Notation.isDot('hello'));
		});
	});

	describe('parse', function () {
		describe('phrase', function () {
			it('should correctly get type', function () {
				assert.deepEqual({
					'type': 'phrase',
					'key': 'Hello world',
					'seek': undefined
				}, new Notation('Hello world').parse());
				assert.deepEqual({
					'type': 'phrase',
					'key': '[Hello world]',
					'seek': undefined
				}, new Notation('[\\Hello world]').parse());
			});
		});

		describe('bracket', function () {
			it('should correctly get type', function () {
				assert.deepEqual({
					'type': 'bracket',
					'key': 'Hello world',
					'seek': undefined
				}, new Notation('[Hello world]').parse());

				assert.deepEqual({
					'type': 'bracket',
					'key': 'Hello.world',
					'seek': undefined
				}, new Notation('[Hello.world]').parse());

				assert.deepEqual({
					'type': 'bracket',
					'key': 'Hello world',
					'seek': 'world'
				}, new Notation('[Hello world].world').parse());
			});
		});

		describe('dot', function () {
			it('should correctly get type', function () {
				assert.deepEqual({
					'type': 'dot',
					'key': 'hello.world',
					'seek': undefined
				}, new Notation('hello.world').parse());
			});
		});
	});
});