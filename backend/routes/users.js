const express = require('express');
const router = express.Router();
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();

//Select all users
router.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users;")
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log("API/users error:", err);
      res.status(500).send();
    });
});

//Select individual users

router.get("/api/users/:id", (req, res) => {
  db.query("SELECT * FROM users WHERE id=$1;", [req.params.id])
    .then((response) => res.send(response.rows))
    .catch((err) => {
      console.log("API/users error:", err);
      res.status(500).send();
    });
});

//create new user

router.post("/api/users", async (req, res) => {
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

module.exports = router;
