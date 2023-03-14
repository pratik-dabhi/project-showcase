const express = require('express');
const app = express();
const Route = express.Router();
const greed = require('../controller/cgreed');


Route.get('/data',greed.data);

Route.post('/update-api-all',greed.update_api_all);

Route.post('/data-api',greed.data_api)

module.exports = Route;

