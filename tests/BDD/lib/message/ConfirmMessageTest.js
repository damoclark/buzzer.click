// /* eslint-disable no-unused-vars */
// var should = require('should');
// /* eslint-enable no-unused-vars */

// var ConfirmMessage = require('../../../../lib/message/ConfirmMessage');

// describe('ConfirmMessage', function() {
//     describe('#buzzerError', function () {
//         it('should set value',
//             function () {
//                 var c = new ConfirmMessage();
//                 c.buzzerError = new Error('test');
//                 c.message.should.not.be.null();
//                 c.message.should.be.equal('test');
//             });
//         it('should not get value',
//             function () {
//                 var c = new ConfirmMessage();
//                 (function () {
//                     var x = c.buzzerError;
//                 }).should.throw();
//             });
//     });
//     describe('#message', function () {
//         it('should set value',
//             function () {
//                 var c = new ConfirmMessage();
//                 c.message = 'test';
//                 c.data.confirm._message.should.not.be.null();
//                 c.data.confirm._message.should.be.equal('test');
//             });
//         it('should get value',
//             function () {
//                 var c = new ConfirmMessage();
//                 c.data.confirm._message = 'test';
//                 c.message.should.not.be.null();
//                 c.message.should.be.equal('test');
//             }
//         );
//     });
//     describe('#code', function () {
//         it('should set value, be a number and set message to default message', function () {
//             var c = new ConfirmMessage();
//             c.code = 0;
//             c.data.confirm._code.should.not.be.null();
//             c.data.confirm._code.should.be.equal(0).and.not.a.NaN();
//             c.data.confirm._message.should.not.be.null();
//         });
//         it('should set value and message',function () {
//             var c = new ConfirmMessage();
//             c.code = 0;
//             c.message = 'New';
//             c.data.confirm._code.should.not.be.null();
//             c.data.confirm._code.should.be.equal(0).and.not.a.NaN();
//             c.data.confirm._message.should.be.equal('New');
//         });
//         it('should get value', function () {
//             var c = new ConfirmMessage();
//             c.data.confirm._code = 2;
//             c.code.should.not.be.null();
//             c.code.should.be.equal(2).and.not.a.NaN();
//         });
//     });
// });
