const assert = require('chai').assert;
const max = require('../index.js').max;

describe('max', () => {

  const maxDate1 = new Date('2014-01-01 11:22:33.333');
  const maxDate2 = new Date('2015-04-09 01:22:33.333');
  const date1 = new Date('2013-06-11 12:00:00.000');
  const date2 = new Date('2011-06-19 18:40:00.000');
  const invalidDate = new Date('invalid');

  it('should return the oldest date', () => {
    assert.equal(max([maxDate1, date1]).toString(), maxDate1.toString());
    assert.equal(max([maxDate1, date1, date2]).toString(), maxDate1.toString());
    assert.equal(max([maxDate1, maxDate2, date1, date2]).toString(), maxDate2.toString());
  });

  it('should throw a type error when provided an invalid date', () => {
    assert.throws(function() { max([invalidDate, date1]) },
      '‘max’ expected a value of type (Array ValidDate) as its first argument; ' +
      'received [new Date(NaN), new Date("2013-06-11T11:00:00.000Z")]');
  });

});
