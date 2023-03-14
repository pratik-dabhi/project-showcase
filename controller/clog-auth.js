const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const con =require("../db");
const authToken = require("../middleware/authMiddleware");
const cookieParser = require("cookie-parser");
app.use(cookieParser)

exports.register_page = (req,res)=>{
    res.render('register');
}

exports.login_page = (req,res)=>{
    res.render('login',{err_msg:''});
}

exports.register = async(req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    const encryptedPsw = await bcrypt.hash(password, 10);

    let q1 = `insert into authentication_table (auth_name,auth_email,auth_password) values('${name}','${email}','${encryptedPsw}')`;
    let a1 = await con.query(q1);

    console.log('Register is sucessfully');
    res.render('login_link',{email:email});
}

exports.login = async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let pass;
    let q1 = `select * from authentication_table where auth_email='${email}'`;
    let [a1] = await con.query(q1);
    // console.log(a1);
    if(a1.length > 0){
        db_id = (a1[0]['auth_id']);
        db_name = (a1[0]['auth_name']);
        db_pass = (a1[0]['auth_password']);
        db_email= (a1[0]['auth_email']);
        db_act_code= (a1[0]['activation_code']);
        let result = await bcrypt.compare(password,db_pass);
         if(result == true && db_act_code != 1){
            let t = jwt.sign({db_name:db_name,email:db_email,code:db_act_code},'pratik');
            res.cookie("user",t);
            res.render('login_link',{email:email});
         }
         else if(result == true && db_act_code == 1){
            let t = jwt.sign({db_name:db_name,email:db_email,code:db_act_code},'pratik');
            res.cookie("user",t);
            res.redirect('/route/home');
         }
         else{
            res.render('login',{err_msg:'Incorrect username or Password!'})        
        }
    }
    else{
        res.render('login',{err_msg:'Incorrect username or Password!'})        
    }
}

exports.logout = (req,res)=>{
    res.clearCookie("user");
    res.render('login',{err_msg:''});
}

exports.home = (req,res)=>{
    let data = req.data;
    res.render('home',{data:data});
}

exports.activation = async(req,res)=>{
    let email = req.query.email;
    let q1 = `update authentication_table set activation_code='1' where auth_email='${email}'`;
    let a1 =await con.query(q1);
    res.redirect('/route/login-page');
}

exports.login_link = (req,res)=>{
    res.render('login_link');
}

exports.email_api = async(req,res)=>{
    let email = req.query.email;
    let q1 = `select auth_email from authentication_table where auth_email='${email}'`;
    let [a1] = await con.query(q1);
    res.json({a1})
}

exports.tik_tac = async(req,res)=>{
    let data = req.data;
    res.render('tic-tac',({data:data}));
}

exports.color_cube = async(req,res)=>{
    let data = req.data;
    res.render('colorCube',({data:data})); 
}

exports.ehya = async(req,res)=>{
    let data = req.data;
    res.render('ehya',({data:data})); 
}
exports.ehya2 = async(req,res)=>{
    let data = req.data;
    res.render('ehya2',({data:data})); 
}

