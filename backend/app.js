require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const router = require("./routes");

const PORT = 8081;
const app = express();

// const db = require("./db")

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

/////////////////////////

// // PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();


//Select all pins

app.get("/api/pins", (req, res) => {
  db.query("SELECT * FROM pins;")
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log("API/pins error:", err);
      res.status(500).send();
    });
});

//Select individual pins

app.get("/api/pins/:id", (req, res) => {
  db.query("SELECT * FROM pins WHERE id=$1;", [req.params.id])
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log("API/pins error:", err);
      res.status(500).send();
    });
});

//Select all users
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users;")
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log("API/users error:", err);
      res.status(500).send();
    });
});


//Select individual users

app.get("/api/users/:id", (req, res) => {
  db.query("SELECT * FROM users WHERE id=$1;", [req.params.id])
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log("API/users error:", err);
      res.status(500).send();
    });
});

//create new user

app.post("/api/users", async (req, res) => {
  try {
    const {
      username, email, password
    } = req.body;

    const newUser = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [
        username, email, password
      ]
    );
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
  }
});

//create a new pin

app.post("/api/pins", async (req, res) => {
  try {
    const {
      title,
      description,
      picture,
      condition,
      latitude,
      longitude,
      date,
      creator_id,
      claimer_id,
    } = req.body;

    const newPin = await db.query(
      "INSERT INTO pins (title, description, picture, condition, latitude, longitude, date, creator_id, claimer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        title,
        description,
        picture,
        condition,
        latitude,
        longitude,
        date,
        creator_id,
        claimer_id,
      ]
    );
    res.json(newPin);
  } catch (err) {
    console.error(err.message);
  }
});
app.use("/", router);

app.listen(PORT, () => {
  console.log(`♻️ listening on port ${PORT} ♻️`);
});

//fetching information from the database?
module.exports = app;
