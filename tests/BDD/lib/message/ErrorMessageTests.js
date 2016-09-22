/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var ErrorMessage = require('../../../../lib/message/ErrorMessage');

describe('ErrorMessage', function() {
    describe('#message', function() {
        it('should set value',
            function() {
                var m = new ErrorMessage();
                m.error = 'xyz123';
                m.data._error.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new ErrorMessage();
                m.data._error = 'xyz123';
                m.error.should.equal('xyz123');
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new ErrorMessage();
            m.error = 'xyz123';
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new ErrorMessage();
            m.isValid().should.be.false();
        });
    });
});
