/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var AddContestantResponse = require('../../../lib/AddContestantResponse');

describe('AddContestantResponse', function() {
    describe('#wasSuccessful', function() {
        it('should throw on set value',
            function() {
                var r = new AddContestantResponse();
                (function() {
                    r.wasSuccessful = false;
                }).should.throw();
            });
        it('should get value',
            function() {
                var r = new AddContestantResponse();
                r._wasSuccessful = true;
                r.wasSuccessful.should.be.true();
            });
    });
    describe('#errorMessage', function() {
        it('should throw on set value',
            function() {
                var r = new AddContestantResponse();
                (function() {
                    r.errorMessage = 'test';
                }).should.throw();
            });
        it('should get value',
            function() {
                var r = new AddContestantResponse();
                r._errorMessage = 'errorMessage_test';
                r.errorMessage.should.equal('errorMessage_test');
            });
    });
    describe('#setNotSuccessful(errorMessage)', function() {
        it('should change the state to not successful', function() {
            var r = new AddContestantResponse();
            r.setNotSuccessful('Test error message');
            r.wasSuccessful.should.be.false();
            r.errorMessage.should.equal('Test error message');
        });
    });
});
