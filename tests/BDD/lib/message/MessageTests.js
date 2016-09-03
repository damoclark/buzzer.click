/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var ConfirmMessage = require('../../../../lib/message/ConfirmMessage');

describe('ConfirmMessage', function() {
    describe('#buzzerError', function () {
        it('should set value',
            function () {
                var c = new ConfirmMessage();
                
                c.buzzerError = new Error("test");
                c.message.should.not.be.null();
                c.message.should.be.equal('test');
            });
        it('should not get value',
            function () {
                var c = new ConfirmMessage();
                (function () {
                    var x = c.buzzerError
                }).should.throw();
            });
    });
});