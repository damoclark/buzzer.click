/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var IdentifierUtility = require('../../../lib/IdentifierUtility');

describe('IdentifierUtility', function() {
    describe('#generateSessionId()', function() {
        it('should return a non-null non-empty key',
            function() {
                new IdentifierUtility().generateSessionId()
                    .should.not.be.equal('').and.not.be.equal(null);
            });
        it('should return a id of the correct length',
            function() {
                new IdentifierUtility().generateSessionId()
                    .length.should.be.Number().and.equal(
                        new IdentifierUtility().keyLength
                    );
            });
        it('should record id so it cannot be reused.',
            function() {
                var util = new IdentifierUtility();
                var id = util.generateSessionId();
                util._sessionKeysInUse.find(function(cachedId){
                    return cachedId === id;
                }).should.equal(id);
            });
    });
    describe('#generateParticipantId()', function() {
        it('should return a UUID',
            function() {
                new IdentifierUtility().generateParticipantId()
                    .should.match(
                        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
                    );
            });
    });
    describe('#registerSessionIdsInUse(ids)', function() {
        it('should store the ids to stop reuse',
            function() {
                var util1 = new IdentifierUtility();
                util1.registerSessionIdsInUse(['111AAA', '222AAA']);
                util1._sessionKeysInUse.length.should.be.aboveOrEqual(2);
                util1._sessionKeysInUse.indexOf('111AAA').should.be.aboveOrEqual(0);
                util1._sessionKeysInUse.indexOf('222AAA').should.be.aboveOrEqual(0);

                var util2 = new IdentifierUtility();
                util2._sessionKeysInUse.indexOf('111AAA').should.be.aboveOrEqual(0);
                util2._sessionKeysInUse.indexOf('222AAA').should.be.aboveOrEqual(0);
            });
    });
    describe('#releaseSessionId(id)', function() {
        it('should return a UUID',
            function() {
                var util1 = new IdentifierUtility();
                util1.registerSessionIdsInUse(['111AAA', '222AAA']);
                util1._sessionKeysInUse.indexOf('111AAA').should.be.aboveOrEqual(0);
                util1._sessionKeysInUse.indexOf('222AAA').should.be.aboveOrEqual(0);
                util1.releaseSessionId('111AAA');
                util1._sessionKeysInUse.indexOf('111AAA').should.equal(-1);

                var util2 = new IdentifierUtility();
                util2.releaseSessionId('222AAA');
                util2._sessionKeysInUse.indexOf('222AAA').should.equal(-1);
            });
    });        
});
