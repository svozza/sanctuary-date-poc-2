const assert = require('chai').assert;
const SD = require('../index.js');

describe('get', () => {
  it('should be curried', () => {
    const date = new Date('2015-01-02 11:22:33.123');

    assert.equal(SD.get('seconds')(date), SD.get('seconds', date))
  });

  it('should throw a type error when provided an invalid time unit', () => {
    assert.throws(function() { SD.get('xxx', new Date('2015-01-02 11:22:33.123')) },
      '‘get’ expected a value of type ("milliseconds" | "seconds" | "minutes" | "hours" | "date" | "month" | "year") ' +
      'as its first argument; received "xxx"');
  });

  it('should throw a type error when provided an invalid date as second argument', () => {
    assert.throws(function() { SD.get('year', new Date('invalid')) },
      '‘get’ expected a value of type ValidDate as its second argument; ' +
      'received new Date(NaN)');
  });

  it('should return the milliseconds', () => {
    const input = new Date('2015-01-02 11:22:33.123');
    const milliseconds = SD.get('milliseconds', input);

    assert.equal(milliseconds, 123);
  });
  
  it('should return the seconds', () => {
    const input = new Date('2015-01-02 11:22:33.123');
    const seconds = SD.get('seconds', input);

    assert.equal(seconds, 33);
  });

  it('should return the minutes', () => {
    const input = new Date('2015-01-02 11:22:33.123');
    const minutes = SD.get('minutes', input);

    assert.equal(minutes, 22);
  });

  it('should return the hours', () => {
    const input = new Date('2015-01-02 11:22:33.123');
    const hours = SD.get('hours', input);

    assert.equal(hours, 11);
  });

  it('should return the days', () => {
    const input = new Date('2015-01-02 11:22:33.123');
    const date = SD.get('date', input);

    assert.equal(date, 2);
  });

  it('should return the month', () => {
    const input = new Date('2015-01-02 11:22:33.123');
    const month = SD.get('month', input);

    assert.equal(month, 1);
  });

  it('should return the year', () => {
    const input = new Date('2015-01-02 11:22:33.123');
    const year = SD.get('year', input);

    assert.equal(year, 2015);
  });
});
