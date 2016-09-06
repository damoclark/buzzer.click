/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var ParamCheck = require('../../../lib/ParamCheck');

function UserDefinedType() {

}

describe('ParamCheck', function() {
    describe('#isInstanceAndTypeOf()', function() {
        it('should return false when not referenced', function() {
            new ParamCheck().isInstanceAndTypeOf().should.be.false();
        });
        it('should return false when null', function() {
            new ParamCheck().isInstanceAndTypeOf(null, '').should.be.false();
        });
        it('should return false when not the correct type',
            function() {
                new ParamCheck().isInstanceAndTypeOf('', 'Int').should.be.false();
            });
        it('should return true when is a built-in type',
            function() {
                new ParamCheck().isInstanceAndTypeOf(1, 'Number').should.be.true();
            });
        it('should return true when is user defined type',
            function() {
                new ParamCheck().isInstanceAndTypeOf(new UserDefinedType(),
                    UserDefinedType).should.be.true();
            });
    });
});
