var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200).json({
    statusCode: 200, message: 'Welcome to photo grip API'
  });
});

module.exports = router;
