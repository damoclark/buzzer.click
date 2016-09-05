/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var CreateGameMessage = require('../../../../lib/message/CreateGameMessage');
var Settings = require('../../../../lib/Settings');

describe('CreateGameMessage', function() {
    describe('#settings', function () {
        it('should set settings',
            function () {
                var g = new CreateGameMessage();
                var s = new Settings();
                s.setTeams(true);
                s.setTimeLimit(12);
                s.setName('Fun Game');
                g.settings = s;
                g.settings.should.not.be.null();
            });
        it('should throw on other object',
            function () {
                var g = new CreateGameMessage();
               (function () {
                    var x = g.settings = 'test';
                }).should.throw();
        });
    });
});
