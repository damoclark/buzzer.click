/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var CreateSessionResponseMessage = require('../../../../lib/message/CreateSessionResponseMessage');

describe('CreateSessionResponseMessage', function() {
    describe('#sessionId', function () {
        it('should set value',
            function () {
                var s = new CreateSessionResponseMessage();
                s.sessionId = 'xyz123';
                s.data._sessionId.should.equal('xyz123');
            });
        it('should get value',
            function () {
                var s = new CreateSessionResponseMessage();
                s.data._sessionId = 'xyz123';
                s.sessionId.should.equal('xyz123');
            });
    });
    describe('#hostId', function () {
        it('should set value',
            function () {
                var s = new CreateSessionResponseMessage();
                s.hostId = 'xyz123';
                s.data._hostId.should.equal('xyz123');
            });
        it('should get value',
            function () {
                var s = new CreateSessionResponseMessage();
                s.data._hostId = 'xyz123';
                s.hostId.should.equal('xyz123');
            });
    });    
});
