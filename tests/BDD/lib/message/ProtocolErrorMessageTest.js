// /* eslint-disable no-unused-vars */
// var should = require('should');
// /* eslint-enable no-unused-vars */

// var ProtocolErrorMessage = require('../../../../lib/message/ProtocolErrorMessage');

// describe('ProtocolErrorMessage', function() {
//     describe('#code', function () {
//         it('should set value to 255',
//             function () {
//                 var p = new ProtocolErrorMessage();
//                 p.code = 123;
//                 p.data.confirm._code.should.not.be.null();
//                 p.data.confirm._code.should.equal(255).and.not.be.a.NaN();
//             });
//         it('should get value',
//             function () {
//                 var p = new ProtocolErrorMessage();
//                 p.data.confirm._code = 255;
//                 p.code.should.not.be.null();
//                 p.code.should.equal(255);
//             });
//     });
//     describe('#message', function () {
//         it('should set value',
//             function () {
//                 var p = new ProtocolErrorMessage();
//                 p.message = 'xyz123';
//                 p.data.confirm._message.should.not.be.null();
//                 p.data.confirm._message.should.equal('xyz123');
//             });
//         it('should get value',
//             function () {
//                 var p = new ProtocolErrorMessage();
//                 p.data.confirm._message = 'xyz123';
//                 p.message.should.not.be.null();
//                 p.message.should.equal('xyz123');
//             });
//     });
// });
