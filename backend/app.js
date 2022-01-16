const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//const cors = require("cors");

const app = express();

// const db = require("./db")

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/////////////////////////

// app.use("/api/pins", pins(db));
// app.use("/api/users", users(db));





app.get("/api/users", (req, res) => {
  const users = [{ name: "Jeremy" }, { name: "Furious" }];
  res.json(users);
})

app.get("/api/users/:user_id", (req, res) => {
  const user = { name: "Furious" };
  res.json(user);
})


app.get("/api/pins", (req, res) => {
  const pins = [{ 3: 3 }, { 4: 4 }];
  res.json(pins);
})

app.get("/api/pins/:pin_id", (req, res) => {
  const pin = { 3: 3 };
  res.json(pin);
})

//fetching information from the database?


module.exports = app;
