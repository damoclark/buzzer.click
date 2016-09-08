// /* eslint-disable no-unused-vars */
// var should = require('should');
// /* eslint-enable no-unused-vars */

// var BuzzerStateMessage = require('../../../../lib/message/BuzzerStateMessage');

// describe('BuzzerStateMessage', function() {
//     describe('#enabled', function () {
//         it('should set value',
//             function () {
//                 var b = new BuzzerStateMessage();
//                 b.enabled = true;
//                 b.enabled.should.not.be.null();
//                 b.enabled.should.be.true();
//             });
//         it('should get value',
//             function () {
//                 var b = new BuzzerStateMessage();
//                 b.data._enabled = true;
//                 b.enabled.should.not.be.null();
//                 b.enabled.should.be.true();
//             });
//         it('should not set string, should return true',
//             function () {
//                 var b = new BuzzerStateMessage();
//                 b.enabled = 'test';
//                 b.enabled.should.be.true();
//             });
//         it('should export json', function () {
//             var b = new BuzzerStateMessage();
//             b.enabled = false;
//             var js = b.getJSON();
//             js.should.not.be.null();
//         });
//     });
// });
