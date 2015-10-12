var assert = require('chai').assert;
var tokei = require('../src/');
var Intl = require('intl');
var moment = require('moment');

describe('tokei', function() {
    describe('options', function() {
        it('should load options', function(done) {
            assert.isObject(tokei.config());
            assert.isObject(tokei().date({}));
            assert.isObject(tokei().time({}));
            assert.isObject(tokei().number({}));
            done();
        });
    });
    describe('locales', function() {
        it('should load locales', function(done) {
            assert.strictEqual(tokei()._locale, 'en-US');
            assert.strictEqual(tokei('ja')._locale, 'ja');
            done();
        });
    });
    describe('format', function() {
        it('should format date', function(done) {
            var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
            var options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            assert.strictEqual(tokei('de-DE').date(options).format(date), new Intl.DateTimeFormat('de-DE', options).format(date));
            done();
        });
        it('should format time', function(done) {
            var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
            var options = {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short'
            };
            assert.strictEqual(tokei('en-AU').time(options).format(date), new Intl.DateTimeFormat('en-AU', options).format(date));
        	done();
        });
        it('should format number', function (done) {
        	var number = 123456.789;
        	assert.strictEqual(tokei('ar-EG').number().format(number), new Intl.NumberFormat('ar-EG').format(number));
        	done();
        });
    });
	describe('moment', function () {
		describe('locales', function () {
			it('should load locale', function (done) {
				assert.strictEqual(tokei('ja').moment().format('L'),moment().locale('ja').format('L'));
				done();
			});
		});
	});
});