const assert = require('chai').assert;
const SD = require('../index.js');
const date1 = new Date('2013-01-02 11:22:33.123');

describe('SD.diff', () => {
  it('should be curried', () => {
    const date2 = new Date('2013-01-02 11:22:33.223');

    assert.equal(SD.diff('milliseconds')(date1)(date2), SD.diff('milliseconds', date1, date2))
  });

  it('milliseconds', () => {
    const date2 = new Date('2013-01-02 11:22:33.223')

    assert.equal(SD.diff('milliseconds', date1, date2), 100)
  });

  it('seconds', () => {
    const date2 = new Date('2013-01-02 11:22:42.223')

    assert.equal(SD.diff('seconds', date1, date2), 9)
  });

  it('minutes', () => {
    const date2 = new Date('2013-01-02 11:44:33.223')

    assert.equal(SD.diff('minutes', date1, date2), 22)
  });

  it('hours', () => {
    const date2 = new Date('2013-01-02 22:22:33.223')

    assert.equal(SD.diff('hours', date1, date2), 11)
  });

  it('months', () => {
    const date2 = new Date('2014-02-02 22:22:33.223')

    assert.equal(SD.diff('months', date1, date2), 13)
  });

  it('years', () => {
    const date2 = new Date('2015-01-02 22:22:33.223')

    assert.equal(SD.diff('years', date1, date2), 2)
  });

  it('should throw a type error when provided an invalid time unit', () => {
    assert.throws(function() {SD.diff('xxx', date1, new Date())},
      '‘diff’ expected a value of type ("milliseconds" | "seconds" | "minutes" | "hours" | "days" | "months" | "years") ' +
      'as its first argument; received "xxx"');
  });

  it('should throw a type error when provided an invalid date as second argument', () => {
    assert.throws(function() {SD.diff('months', new Date('invalid'), new Date())},
                  '‘diff’ expected a value of type ValidDate as its second argument; ' +
                  'received new Date(NaN)');
  });

  it('should throw a type error when provided an invalid date as third argument', () => {
    assert.throws(function() {SD.diff('months', new Date(), new Date('invalid'))},
                  '‘diff’ expected a value of type ValidDate as its third argument; ' +
                  'received new Date(NaN)');
  });
});
