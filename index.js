const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.get("/about-us", (req, res, next) => {
  res.send("<h1>I am the about page</h1>");
});

app.get("/about-json", (req, res, next) => {
  res
    .status(200)
    .json({ user: "Hello World", balance: "2000", id: "123ght56" });
});

// Type: GET
// ACCESS: Public
// @DESCRIPTION: Used for login
app.get("/ab*cd", (req, res, next) => {
  // ab로 시작하고 cd로만 끝나면 됨.
  res.send("<h1>I am a regex page.</h1>");
});

app.get("/user/:id/status/:status_id", (req, res, next) => {
  res.send(req.params);
});

app.get("/flights/:from-:to", (req, res, next) => {
  res.send(req.params);
});

app.post("/login", (req, res, next) => {
  res.send("login success");
});

app.listen(3000, () => {
  console.log("Listening On Port 3000!");
});
