/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var idUtility = require('../../../lib/IdentifierUtility');

describe('IdentifierUtility', function() {
    afterEach(function() {
        idUtility._sessionKeysInUse = [];
    });
    describe('#generateSessionId()', function() {
        it('should return a non-null non-empty key',
            function() {
                idUtility.generateSessionId().should.not.be.equal('').and.not.be.equal(null);
            });
        it('should return a id of the correct length',
            function() {
                idUtility.generateSessionId()
                    .length.should.be.Number().and.equal(idUtility.keyLength);
            });
        it('should record id so it cannot be reused.',
            function() {
                var id = idUtility.generateSessionId();
                idUtility._sessionKeysInUse.find(function(cachedId) {
                    return cachedId === id;
                }).should.equal(id);
            });
    });
    describe('#generateParticipantId()', function() {
        it('should return a UUID',
            function() {
                idUtility.generateParticipantId()
                    .should.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
            });
    });
    describe('#registerSessionIdsInUse(ids)', function() {
        it('should store the ids to stop reuse',
            function() {
                idUtility.registerSessionIdsInUse(['111AAA', '222AAA']);
                idUtility._sessionKeysInUse.length.should.be.aboveOrEqual(2);
                idUtility._sessionKeysInUse.indexOf('111AAA').should.be.aboveOrEqual(0);
                idUtility._sessionKeysInUse.indexOf('222AAA').should.be.aboveOrEqual(0);
            });
    });
    describe('#releaseSessionId(id)', function() {
        it('should return a UUID',
            function() {
                idUtility.registerSessionIdsInUse(['111AAA', '222AAA']);
                idUtility._sessionKeysInUse.indexOf('111AAA').should.be.aboveOrEqual(0);
                idUtility._sessionKeysInUse.indexOf('222AAA').should.be.aboveOrEqual(0);
                idUtility.releaseSessionId('111AAA');
                idUtility._sessionKeysInUse.indexOf('111AAA').should.equal(-1);

            });
    });
});
