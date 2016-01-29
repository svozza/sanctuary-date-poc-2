const assert = require('chai').assert;
const SD = require('../index.js');
const S = require('sanctuary');

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

describe('add', () => {
  it('should return a new date with the correct time difference', () => {
    const date = new Date('2015-01-01');
    const actual = SD.add('days', 2, date);

    assert.notEqual(date, actual, 'should return a new date');
    assert.equal(date.toString(), new Date('2015-01-01').toString(), 'should not change the original date');
    assert.ok(actual.equals(S.Right(new Date('2015-01-03'))));
  });

  it('should be curried', () => {
    const date = new Date('2015-01-01');

    assert.ok(SD.add('days', 2, date).equals(SD.add('days')(2)(date)));
  });

  it('should work for milliseconds', () => {
    const actual = SD.add('milliseconds', 1, new Date(0));

    assert.equal(1, S.either(S.I, S.I, actual).getTime());
  });

  it('should work for seconds', () => {
    const actual = SD.add('seconds', 1, new Date(0));

    assert.equal(SECOND, S.either(S.I, S.I, actual).getTime());
  });

  it('should work for minutes', () => {
    const actual = SD.add('minutes', 1, new Date(0));

    assert.equal(MINUTE, S.either(S.I, S.I, actual).getTime());
  });

  it('should work for hours', () => {
    const actual = SD.add('hours', 1, new Date(0));

    assert.equal(HOUR, S.either(S.I, S.I, actual).getTime());
  });

  it('should work for days', () => {
    const actual = SD.add('days', 1, new Date(0));

    assert.equal(DAY, S.either(S.I, S.I, actual).getTime());
  });

  it('should work for months', () => {
    const actual = SD.add('months', 1, new Date(0));

    assert.equal(1, S.either(S.I, S.I, actual).getMonth());
  });

  it('should work for years', () => {
    const actual = SD.add('years', 1, new Date(0));

    assert.equal(1971, S.either(S.I, S.I, actual).getFullYear())
  });

  it('should throw a type error when provided an invalid time unit', () => {
    assert.throws(function() { SD.add('xxx', 1, new Date()) },
      '‘add’ expected a value of type ("milliseconds" | "seconds" | "minutes" | "hours" | "days" | "months" | "years") ' +
      'as its first argument; received "xxx"');
  });

  it('should throw a type error when provided an increment value that is not a number', () => {
    assert.throws(function() { SD.add('months', 'xxx', new Date()) },
      'add’ expected a value of type Integer as its second argument; ' +
      'received "xxx"');
  });

  it('should throw a type error when provided an invalid date', () => {
    assert.throws(function() { SD.add('months', 1, new Date('invalid')) },
      '‘add’ expected a value of type ValidDate as its third argument; ' +
      'received new Date(NaN)');
  });

  it('should return a Left if the step results in an invalid date', () => {
    const actual = SD.add('months', 1, new Date('2015-01-30'));
    assert.ok(actual.equals(S.Left(
      "Incrementing Fri Jan 30 2015 00:00:00 GMT+0000 (GMT) by 1 months resulted in an invalid date.")));
  });

});
