var express = require('express');
const con = require('../db2');
const app = express();
app.set("view engine","ejs");

 candidate = async (req,res)=>{
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let startindex = (page - 1) * limit;
    let endindex = (page * limit) - startindex;
    let countNum;

    let q1 = 'select count(*) as count from college_express';
    let [a1] =await con.query(q1);        
    countNum = (a1[0]['count']);

    let q2 = `SELECT * FROM college_express LIMIT ${startindex} , ${endindex}`;
    let [a2] = con.query(q2);

    res.render("pagination",{ page,countNum, limit, data: a2});

    // con.query(`SELECT * FROM college_express LIMIT ${startindex} , ${endindex}`,function (error, results, fields) {
    //     if (error) throw error; 
    //     res.render("pagination",{ page,countNum, limit, data: results});
    // });
 }
module.exports = {candidate};

app.get("/data-api",(req,res)=>{
    let page = req.query.page || 1;
    let limit=10;
    let startindex = (page - 1) * limit;
    let endindex = (page * limit) - startindex;

    con.query(`select * from college_express LIMIT ${startindex} , ${endindex}`,function (error,result,fields){
        if(error) throw (error);
        res.json({result});
    });
})

app.listen(8080, function () {
	console.log ("http://localhost:8080/candidate");
} );