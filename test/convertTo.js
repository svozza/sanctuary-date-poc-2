const assert = require('chai').assert;
const SD = require('../index.js');

describe('convertTo', () => {

    const date = new Date(Date.UTC(1973, 11, 28));

    it('should throw a type error when provided an invalid time unit', () => {
        assert.throws(function() {SD.convertTo('xxx', date)},
          '‘convertTo’ expected a value of type ("milliseconds" | "seconds" | "minutes" | "hours" | "days") ' +
          'as its first argument; received "xxx"');
    });

    it('should throw a type error when provided an invalid date', () => {
        assert.throws(function() {SD.convertTo('seconds', new Date('foo'))},
          '‘convertTo’ expected a value of type ValidDate as its second argument; ' +
          'received new Date(NaN)');
    });

    it('should convert a date to Unix time in seconds', () => {
        assert.strictEqual(SD.convertTo('seconds', date), 125884800);
    });

});