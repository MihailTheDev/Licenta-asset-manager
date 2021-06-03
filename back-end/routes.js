var express = require('express');
var router = express.Router();
var controller = require('./controller');
var controllerStatistics = require('./controller-statistics');
router.get('/', (req, res) => {
  res.send('lalala');
});

router.get('/login', controller.login);

router.post('/register', controller.register);

router.get('/asset', controller.getAssets);

router.get('/asset/:id', controller.getAsset);

router.post('/asset', controller.createAsset);

router.put('/asset/:id', controller.updateAsset);

router.get('/link/:assetId', controller.getLinks);

router.get('/assign', controller.getAssigns);

router.post('/assign', controller.createAssign);

router.patch('/assign/:id', controller.updateAssign);

router.post('/ticket', controller.createTicket);

router.patch('/ticket/:id', controller.updateTicket);

router.get('/ticket', controller.getTickets);

router.get('/statistics/ticket', controllerStatistics.getTicket);

router.get('/statistics/assign', controllerStatistics.getAssign);

router.get('/statistics/object', controllerStatistics.getObjects);

module.exports = router;
