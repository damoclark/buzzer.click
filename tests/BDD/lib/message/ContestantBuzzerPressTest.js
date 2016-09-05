/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var ContestantBuzzerPress = require('../../../../lib/message/ContestantBuzzerPress');

describe('ContestantBuzzerPress', function() {
    describe('#init', function () {
        it('should set value to true',
            function () {
                var p = new ContestantBuzzerPress();
                p.data._press.should.not.be.null();
                p.data._press.should.be.true();
            });
    });
});
