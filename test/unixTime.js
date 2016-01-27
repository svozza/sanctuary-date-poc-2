const assert = require('chai').assert;
const unixTime = require('../index.js').unixTime;

describe('unixTime', () => {

  it('should throw a type error when provided an invalid date as second argument', () => {
    assert.throws(function() { unixTime(new Date('2015-33-33')) },
      '‘unixTime’ expected a value of type ValidDate as its first argument; ' +
      'received new Date(NaN)');
  });

  it('should return the time in seconds for valid dates', () => {
    assert.equal(unixTime(new Date(Date.UTC(1999, 1, 7))), 918345600);
  });

});
