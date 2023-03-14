const express = require ('express');
const bodyParser = require ('body-parser');
const mysql = require ('mysql2');
const ejs = require ('ejs');
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const con = require('./db');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static((__dirname+ '/public')));
app.use(cookieParser())


let auth = require('./routes/log-auth');
app.use('/route',auth);

let form = require('./routes/register_form');
app.use('/route',form);

let gTable = require('./routes/greed');
app.use('/route',gTable);

let pagination = require('./routes/pagination');
app.use('/route',pagination);

app.listen(8080, function () {
	console.log ("http://localhost:8080/route");
} );