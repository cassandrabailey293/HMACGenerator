const HMACGenerator = require("./HMACGenerator");

test("Given JSON/Javascript object, returns url-encoded original message from the request", () => {
const obj = {"Jim": 5, "Joe": 10 }
const expected = "Jim=5&Joe=10"
    expect(HMACGenerator.getInitialMessage(obj)).toBe(expected);
});

test("Given initial message and hmac token, returns reponse", () => {
const msg = "abc"
const token = "123"
    expect(HMACGenerator.buildResponse(msg, token)).toBe("abc&123");
});

test("Given key and message, returns hmac token", () => {
const key = "abc123"
const msg = "id=123456"
    expect(HMACGenerator.hmac(key, msg)).toBe("58eab8584a5d13e9be3a18b54e0355862b91fcd0");
});

test("Given key, pad with 0's up to blocksize", () => {
const key = "abc123"
const blockSize = 64
    expect(HMACGenerator.pad(key, blockSize)).toBe("abc1230000000000000000000000000000000000000000000000000000000000");
});
