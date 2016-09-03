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
});
