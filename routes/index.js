var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.ejs', { title: 'gengo.js', _: require('lodash') });
});

module.exports = router;
