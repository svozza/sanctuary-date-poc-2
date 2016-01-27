const assert = require('chai').assert;
const S = require('sanctuary');
const parse = require('../index.js').parse;
//const format = require('../index.js').format;

describe('parse', () => {

  it('should throw a type error when provided a format that is not a string', () => {
    assert.throws(function() { parse(1, '2010-01-02') },
      'parse’ expected a value of type String as its first argument; ' +
      'received 1');
  });

  it('should throw a type error when provided a date that is not a string', () => {
    assert.throws(function() { parse('YYYY-MM-DD', 1) },
      'parse’ expected a value of type String as its second argument; ' +
      'received 1');
  });

  it('should parse YYYY-MM-DD', () => {
    const datestring = '2010-01-02';
    const pattern = 'YYYY-MM-DD';
    const actual = parse(pattern, datestring);
    const expected = new Date(2010, 0, 2);

    assert(actual.equals(S.Right(expected)));
  });

  it('should parse DD/MM/YYYY', () => {
    const datestring = '01/12/2014';
    const pattern = 'DD/MM/YYYY';
    const actual = parse(pattern, datestring);
    const expected = new Date(2014, 11, 1);

    assert(actual.equals(S.Right(expected)));
  });

  it('should parse DD/MM/YY', () => {
    const datestring = '01/12/14';
    const pattern = 'DD/MM/YY';
    const actual = parse(pattern, datestring);
    const expected = new Date(2014, 11, 1);

    assert(actual.equals(S.Right(expected)));
  });

  it('should parse MMMM Do, YYYY', () => {
    const datestring = 'July 5th, 2013';
    const pattern = 'MMMM Do, YYYY';
    const actual = parse(pattern, datestring);
    const expected = new Date('2013-07-05 00:00:00');

    assert(actual.equals(S.Right(expected)));
  });

  it('should parse HH:mm:ss.SSS', () => {
    const datestring = '12:13:14.156';
    const pattern = 'HH:mm:ss.SSS';
    const actual = parse(pattern, datestring);
    const d = new Date();

    d.setHours(12);
    d.setMinutes(13);
    d.setSeconds(14);
    d.setMilliseconds(156);

    assert(actual.equals(S.Right(d)));
  });


  it('should return aeft if given a date before 100-01-01', () => {
    const datestring = '0099-01-01';
    const pattern = 'YYYY-MM-DD';
    const actual = parse(pattern, datestring);

    assert(actual.equals(
      S.Left('The date string "0099-01-01" resulted in an invalid date.')));
  });

  it('should return a Left if given bad Month', () => {
    const datestring = '2015-13-01';
    const pattern = 'YYYY-MM-DD';
    const actual = parse(pattern, datestring);

    assert(actual.equals(
      S.Left('The date string "2015-13-01" resulted in an invalid date.')));
  });

  it('should return Left if given bad Date', () => {
    const datestring = '2015-02-29';
    const pattern = 'YYYY-MM-DD';
    const actual = parse(pattern, datestring);

    assert(actual.equals(
      S.Left('The date string "2015-02-29" resulted in an invalid date.')));
  });

  it('should return a Left if given a bad hour', () => {
    const datestring = '2015-11-01 24:00:00';
    const pattern = 'YYYY-MM-DD HH:mm:ss';
    const actual = parse(pattern, datestring);

    assert(actual.equals(
      S.Left('The date string "2015-11-01 24:00:00" resulted in an invalid date.')));
  });

  it('should return Invalid Date if given a bad minute', () => {
    const datestring = '2015-11-01 22:60:00';
    const pattern = 'YYYY-MM-DD HH:mm:ss';
    const actual = parse(pattern, datestring);

    assert(actual.equals(
      S.Left('The date string "2015-11-01 22:60:00" resulted in an invalid date.')));
  });

  it('should return Invalid Date if given bad seconds', () => {
    const datestring = '2015-11-01 22:00:60';
    const pattern = 'YYYY-MM-DD HH:mm:ss';
    const actual = parse(pattern, datestring);

    assert(actual.equals(
      S.Left('The date string "2015-11-01 22:00:60" resulted in an invalid date.')));
  });

});
