const express = require('express');
const con = require('../db')
const app = express();

data_api = async(req,res) => {
    let arr = req.body.arr;
    let id = req.body.id;
    if(id === ""){
        let q1 = `insert into update_date (firstname,lastname,surname,email,contact,city) values ('${arr[0]}','${arr[1]}','${arr[2]}','${arr[3]}','${arr[4]}','${arr[5]}')`;
        let a1 = await con.query(q1);
        console.log("Inserted");
    }else{
        let q1 = `update update_date set firstname='${arr[1]}',lastname='${arr[2]}',surname='${arr[3]}',email='${arr[4]}',contact='${arr[5]}',city='${arr[6]}' where table_id=${id}`;
        let a1 = await con.query(q1);
        console.log('update');
    }
}

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

data = async (req,res) => {
    let sql = `select * from update_date`;
    let [a1] = await con.query(sql);
    let data = req.data;
    res.render('greed',{a1:a1,data:data})
}

module.exports = {data_api,data,update_api_all}