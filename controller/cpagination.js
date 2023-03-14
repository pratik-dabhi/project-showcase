const con = require('../db2');


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
    let [a2] =await con.query(q2);

    res.render("pagination",{ page,countNum, limit, data: a2});
}

data_api = async (req,res)=>{
    let page = req.query.page || 1;
    let limit=10;
    let startindex = (page - 1) * limit;
    let endindex = (page * limit) - startindex;

    let q1 = `select * from college_express LIMIT ${startindex} , ${endindex}`;
    let [result] = await con.query(q1);    
    res.json({result});
}

module.exports ={candidate,data_api} 