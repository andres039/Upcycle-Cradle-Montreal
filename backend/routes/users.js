const express = require("express");
//bcrypt
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

router.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { username, email, password, confirmation_password } = req.body;

    //hash the password

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Validate user input
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }

    //check if user already exist

    db.query("SELECT id FROM users WHERE email=$1;", [email])
      .then((response) => {
        if (response.rowCount === 0) {
          return db
            .query(
              "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
              [username, email, hashedPassword]
            )
            .then((resp) => {
              const user_id = resp.rows[0].id;
              const token = jwt.sign(
                { user_id, email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
              // save user token
              const user = resp.rows[0];
              console.log(user);
              user.token = token;
              console.log(user.token);
              // res.cookie(process.env.AUTH_COOKIE, token);
              return res.status(200).send({
                status: "logged in",
                message: "Login successful",
                user,
                token,
              });
            });
        } else {
          console.log("Email already in use");
          res.status(401).send(response);
        }
      })
    // .catch((err) => {
    //   console.log("Query failed:", err.message);
    //   res.send("Query failed:", err.message);
    // });


  } catch (err) {
    console.log("Query failed:", err.message);
    res.send("Query failed:", err.message);
  }

  // Our register logic ends here
});

//Login

router.post("/login", async (req, res) => {
  console.log("SUCCESS")

  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    db.query("SELECT * FROM users WHERE email=$1;", [email])
      .then((response) => {
        if (response.rows.length === 0) {
          return res.status(401).json({ error: "Email is incorrect" }
          )
        };
        const user_id = response.rows[0].id;
        const token = jwt.sign(
          { user_id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        const user = response.rows[0];
        console.log(user);
        user.token = token;
        console.log(user.token);
        // res.cookie(process.env.AUTH_COOKIE, token);
        if (validPassword(password, response.rows[0].password)) {
          return res.status(200).send({
            status: "logged in",
            message: "Login successful",
            user,
            token,
          });
        };


      });

  } catch (err) {
    console.log("Query failed:", err.message);
    res.send("Query failed:", err.message);
  }
});

const validPassword = async (password, hashedPassword) => {

  return bcrypt.compareSync(
    password,
    hashedPassword

  )
};


module.exports = router;