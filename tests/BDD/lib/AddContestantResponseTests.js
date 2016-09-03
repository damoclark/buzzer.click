/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var AddContestantResponse = require('../../../lib/AddContestantResponse');

describe('AddContestantResponse', function() {
    describe('#wasSuccessful', function() {
        it('should set value',
            function() {
                var r = new AddContestantResponse();
                r.wasSuccessful = true;
                r._wasSuccessful.should.be.true();
            });
        it('should get value',
            function() {
                var r = new AddContestantResponse();
                r._wasSuccessful = true;
                r.wasSuccessful.should.be.true();
            });
    });
    describe('#errorMessage', function() {
        it('should set value',
            function() {
                var r = new AddContestantResponse();
                r.errorMessage = 'errorMessage_test';
                r._errorMessage.should.be.equal('errorMessage_test');
            });
        it('should get value',
            function() {
                var r = new AddContestantResponse();
                r._errorMessage = 'errorMessage_test';
                r.errorMessage.should.be.equal('errorMessage_test');
            });
    });
});
