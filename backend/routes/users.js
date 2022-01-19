const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const { user } = require("pg/lib/defaults");
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

//Search for a user by email

router.get("/api/users/:id", (req, res) => {
  db.query("SELECT * FROM users WHERE email=$1;", [req.params.email])
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
    const { username, email, password } = req.body;

    const newUser = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
  }
});

const authTokens = {};

const users = {
  email: "emil@yahoo.com",
  password: "password",
};

router.post("/login", (req, res) => {
  //const userID = req.session["userID"];

  const { email, password } = req.body;
  console.log("req.body:", req.body.email);

  //const hashedPassword = getHashedPassword(password);

  // const user = users.find(u => {
  //     return u.email === email && password === u.password
  // });
  // res.status(200).json({
  //   status: "success",
  //   message: "shipping address saved successfully",
  //   data: buyer,
  // });

  if (email !== users.email) {
    console.log("Wrong credentials");
    res.status(400).json({ status: "failed" });
  } else {
    console.log("successful authentication");
    res.status(200).json({
      status: "success",
      message: "Successful login",
      data: user, token
    });
  }

  if (user) {
      const authToken = generateAuthToken();

      // Store authentication token
      authTokens[authToken] = user;

      // Setting the auth token in cookies
      res.cookie('AuthToken', authToken);

      // Redirect user to the protected page
      res.redirect('/protected');
  } else {
      res.render('login', {
          message: 'Invalid username or password',
          messageClass: 'alert-danger'
      });
  }
});

// const checkEmailsMatch = (enteredEmail, enteredPassword) => {
//   for (let key in users) {

//     let existingEmail = users[key]["email"];
//     //let hashedPassword = users[key]["password"];

//     if (existingEmail === enteredEmail) {
//       if (enteredPassword === null) {
//         return true;
//       }
//       if (bcrypt.compareSync(enteredPassword, hashedPassword)) {
//         return key;
//       }
//     }
//   }
// };

// app.post("/login", (req, res) => {

//   const enteredEmail = req.body.emailaddress;
//   const enteredPassword = req.body.password;
//   let userID = checkEmailsMatch(enteredEmail, enteredPassword);

//   if (!userID) {
//     return res.status(400).send('User with these credentials is not found'); //change message
//   }

//   req.session["userID"] = userID;
//   res.redirect("/urls");
// });
module.exports = router;
