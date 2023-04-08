const express = require('express');
const con = require('../db')
const app = express();

//Insert and Update single row data

/* const data_api = async(req,res) => {
    let arr = req.body.arr;
    let id = req.body.id;
    if(id === ""){
        let q1 = `insert into update_date (firstname,lastname,surname,email,contact,city) values ('${arr[0]}','${arr[1]}','${arr[2]}','${arr[4]}','${arr[3]}','${arr[5]}')`;
        let a1 = await con.query(q1);
        console.log("Inserted");
    }else{
        let q1 = `update update_date set firstname='${arr[1]}',lastname='${arr[2]}',surname='${arr[3]}',email='${arr[5]}',contact='${arr[4]}',city='${arr[6]}' where table_id=${id}`;
        let a1 = await con.query(q1);
        console.log('update');
    }
} */

//Update all with single click

/*
const update_api_all = async(req,res) => {
    
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
    res.redirect('/data')
}


const data = async (req,res) => {
    let sql = `select * from update_date`;
    let [a1] = await con.query(sql);
    let data = req.data;
    res.render('greed',{a1:a1,data:data})
}
*/

//----------------------------------------------------

const data_api = async (req, res) => {
    let arr = req.body.arr;
    let id = req.body.id;
    if(id.length == 0 ){
        let q1 = `insert into update_date (firstname,lastname,surname,email,contact,city,isDelete) values ('${arr[0]}','${arr[1]}','${arr[2]}','${arr[4]}','${arr[3]}','${arr[5]}','0')`;
        let [a1] = await con.query(q1);
        console.log("Inserted");
    }else{

        let q1 = `update update_date set firstname='${arr[1]}',lastname='${arr[2]}',surname='${arr[3]}',email='${arr[5]}',contact='${arr[4]}',city='${arr[6]}',isDelete='0' where table_id=${arr[0]}`;
        let [a1] = await con.query(q1);
        console.log('update');
    }
    // res.redirect(`/data`);
    res.json({msg:'save successfully'});
};

const update_api_all = async(req,res)=>{
    let candidate_id = req.body.candidate_id;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let surname = req.body.surname;
    let contact = req.body.contact;
    let email = req. body.email;
    let city = req.body.city;

    if((typeof(candidate_id) =='undefined') == false){
    for(let i=0 ; i < candidate_id.length ; i++) {   
        let q1 = `update update_date set firstname='${firstname[i]}',lastname='${lastname[i]}',surname='${surname[i]}',email='${email[i]}',contact='${contact[i]}',city='${city[i]}',isDelete='0' where table_id=${candidate_id[i]}`;   
        let [a1] = await con.query(q1);
        console.log('Update all !!!');    
    }
    for(var i = candidate_id.length ; i < firstname.length ; i++ ){
        let q1 = `insert into update_date (firstname,lastname,surname,email,contact,city,isDelete) values ('${firstname[i]}','${lastname[i]}','${surname[i]}','${contact[i]}','${email[i]}','${city[i]}','0')`;    
        let [a1] = await con.query(q1);
        console.log('Insert all !!!');
    }
    }

    if((typeof(candidate_id) =='undefined') == true){
        for(var i = 0 ; i < firstname.length ; i++ ){
            let q1 = `insert into update_date (firstname,lastname,surname,email,contact,city,isDelete) values ('${firstname[i]}','${lastname[i]}','${surname[i]}','${contact[i]}','${email[i]}','${city[i]}','0')`;    
            let [a1] = await con.query(q1);
            console.log('Insert all !!!');
        }
    }
    res.redirect('/data')
};

const data = async(req,res)=>{

    let data = req.data;
    let sql = `select * from update_date where isDelete = 0`;  //update_date is datatable that store record
    let [a1] = await con.query(sql);
    console.log('a1',a1);
    res.render('greed',{a1:a1,data:data})
};

//---------------------------------

const fetchData = async(req,res)=>{
    let id = req.query.id;
    console.log('iddd',id);
    let sql = `select * from update_date where table_id=${id}`;  //update_date is datatable that store record
    let [a1] = await con.query(sql);
    res.json({a1:a1})
};

const deleteApi = async(req,res)=>{
    let updateQuery = `update update_date set isDelete = 1 where table_id=${req.query.id}`;
    let [a1] = await con.query(updateQuery);
    res.json({msg:'save successfully'}) };


//------------------------------------------------------


module.exports = {data_api,data,update_api_all,fetchData,deleteApi}
