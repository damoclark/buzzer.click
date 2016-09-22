/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var RoundWonMessage = require('../../../../lib/message/RoundWonMessage');

describe('RoundWonMessage', function() {
    describe('#username', function() {
        it('should set value',
            function() {
                var m = new RoundWonMessage();
                m.username = 'xyz123';
                m.data._username.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new RoundWonMessage();
                m.data._username = 'xyz123';
                m.username.should.equal('xyz123');
            });
    });
    describe('#teamName', function() {
        it('should set value',
            function() {
                var m = new RoundWonMessage();
                m.teamName = 'xyz123';
                m.data._teamName.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new RoundWonMessage();
                m.data._teamName = 'xyz123';
                m.teamName.should.equal('xyz123');
            });
    });    
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new RoundWonMessage();
            m.username = 'xyz123';
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new RoundWonMessage();
            m.isValid().should.be.false();
        });
    });
});
