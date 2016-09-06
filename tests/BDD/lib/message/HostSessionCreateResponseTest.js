/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var HostSessionCreateResponse = require('../../../../lib/message/HostSessionCreateResponse');

describe('HostSessionCreateResponse', function() {
    describe('#sessionId', function () {
        it('should set value',
            function () {
                var s = new HostSessionCreateResponse();
                s.sessionId = 'xyz123';
                s.data._sessionid.should.not.be.null();
                s.data._sessionid.should.equal('xyz123');
            });
        it('should get value',
            function () {
                var s = new HostSessionCreateResponse();
                s.data._sessionid = 'xyz123';
                s.sessionId.should.not.be.null();
                s.sessionId.should.equal('xyz123');
            });
    });
});
