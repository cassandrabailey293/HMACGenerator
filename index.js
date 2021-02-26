var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post("/hmac", (req, res, next) => {
  console.log(req.body.id)
 res.json(req.body);
});


app.listen(3000, () => {
 console.log("Server running on port 3000");
});
