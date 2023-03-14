const express = require('express');
const con = require('../db')
const app = express();


//app.post("/data-api/",async (req, res) => {

data_api = async(req,res) => {
    let arr = req.body.arr;
    let id = req.body.id;
    if(id === ""){
        let q1 = `insert into update_date (firstname,lastname,surname,email,contact,city) values ('${arr[0]}','${arr[1]}','${arr[2]}','${arr[3]}','${arr[4]}','${arr[5]}')`;
        let a1 = await con.query(q1);
        console.log("Inserted");
    }else{
        let q1 = `update update_date set firstname='${arr[0]}',lastname='${arr[1]}',surname='${arr[2]}',email='${arr[3]}',contact='${arr[4]}',city='${arr[5]}' where table_id=${id}`;
        //console.log(`update into update_data set firstname='${arr[0]}',lastname='${arr[1]}',surname='${arr[2]}',email='${arr[3]}',contact='${arr[4]}',city='${arr[5]}' where table_id=${id}`);
        let a1 = await con.query(q1);
        console.log('update');
    }
}


// app.post('/update-api-all',async(req,res)=>{

update_api_all = async(req,res) => {
    let candidate_id = req.body.candidate_id;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let surname = req.body.surname;
    let contact = req.body.contact;
    let email = req. body.email;
    let city = req.body.city;
    for(let i=0 ; i < candidate_id.length ; i++) {   
        let q1 = `update update_date set firstname='${firstname[i]}',lastname='${lastname[i]}',surname='${surname[i]}',email='${email[i]}',contact='${contact[i]}',city='${city[i]}' where table_id=${candidate_id[i]}`;   
        let a1 = await con.query(q1);
        console.log('Update all !!!');    
    }

    if(firstname.length>candidate_id.length){
        for(var i = candidate_id.length ; i < firstname.length ; i++ ){
            let q1 = `insert into update_date (firstname,lastname,surname,email,contact,city) values ('${firstname[i]}','${lastname[i]}','${surname[i]}','${contact[i]}','${email[i]}','${city[i]}')`;    
            let a1 = await con.query(q1);
            console.log('Insert all !!!');
        }
    }
}

// app.get('/data/',async(req,res)=>{

data = async (req,res) => {
    let sql = `select * from update_date`;
    let [a1] = await con.query(sql);
    res.render('greed',{a1:a1})
}

module.exports = {data_api,data,update_api_all}