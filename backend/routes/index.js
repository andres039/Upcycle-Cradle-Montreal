const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", (req, res) => {
  console.log("I got a Post request! 😎");
  console.log(req.body);
  res.end();
});

module.exports = router;
