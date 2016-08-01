/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      [1,2,3].indexOf(4).should.be.exactly(-1).and.be.a.Number();
    });
  });
});
