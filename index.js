var express = require("express");
var app = express();
var bodyParser = require('body-parser');
const HMACGenerator = require("./HMACGenerator");


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let globalKey = "abc123"

app.post("/hmac", (req, res, next) => {
  var hmactoken = HMACGenerator.hmac(globalKey, req.body)
  const initialMessage = new URLSearchParams(req.body).toString()
  const retVal = initialMessage.concat("&").concat(hmactoken)
 res.json(HMACGenerator.buildResponse(HMACGenerator.getInitialMessage(req.body), hmactoken));
});


app.listen(3000, () => {
 console.log("Server running on port 3000");
});
