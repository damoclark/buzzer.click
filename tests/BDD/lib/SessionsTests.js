/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var Sessions = require('../../../lib/Sessions');
var Host = require('../../../lib/Host');
var Settings = require('../../../lib/Settings');
var Session = require('../../../lib/Session');

describe('Sessions', function() {
    describe('#all', function() {
        it('should throw on set value', function() {
            var collection = new Sessions();
            (function() {
                collection.all = [];
            }).should.throw();
        });
        it('should get value', function() {
            s = new Session('s1', new Settings(), new Host());
            var collection = new Sessions();
            collection._sessions.push(s);
            collection.all[0].should.equal(s);
        });
        it('should get copy of val and not reference',
            function() {
                s = new Session('s1', new Settings(), new Host());
                var collection = new Sessions();
                collection._sessions.push(s);
                collection.all.pop();
                collection.all[0].should.equal(s);
            });
    });    
    describe('#add(host, settings)', function() {
        it('add and return session', function() {
            var sessions = new Sessions();
            var host = new Host();
            var settings = new Settings();
            var session = sessions.add(host, settings);
            session.should.be.instanceof(Session);
        });
    });
    describe('#getById(id)', function() {
        it('when given valid id should return session', function() {
            var sessions = new Sessions();
            var host = new Host();
            var settings = new Settings();
            /* eslint-disable no-unused-vars */
            var session1 = sessions.add(host, settings);
            /* eslint-enable no-unused-vars */
            var session2 = sessions.add(host, settings);
            var sessionLocate = sessions.getById(session2.id);
            sessionLocate.should.be.instanceof(Session)
                .and.equal(session2);
        });
    });
    describe('#purgeCompleted()', function() {
    });    
});
