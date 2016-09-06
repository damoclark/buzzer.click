/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var Sessions = require('../../../lib/Sessions');
var Host = require('../../../lib/Host');
var Settings = require('../../../lib/Settings');
var Session = require('../../../lib/Session');

describe('Sessions', function() {
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
