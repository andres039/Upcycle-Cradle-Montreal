const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();

//Select all pins
router.get("/api/pins", (req, res) => {
  db.query("SELECT * FROM pins;")
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log("API/pins error:", err);
      res.status(500).send();
    });
});

//Select individual pins

router.get("/api/pins/:id", (req, res) => {
  db.query("SELECT * FROM pins WHERE id=$1;", [req.params.id])
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log("API/pins error:", err);
      res.status(500).send();
    });
});



router.put("/api/pins/:id", (req, res) => {

  console.log("PUT/API/PINS", req.body)
  res.status(200).send();
});




//create a new pin

router.post("/api/pins", async (req, res) => {
  console.log("req.headers", req.headers)

  try {
    const verification = jwt.verify(req.headers.token, process.env.TOKEN_KEY);
    console.log(verification)
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

module.exports = router