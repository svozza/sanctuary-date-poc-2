const assert = require('chai').assert;
const min = require('../index.js').min;

describe('min', () => {

  const minDate1 = new Date('2015-01-01 11:22:33.333');
  const minDate2 = new Date('2014-04-09 01:22:33.333');
  const date1 = new Date('2015-06-11 12:00:00.000');
  const date2 = new Date('2015-11-11 09:00:00.000');
  const invalidDate = new Date('invalid');

  it('should return the oldest date', () => {
    assert.equal(min([minDate1, date1]).toString(), minDate1.toString());
    assert.equal(min([minDate1, date1, date2]).toString(), minDate1.toString());
    assert.equal(min([minDate1, minDate2, date1, date2]).toString(), minDate2.toString());
  });

  it('should throw a type error when provided an invalid date', () => {
    assert.throws(function() { min([invalidDate, date1]) },
      '‘min’ expected a value of type (Array ValidDate) as its first argument; ' +
      'received [new Date(NaN), new Date("2015-06-11T11:00:00.000Z")]');
  });

});
