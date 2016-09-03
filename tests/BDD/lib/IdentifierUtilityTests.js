/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

//var ParamCheck = require('../../lib/ParamCheck');
var IdentifierUtility = require('../../../lib/IdentifierUtility');
var Sessions = require('../../../lib/Sessions');
var sessions = new Sessions();

describe('IdentifierUtility', function() {
    describe('#generateSessionId()', function() {
        it('should return a non-null non-empty key',
            function() {
                new IdentifierUtility(sessions).generateSessionId()
                    .should.not.be.equal('').and.not.be.equal(null);
            });
        it('should return a key of the correct length',
            function() {
                new IdentifierUtility(sessions).generateSessionId()
                    .length.should.be.Number().and.equal(
                        new IdentifierUtility(sessions).keyLength
                    );
            });
    });
    describe('#generateParticipantId()', function() {
        it('should return a UUID',
            function() {
                new IdentifierUtility(sessions).generateParticipantId()
                    .should.match(
                        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
                    );
            });
    });
});
