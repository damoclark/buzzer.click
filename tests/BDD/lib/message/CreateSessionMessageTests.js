/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var CreateSessionMessage = require('../../../../lib/message/CreateSessionMessage');
var Settings = require('../../../../lib/Settings');

describe('CreateSessionMessage', function() {
    describe('#settings', function () {
        it('should set value',
            function () {
                var g = new CreateSessionMessage();
                var s = new Settings();
                g.settings = s;
                g.data._settings.should.equal(s);
            });
        it('should get value',
            function () {
                var g = new CreateSessionMessage();
                var s = new Settings();
                g.data._settings = s;
                g.settings.should.equal(s);
            });            
        it('should throw on set wrong object type',
            function () {
                var g = new CreateSessionMessage();
               (function () {
                    g.settings = 'test';
                }).should.throw();
        });
    });
});
