// Body-Parser
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(__dirname + "/public"));
app.use("/login", express.static(__dirname + "/public"));

app.get("/", (req, res, next) => {
  res.send("Hello World");
});

app.post("/login", (req, res, next) => {
  console.log(req.body);
  //   console.log(req.body.email);
  // do some database struff
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Listening On Port 3000");
});
