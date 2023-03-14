const express = require('express');
const app = express();
const Router = express.Router();
const clogAuth = require('../controller/clog-auth');
const authToken = require('../middleware/authMiddleware');
const authtoken = require('../middleware/authMiddleware');
const Route = require('./greed');

Router.get('/register-page',clogAuth.register_page);

Router.get('/login-page',clogAuth.login_page);

Router.post('/register',clogAuth.register);

Router.post('/login',clogAuth.login);

Router.get('/logout-api',authtoken,clogAuth.logout);

Router.get('/home',authtoken,clogAuth.home);

Router.get('/activation-api',clogAuth.activation);

Router.post('/login_page',authToken,clogAuth.login_page);

Router.get('/email-api',clogAuth.email_api);

Router.get('/tic-tac-toe',authToken,clogAuth.tik_tac);


Router.get('/color-cube',authtoken,clogAuth.color_cube);

Router.get('/ehya',authToken,clogAuth.ehya);

Router.get('/ehya2',authToken,clogAuth.ehya2);


module.exports = Router;