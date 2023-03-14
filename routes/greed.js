const express = require('express');
const app = express();
const Route = express.Router();
const greed = require('../controller/cgreed');
const authToken = require('../middleware/authMiddleware')


Route.get('/data',authToken,greed.data);

Route.post('/update-api-all',greed.update_api_all);

Route.post('/data-api',greed.data_api)

module.exports = Route;

    