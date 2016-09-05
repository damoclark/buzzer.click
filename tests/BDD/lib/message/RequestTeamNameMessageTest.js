/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var RequestTeamNameMessage = require('../../../../lib/message/RequestTeamNameMessage');

describe('RequestTeamNameMessage', function() {
    describe('#teamName', function () {
        it('should set value',
            function () {
                var t = new RequestTeamNameMessage();
                t.teamName = 'xyz123';
                t.data._teamname.should.not.be.null();
                t.data._teamname.should.equal('xyz123');
            });
        it('should get value',
            function () {
                var t = new RequestTeamNameMessage();
                t.data._teamname = 'xyz123';
                t.teamName.should.not.be.null();
                t.teamName.should.equal('xyz123');
            });
    });
});
