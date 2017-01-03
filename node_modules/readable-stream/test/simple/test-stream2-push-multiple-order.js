var Readable = require('../../readable');
var assert = require('assert');

var s = new Readable({
  objectMode: true,
  lowWaterMark: 10,
  highWaterMark: 20
});

var list = [1, 2, 3, 4, 5, 6]

s._read = function (n, cb) {
  var one = list.shift()
  var two = list.shift()

  s.push(one);
  cb(null, two);
};

var v = s.read(0);

// ACTUALLY [1, 3, 5, 6, 4, 2]
assert.deepEqual(s._readableState.buffer, [1, 2, 3, 4, 5, 6])

console.log("state", s._readableState);
