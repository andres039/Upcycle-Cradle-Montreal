const { query } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Pool } = require("pg");
const { database } = require("pg/lib/defaults");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
const queries = require("./dbQueries/pinQueries")
db.connect();

//Select all pins
router.get("/api/pins", (req, res) => {
  queries.getAllPins(db)
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log("API/pins error:", err);
      res.status(500).send();
    });
});

//Select individual pins

router.get("/api/pins/:id", (req, res) => {
  queries.getPinsById(db, req.params.id)
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log("API/pins error:", err);
      res.status(500).send();
    });
});

//Delete individual pins

router.delete("/api/pins/:id", (req, res) => {
  queries.deletePins(db, req.params.id)
    .then((response) => {
      res.send(200);
    })
    .catch((err) => {
      console.log("API/pins error:", err);
      res.status(500).send();
    });
});

//Update individual pins

router.put("/api/pins/:id", async (req, res) => {

  try {
    const { current_user_id, pinID } = req.body;
     await queries.updateIndividualPins(db,
        current_user_id,
        pinID,
      )
      .then((response) => {
        res.json(response.rows);
      });
  } catch (err) {
    console.error(err.message);
  }
});

//create a new pin

router.post("/api/pins", async (req, res) => {
  try {
    //test compare with users
    const verification = jwt.verify(req.headers.token, process.env.TOKEN_KEY);
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

    const newPin = await queries.insertNewPin(
      db,
      title,
      description,
      picture,
      condition,
      latitude,
      longitude,
      date,
      creator_id,
      claimer_id
    );
    res.json(newPin);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
