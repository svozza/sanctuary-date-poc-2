const assert = require('chai').assert;
const S = require('sanctuary');
const set = require('../index.js').set;

describe('set', () => {
  it('should return a new date', () => {
    const input = new Date('2015-01-01 11:22:33.333');
    const actual = set('milliseconds', 0, input);

    assert.notEqual(actual, input);
  });

  it('should be curried', () => {
    const date = new Date('2015-01-01 11:22:33.333');

    assert(set('seconds', 5, date).equals(set('seconds')(5)(date)));
  });

  it('should throw a type error when provided an invalid time unit', () => {
    assert.throws(function() { set('xxx', new Date('2015-01-02 11:22:33.123')) },
      '‘set’ expected a value of type ("milliseconds" | "seconds" | "minutes" | "hours" | "date" | "month" | "year") ' +
      'as its first argument; received "xxx"');
  });

  it('should not change the original date', () => {
    const input = new Date('2015-01-01 11:22:33.333');

    set('milliseconds', 0, input);
    assert.equal(input.getTime(), new Date('2015-01-01 11:22:33.333').getTime());
  });

  it('should work for milliseconds', () => {
    const input = new Date('2015-01-01 11:22:33.333');
    const actual = set('milliseconds', 123, input);

    assert.equal(S.either(S.I, S.I, actual).getMilliseconds(), 123);
  });

  it('should work for seconds', () => {
    const input = new Date('2015-01-01 11:22:33.333');
    const actual = set('seconds', 12, input);

    assert.equal(S.either(S.I, S.I, actual).getSeconds(), 12);
  });

  it('should work for minutes', () => {
    const input = new Date('2015-01-01 11:22:33.333');
    const actual = set('minutes', 12, input);

    assert.equal(S.either(S.I, S.I, actual).getMinutes(), 12);
  });

  it('should work for hours', () => {
    const input = new Date('2015-01-01 11:22:33.333');
    const actual = set('hours', 12, input);

    assert.equal(S.either(S.I, S.I, actual).getHours(), 12);
  });

  it('should work for date', () => {
    const input = new Date('2015-01-01 11:22:33.333');
    const actual = set('date', 12, input);

    assert.equal(S.either(S.I, S.I, actual).getDate(), 12)
  });

  it('should return a Left if given an invalid date', () => {
    const input = new Date('2015-02-01 11:22:33.333');
    const actual = set('date', 30, input);

    assert(actual.equals(
      S.Left("Setting the date to 30 for Sun Feb 01 2015 11:22:33 GMT+0000 (GMT) resulted in an invalid date.")));
  });

  it('should work for month', () => {
    const input = new Date('2015-01-01 11:22:33.333');
    const actual = set('month', 12, input);

    assert.equal(S.either(S.I, S.I, actual).getMonth() + 1, 12);
  });

  it('should return a Left if given an invalid month', () => {
    const input = new Date('2015-02-01 11:22:33.333');
    const actual = set('month', 13, input);

    assert(actual.equals(
      S.Left("Setting the month to 13 for Sun Feb 01 2015 11:22:33 GMT+0000 (GMT) resulted in an invalid date.")));
  });

  it('should work for year', () => {
    const input = new Date('2015-01-01 11:22:33.333');
    const actual = set('year', 12, input);

    assert.equal(S.either(S.I, S.I, actual).getFullYear(), 12);
  });

});
