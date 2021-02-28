var crypto = require('crypto')
const blockSize = 64;

class HMACGenerator {

  static getInitialMessage(body) {
    return new URLSearchParams(body).toString()
  }

  static buildResponse(initialMessage, token) {
    return initialMessage.concat("&").concat(token)
  }

  static hmac(key, message) {
    var shasum1 = crypto.createHash('sha1')
    var shasum2 = crypto.createHash('sha1')
    const keyLengthInBytes = Buffer.byteLength(key)
    if (keyLengthInBytes > blockSize) {
      key = shasum1.update(key)
    } else if (keyLengthInBytes > blockSize) {
      key = pad(key, blockSize)
    }

    const outerKey = key ^ [0x5c * blockSize]
    const innerKey = key ^ [0x36 * blockSize]
    const valueToHash = outerKey + shasum1.update(innerKey + message).digest('hex')
    return String(shasum2.update(valueToHash).digest('hex'))
  }

  static pad(key, blockSize) {
    let keyLengthInBytes = Buffer.byteLength(key)
    while(keyLengthInBytes < blockSize) {
      key = key.concat('0')
      keyLengthInBytes = Buffer.byteLength(key)
    }
    return key
  }
}

module.exports = HMACGenerator
