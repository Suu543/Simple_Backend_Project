const express = require("express");
const app = express();

var myconsolelog = function(req, res, next) {
  console.log("I am a Middleware");
  next();
};

var servertime = function(req, res, next) {
  //   req.requme = Date.now();
  req.requestTime = Date.now();
  next();
};

app.use(servertime);

app.get("/", (req, res, next) => {
  res.send("Hello World");
  console.log(`Hello Wrold From / + ${req.requestTime}`);
});

app.listen(4000, () => {
  console.log("Server is running at port 3000...");
});
