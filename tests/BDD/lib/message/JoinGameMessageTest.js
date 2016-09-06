/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var JoinGameMessage = require('../../../../lib/message/JoinGameMessage');

describe('JoinGameMessage', function() {
    describe('#gameCode', function () {
        it('should set value',
            function () {
                var g = new JoinGameMessage();
                g.gameCode = 'xyz123';
                g.data._gamecode.should.not.be.null();
                g.data._gamecode.should.equal('xyz123');
            });
        it('should get value',
            function () {
                var g = new JoinGameMessage();
                g.data._gamecode = 'xyz123';
                g.gameCode.should.not.be.null();
                g.gameCode.should.equal('xyz123');
            });
    });
});
