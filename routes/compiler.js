const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const compilerController = require('../controllers/compiler');

router.post('/', compilerController.compile);
router.get('/', compilerController.getVersions);
router.get('/:hash', compilerController.getTx);
module.exports = router;