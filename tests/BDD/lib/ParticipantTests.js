/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var Participant = require('../../../lib/Participant');

describe('Participant', function() {
    describe('#id', function() {
        it('should set value',
            function() {
                var p = new Participant();
                p.id = 'id_test';
                p._id.should.equal('id_test');
            });
        it('should get value',
            function() {
                var p = new Participant();
                p._id = 'id_test';
                p.id.should.equal('id_test');
            });
    });
    describe('#isDisconnected', function() {
        it('should throw on set value',
            function() {
                var p = new Participant();
                (function() {
                    p.isDisconnected = false;
                }).should.throw();
            });
        it('should get value',
            function() {
                var p = new Participant();
                p._id = 'id_test';
                p.id.should.equal('id_test');
            });
    });
    describe('#disconnect()', function() {
        it('should change participant state to disconnected',
            function() {
                var p = new Participant();
                p._disconnected = false;
                p.disconnect();
                p.isDisconnected.should.be.true();
            });
    });
    describe('#reconnect()', function() {
        it('should change participant state to connected',
            function() {
                var p = new Participant();
                p._disconnected = true;
                p.reconnect();
                p.isDisconnected.should.be.false();
            });
    });
});
