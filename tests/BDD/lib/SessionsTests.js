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
            var sc = new Sessions();
            (function() {
                sc.all = [];
            }).should.throw();
        });
        it('should get value', function() {
            s = new Session('s1', new Settings(), new Host());
            var sc = new Sessions();
            sc._sessions.push(s);
            sc.all[0].should.equal(s);
        });
        it('should get copy of val and not reference',
            function() {
                s = new Session('s1', new Settings(), new Host());
                var sc = new Sessions();
                sc._sessions.push(s);
                sc.all.pop();
                sc.all[0].should.equal(s);
            });
    });
    describe('#add(host, settings)', function() {
        it('add and return session', function() {
            var sc = new Sessions();
            var h = new Host();
            var s = new Settings();
            var ses = sc.add(h, s);
            ses.should.be.instanceof(Session);
        });
    });
    describe('#getById(id)', function() {
        it('when given valid id should return session', function() {
            var sc = new Sessions();
            var h = new Host();
            var s = new Settings();
            /* eslint-disable no-unused-vars */
            var ses1 = sc.add(h, s);
            /* eslint-enable no-unused-vars */
            var ses2 = sc.add(h, s);
            var sessionLocate = sc.getById(ses2.id);
            sessionLocate.should.be.instanceof(Session)
                .and.equal(ses2);
        });
    });
    describe('#purgeCompleted()', function() {
        it('should remove complete sc', function() {
            var sc = new Sessions();
            sc.add(new Host(), new Settings());
            sc.add(new Host(), new Settings());
            sc.add(new Host(), new Settings());
            sc.add(new Host(), new Settings());
            sc.add(new Host(), new Settings());

            sc.all[0].complete();
            sc.all[1].complete();

            sc.purgeCompleted();

            sc.all.length.should.equal(3);
        });
    });
});
