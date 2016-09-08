// /* eslint-disable no-unused-vars */
// var should = require('should');
// /* eslint-enable no-unused-vars */

// var ParticipantJoinRequestMessage = require('../../../../lib/message/ParticipantJoinRequestMessage');

// describe('ParticipantJoinRequestMessage', function() {
//     describe('#sessionId', function () {
//         it('should set value',
//             function () {
//                 var p = new ParticipantJoinRequestMessage();
//                 p.sessionId = 'xyz123';
//                 p.data._sessionid.should.not.be.null();
//                 p.data._sessionid.should.equal('xyz123');
//             });
//         it('should get value',
//             function () {
//                 var p = new ParticipantJoinRequestMessage();
//                 p.data._sessionId = 'xyz123';
//                 p.sessionId.should.not.be.null();
//                 p.sessionId.should.equal('xyz123');
//             });
//     });
//     describe('#participantId', function () {
//         it('should set value',
//             function () {
//                 var p = new ParticipantJoinRequestMessage();
//                 p.participantId = 'xyz123';
//                 p.data._participantid.should.not.be.null();
//                 p.data._participantid.should.equal('xyz123');
//             });
//         it('should get value',
//             function () {
//                 var p = new ParticipantJoinRequestMessage();
//                 p.data._participantId = 'xyz123';
//                 p.participantId.should.not.be.null();
//                 p.participantId.should.equal('xyz123');
//             });
//     });
//     describe('#username', function () {
//         it('should set value',
//             function () {
//                 var p = new ParticipantJoinRequestMessage();
//                 p.username = 'user01';
//                 p.data._username.should.not.be.null();
//                 p.data._username.should.equal('user01');
//             });
//         it('should get value',
//             function () {
//                 var p = new ParticipantJoinRequestMessage();
//                 p.data._username = 'user01';
//                 p.username.should.not.be.null();
//                 p.username.should.equal('user01');
//             });
//     });
//     describe('#isObserver', function () {
//         it('should set value',
//             function () {
//                 var p = new ParticipantJoinRequestMessage();
//                 p.isObserver = true;
//                 p.data._isobserver.should.not.be.null();
//                 p.data._isobserver.should.not.be.false();
//                 p.data._isobserver.should.be.true();
//             });
//         it('should get value',
//             function () {
//                 var p = new ParticipantJoinRequestMessage();
//                 p.data._isobserver = true;
//                 p.isObserver.should.not.be.null();
//                 p.isObserver.should.not.be.false();
//                 p.isObserver.should.be.true();
//             });
//         it('should not set string, should return true',
//             function() {
//                 var p = new ParticipantJoinRequestMessage();
//                 p.isObserver = 'test';
//                 p.isObserver.should.not.be.null();
//                 p.isObserver.should.be.true();
//         });
//     });
// });
