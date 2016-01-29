const assert = require('chai').assert;
const SD = require('../index.js');

describe('equals', () => {

  const date = new Date('2011-06-19 18:40:33.333')
  const invalidDate = new Date('foo')

  it('should throw a type error when provided an invalid date as first argument', () => {
    assert.throws(function() { SD.equals(new Date('invalid'), new Date()) },
      '‘equals’ expected a value of type ValidDate as its first argument; received new Date(NaN)');
  });

  it('should throw a type error when provided an invalid date as second argument', () => {
    assert.throws(function() { SD.equals(new Date(), new Date('invalid')) },
      '‘equals’ expected a value of type ValidDate as its second argument; received new Date(NaN)');
  });

  it('should return false for different dates', () => {
    assert.strictEqual(SD.equals(date, new Date('2013-01-01')), false)
  })

  it('should return true for the same date', () => {
    assert.strictEqual(SD.equals(date, new Date('2011-06-19 18:40:33.333')), true)
  })
})
