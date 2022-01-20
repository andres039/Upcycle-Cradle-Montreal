require("dotenv").config();


const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const usersRouter = require("./routes/users");
const pinsRouter = require("./routes/pins")
const PORT = 8081;
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({origin: '*'}));
app.use(express.static(path.join(__dirname, "public")));

//Routes

app.use(pinsRouter)
app.use(usersRouter)
app.listen(PORT, () => {
  console.log(`♻️ 🦝 listening on port ${PORT} 🐼 ♻️ `);
});


module.exports = app;
