const express = require("express");
//bcrypt
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
    // Validate user inputq
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }
    //check if user already exist
     db.query("SELECT id FROM users WHERE email=$1;", [email]).then(
      response => {
        if (response.rowCount === 0) {
          
         return db.query(
                 "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
                 [username, email, password]
          ).then(() => {
            const token = jwt.sign({ user_id: 7, email }, process.env.TOKEN_KEY, {
              expiresIn: "2h",
            });
            // save user token
            const user = {};
            user.token = token;
            res.cookie(process.env.AUTH_COOKIE, token, {
              withCredentials: true,
              credentials: "include",
            });
            res.send("Login successful")
          }
          )
        } else {
          console.log("Email already in use");
        res.send("email in use")
        }
      }).catch(err => {
        console.log("Query failed:", err.message);
        res.send("Query failed:", err.message)
       }
      )
    
    
    //res.json(newUser);
            
        
    // console.log(await db.query("SELECT * FROM users WHERE email=$1;", [email]) ? true : false)
    // check if user already exist
    // else if (await db.query("SELECT * FROM users WHERE email=$1;", [email])) {
    //   console.log("Email already in use");
    //   res.send("Email already in use");
    // } else {
    // Validate if user exist in our database
    //?????
    // const oldUser = await User.findOne({ email });

    // if (oldUser) {
    //   return res.status(409).send("User Already Exist. Please Login");
    // }

    //Encrypt user password
    // const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    //??????????
    // const user = await User.create({
    //   username,
    //   email: email.toLowerCase(), // sanitize: convert email to lowercase
    //   password: encryptedPassword,
    // });

    // Create token
   
    // // return new user
    // //res.status(201).json(user)
    // res.json(newUser);
  
  } catch (err) {
    console.log(err);
  }

  // Our register logic ends here
});

module.exports = router;
