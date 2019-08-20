const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const compilerController = require('../controllers/compiler');

router.post('/', compilerController.compile);
module.exports = router;