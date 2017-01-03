var Readable = require('../../readable');
var assert = require('assert');

var s = new Readable({
  objectMode: true
});

s._read = function (n, cb) {
  // We have nothing now but we have some data later
  cb(null);
};

var v = s.read(0);
s.push()
assert.equal(v, null);

var v = s.read(0);

assert.equal(v, null);

s.once("end", function () {
  throw new Error("THIS STREAM SHOULD NOT END");
});
