var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var crypto = require('crypto')
var shasum = crypto.createHash('sha1')

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let globalKey = "abc123"
const blockSize = 64;

app.post("/hmac", (req, res, next) => {
  console.log(req.body)
  var hmactoken = hmac(globalKey, req.body)
  console.log(hmactoken)
  const initialMessage = new URLSearchParams(req.body).toString()
  const retVal = initialMessage.concat("&").concat(hmactoken)
 res.json(retVal);
});


app.listen(3000, () => {
 console.log("Server running on port 3000");
});

function hmac(key, message) {
  const keyLengthInBytes = Buffer.byteLength(key)
  if (keyLengthInBytes > blockSize) {
    key = shasum.update(key)
  } else if (keyLengthInBytes > blockSize) {
    key = pad(key, blockSize)
  }

  const outerKey = key ^ [0x5c * blockSize]
  const innerKey = key ^ [0x36 * blockSize]
  const valueToHash = outerKey + shasum.update(innerKey + message)
  return String(shasum.update(valueToHash).digest('hex'))
}

function pad(key, blockSize) {
  let keyLengthInBytes = Buffer.byteLength(key)
  while(keyLengthInBytes < blockSize) {
    key = key.concat('0')
    keyLengthInBytes = Buffer.byteLength(key)
  }
  return key
}
