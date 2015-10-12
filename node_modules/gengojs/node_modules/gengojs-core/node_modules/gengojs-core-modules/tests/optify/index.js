var assert = require('chai').assert;
var optify = require('../../src/modules/optify');
var path = require('path');
var fixtures = path.resolve(__dirname, '../optify/fixtures/');

describe("Optify", function() {
   describe("JS", function() {
       var options = optify(path.join(fixtures, 'options.js'));
       it("should return the test options from path", function(){
           assert.isObject(options);
           assert.deepEqual(options, {greet:true});
       });
       
       options = optify({greet:true});
       it("should return the test options from object", function() {
           assert.isObject(options);
           assert.deepEqual(options, {greet:true});
       });
   });
   
   describe("JSON", function() {
        var options = optify(path.join(fixtures, 'options.js'));
       it("should return the test options from path", function(){
           assert.isObject(options);
           assert.deepEqual(options, {greet:true});
       });
   });
   
   describe("YAML", function() {
        var options = optify(path.join(fixtures, 'options.js'));
       it("should return the test options from path", function(){
           assert.isObject(options);
           assert.deepEqual(options, {greet:true});
       });
   });
});