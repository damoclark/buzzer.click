// /* eslint-disable no-unused-vars */
// var should = require('should');
// /* eslint-enable no-unused-vars */

// var ContestantJoinResponseMessage = require('../../../../lib/message/ContestantJoinResponseMessage');

// describe('ContestantJoinResponseMessage', function() {
//     describe('#successful', function () {
//         it('should set value to true',
//             function () {
//                 var r = new ContestantJoinResponseMessage();
//                 r.successful = true;
//                 r.data._successful.should.not.be.null();
//                 r.data._successful.should.not.be.false();
//                 r.data._successful.should.be.true();
//             });
//         it('should get value (false)',
//             function () {
//                 var r = new ContestantJoinResponseMessage();
//                 r.data._successful = false;
//                 r.successful.should.not.be.null();
//                 r.successful.should.not.be.true();
//                 r.successful.should.be.false();
//         });
//     });
//     describe('#errorMessage', function () {
//         it('should set value to "Cannot find session"',
//             function () {
//                 var r = new ContestantJoinResponseMessage();
//                 r.errorMessage = 'Cannot find session';
//                 r.data._errormessage.should.not.be.null();
//                 r.data._errormessage.should.be.equal('Cannot find session');
//             });
//         it('should get value "Cannot find session"',
//             function () {
//                 var r = new ContestantJoinResponseMessage();
//                 r.data._errormessage = 'Cannot find session';
//                 r.errorMessage.should.not.be.null();
//                 r.errorMessage.should.be.equal('Cannot find session');
//         });
//     });
//     describe('#participantId', function () {
//         it('should set value to "1"',
//             function () {
//                 var r = new ContestantJoinResponseMessage();
//                 r.participantId = '1';
//                 r.data._participantid.should.not.be.null();
//                 r.data._participantid.should.be.equal('1').and.be.a.String();
//             });
//         it('should get value "1"',
//             function () {
//                 var r = new ContestantJoinResponseMessage();
//                 r.data._participantid = '1';
//                 r.participantId.should.not.be.null();
//                 r.participantId.should.be.equal('1').and.be.a.String();
//         });
//     });
// });
