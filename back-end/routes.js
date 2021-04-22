var express = require('express');
var router = express.Router();
var controller = require('./controller');
router.get('/', (req, res) => {
  res.send('lololo');
});

router.get('/login', controller.login);

router.post('/register', controller.register);

router.post('/asset', controller.createAsset);

module.exports = router;
