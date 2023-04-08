const express = require('express');
const app = express();
const router = express.Router();
const rpag = require('../controller/cpagination');
const authToken = require('../middleware/authMiddleware');

router.get('/pagination',authToken,rpag.candidate)
router.get('/data-api',authToken,rpag.data_api)

module.exports = router;