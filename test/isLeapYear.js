const assert = require('chai').assert;
const isLeapYear = require('../index.js').isLeapYear;

describe('isLeapYear', () => {

  it('should throw a type error when provided an invalid date as second argument', () => {
    assert.throws(function() { isLeapYear(new Date('2015-33-33')) },
      '‘isLeapYear’ expected a value of type ValidDate as its first argument; ' +
      'received new Date(NaN)');
  });

  it('should return false for non leap years', () => {
    assert.strictEqual(isLeapYear(new Date('2015-01-01')), false);
  });

  it('should return true years divisible by 4', () => {
    assert.strictEqual(isLeapYear(new Date('1996-01-01')), true);
  });

  it('should return false for years divisible by 100', () => {
    assert.strictEqual(isLeapYear(new Date('1900-01-01')), false);
  });

  it('should return true for years divisible by 400', () => {
    assert.strictEqual(isLeapYear(new Date('2000-01-01')), true);
  });
});
