const express = require('express');
const con = require('../db')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const candidate = async (req,res)=>{
    let q1 = `SELECT * FROM option_master where s_id='1'`;
    let [a1] =await con.query(q1);
    gender = (a1);

    let q2 = `SELECT * FROM option_master where s_id='3'`;
    let [a2] = await con.query(q2);
    course = (a2);

    let q3 =`SELECT * FROM option_master where s_id='4'`;
    let [a3] = await con.query(q3);
    lang =  (a3);

    let q4 = `SELECT * FROM option_master where s_id='5'`;
    let [a4] = await con.query(q4);
    tech =  (a4);

    let q5 = `SELECT * FROM option_master where s_id='6'`;
    let [a5] = await con.query(q5);
    loc =  (a5);

    let q6 = `SELECT * FROM option_master where s_id='7'`;
    let [a6] = await con.query(q6);
    rel =  (a6);
    
    let q7 = `SELECT * FROM state_master`;
    let [a7] = await con.query(q7);
    state =  (a7);
    let data = req.data;
    res.render("index",{gender:gender,state:state,course:course,lang:lang,tech:tech,loc:loc,rel:rel,data:data});
}

const city_api = async(req,res) => {
    var val = req.query.id;

    let q1 = `select * from state_master where state_value='${val}'`;
    let [data] = await con.query(q1);

    let q2 = `select city_value from city_master where state_id='${data[0].state_id}'`;
    let [a1] = await con.query(q2);
    res.json({a1});
}

const candidate_data = async(req,res) => {
    let search = req.query.search || '';
    let fname='',lname='',sname='',designation='',city='';

    for(var i=0; i<search.length ; i++){
        if(search[i]=='^'){
            for(var j=i+1; j<search.length ; j++){
                if(search[j]=='$' || search[j]=='^' || search[j]=='#' || search[j]=='~' || search[j]=='/'){
                   break;
                }
                else{
                    fname=fname+search[j];
                }  
            }
        }
        if(search[i]=='$'){
            for(var j=i+1; j<search.length ; j++){
                if(search[j]=='$'|| search[j]=='^' || search[j]=='#' || search[j]=='~' || search[j]=='/'){
                   break;
                }
                else{
                    lname=lname+search[j];
                }  
            }
        }
        if(search[i]=='#'){
            for(var j=i+1; j<search.length ; j++){
                if(search[j]=='$'|| search[j]=='^' || search[j]=='#' || search[j]=='~' || search[j]=='/'){
                   break;
                }
                else{
                    sname=sname+search[j];
                }  
            }
        }
        if(search[i]=='/'){
            for(var j=i+1; j<search.length ; j++){
                if(search[j]=='$'|| search[j]=='^' || search[j]=='#' || search[j]=='~' || search[j]=='/'){
                   break;
                }
                else{
                    designation=designation+search[j];
                }  
            }
        }
        if(search[i]=='~'){
            for(var j=i+1; j<search.length ; j++){
                if(search[j]=='$'|| search[j]=='^' || search[j]=='#' || search[j]=='~' || search[j]=='/'){
                   break;
                }
                else{
                    city=city+search[j];
                }  
            }
        }
    }
    if (search.length != 0) {
        let q1 = `select * from basic_details where isdelete = 'no'and candidate_firstname like'%${fname}%'and candidate_lastname like '%${lname}%' and candidate_surname like '%${sname}%' and candidate_designation like '%${designation}%' and candidate_city like '%${city}%'`;
        
        let [data] = await con.query(q1);        
        let data1 = req.data;
        res.render('list',{data:data,search:search,data1:data1});
    }else{
        res.redirect('/show');
    }
    
}

const candidate_details = async (req, res) =>{
   //------------------Basic Details-------------

   var f_name = req.body.firstname;
   var l_name = req.body.lastname;
   var s_name = req.body.surname;
   var des =req.body.des;
   var email =req.body.email;
   var contact =req.body.contact;
   var address1 =req.body.address1;
   var address2 =req.body.address2;
   var zipcode = req.body.zipcode;
   var city = req.body.city;
   var state = req.body.state;        
   var rstatus = req.body.rstatus;
   var date = req.body.date; 
   var gender = req.body.gender;

   

//----------------   Academic Details -----------------
   var course = req.body.course;
   var board_university = req.body.board_university;
   var per = (req.body.per);
   var passing_year = (req.body.passing_year);


   console.log('Education Details ' ,course,board_university,per,passing_year);
   
   var companyname = req.body.companyname;
   var designation = req.body.designation;
   var ctc = req.body.ctc;       
   var startdate = req.body.startdate;
   var enddate = req.body.enddate;
   //------------------------------Language Details ----------------
   var language =req.body.language;
   
   var read_english = req.body.read_english;
   var read_hindi = req.body.read_hindi;
   var read_gujarati = req.body.read_gujarati;
   
   var write_english = req.body.write_english;
   var write_hindi = req.body.write_hindi;
   var write_gujarati = req.body.write_gujarati;
   
   var speak_english = req.body.speak_english;
   var speak_hindi = req.body.speak_hindi;
   var speak_gujarati = req.body.speak_gujarati;


    //--------------------------------Technology Details---------------

    var tech = req.body.techno;
    var php = req.body.PHP;
    var nodejs = req.body.NodeJs;
    var mysql = req.body.MySql;
    var laravel = req.body.Laravel;
    var oracle = req.body.Oracle;

    //------------------------------Reference Details---------------

    var rname1 = req.body.rname1;
    var cnumber1 = req.body.cnumber1;
    var relation1 = req.body.relation1;
    var rname2 = req.body.rname2;
    var cnumber2 = req.body.cnumber2;
    var relation2 = req.body.relation2;

    //-------------------------Loaction Details------------------------
    var location = req.body.location;
    var expected_ctc= req.body.expected_ctc;
    var current_ctc = req.body.current_ctc;

    let search = req.query.search || '';


    let q1 = `insert into basic_details (candidate_firstname , candidate_lastname , candidate_surname, candidate_designation , candidate_email , candidate_address1 , candidate_address2 , candidate_state , candidate_contact , candidate_city , candidate_zipcode , candidate_gender , candidate_rstatus ,  candidate_dob, isdelete) values ('${f_name}','${l_name}','${s_name}','${des}','${email}','${address1}','${address2}','${state}','${contact}','${city}','${zipcode}','${gender}','${rstatus}','${date}','no')`;
    let [a1] =await con.query(q1);
    // console.log('Basic Details is inserted!!!');
    let inserId  = a1.insertId;

    if(typeof(course)=='string'){
            let q1 = `insert into education_details (candidate_id,education_course,education_board_university,education_percentage,education_passing_year) values ('${inserId}','${course}','${board_university}','${per}','${passing_year}')`;
            let a1 = await con.query(q1);
            // console.log('Education Details inserted !!! ');
    
        }
        else{
             for(var i=0 ; i < course.length ; i++){
                let q1 = `insert into education_details (candidate_id,education_course,education_board_university,education_percentage,education_passing_year) values ('${inserId}','${course[i]}','${board_university[i]}','${per[i]}','${passing_year[i]}')`;
                let a1 = await con.query(q1);
                // console.log('Education Details inserted !!! ');
            }
        }
        
        if(typeof(companyname)=='string'){
            let q1 = `insert into experience_details (candidate_id,experience_company,experience_designation,experience_ctc,experience_sdate,experience_ldate) values ('${inserId}','${companyname}','${designation}','${ctc}','${startdate}','${enddate}')`;
            let a1 = await con.query(q1);
            // console.log('Experience details inserted !!!');
        }
        else{
            for(var i=0; i < companyname.length ; i++ ) {
                let q1 = `insert into experience_details (candidate_id,experience_company,experience_designation,experience_ctc,experience_sdate,experience_ldate) values ('${inserId}','${companyname[i]}','${designation[i]}','${ctc[i]}','${startdate[i]}','${enddate[i]}')`;
                let a1 = await con.query(q1);
                // console.log('Experience details inserted !!!');
             }
        }
   
    if(typeof(language)=='string'){
            let q1 = `insert into language_details (candidate_id,language_name,language_read,language_write,language_speak) values ('${inserId}','english','${read_english ? 'YES':'NO'}','${write_english ? 'YES':'NO'}','${speak_english ? 'YES':'NO'}') `;
            let a1 = await con.query(q1);
            // console.log("English Inserted !!!");
        
            let q2 = `insert into language_details (candidate_id,language_name,language_read,language_write,language_speak) values ('${inserId}','hindi','${read_hindi ? 'YES':'NO'}','${write_hindi ? 'YES':'NO'}','${speak_hindi ? 'YES':'NO'}') `;
            let a2 = await con.query(q2);
            // console.log("Hindi is inserted !!!");

            let q3 = `insert into language_details (candidate_id,language_name,language_read,language_write,language_speak) values ('${inserId}','gujarati','${read_gujarati ? 'YES':'NO'}','${write_gujarati ? 'YES':'NO'}','${speak_gujarati ? 'YES':'NO'}') `;
            let a3 = await con.query(q3);
            // console.log("Gujarati is inserted !!!");
    }
    else{
        
            let q1 = `insert language_details (candidate_id,language_name,language_read,language_write,language_speak) values ('${inserId}','hindi','${read_hindi ? 'YES':'NO'}','${write_hindi ? 'YES':'NO'}','${speak_hindi ? 'YES':'NO'}')`;
            let a1 = await con.query(q1);
            // console.log("Hindi is inserted !!!");
        
            let q2= `insert into language_details (candidate_id,language_name,language_read,language_write,language_speak) values ('${inserId}','english','${read_english ? 'YES':'NO'}','${write_english ? 'YES':'NO'}','${speak_english ? 'YES':'NO'}') `;
            let a2 = await con.query(q2);
            // console.log("English Inserted !!!");
        
            let q3 = `insert into language_details (candidate_id,language_name,language_read,language_write,language_speak) values ('${inserId}','gujarati','${read_gujarati ? 'YES':'NO'}','${write_gujarati ? 'YES':'NO'}','${speak_gujarati ? 'YES':'NO'}') `;
            let a3 = await con.query(q3);
            // console.log("Gujarati is inserted !!!");
            
         }

             if(typeof(tech)=='string'){
                if(tech=='PHP'){
                    let q1 = `insert into technology_details (candidate_id,technology_name,technology_level) values ('${inserId}','${tech}','${php}')`;
                    let a1 = await con.query(q1);
                }
                if(tech=='NodeJs'){
                    let q2 = `insert into technology_details (candidate_id,technology_name,technology_level) values ('${inserId}','${tech}','${nodejs}')`;
                    let a2 = await con.query(q2);
                }
                if(tech=='MySql'){
                    let q3 = `insert into technology_details (candidate_id,technology_name,technology_level) values ('${inserId}','${tech}','${mysql}')`;
                    let a3 = await con.query(q3);
                }
                if(tech=='Laravel'){
                    let q4 = `insert into technology_details (candidate_id,technology_name,technology_level) values ('${inserId}','${tech}','${laravel}')`;
                    let a4 = await con.query(q4);
                }
                if(tech=='Oracle'){
                    let q5 = `insert into technology_details (candidate_id,technology_name,technology_level) values ('${inserId}','${tech}','${oracle}')`;
                    let a5 = await con.query(q5);
                }
                // console.log('Technology inserted !!!');
             }
             else{
                for(var i=0 ; i<tech.length ; i++){
                if(tech[i]=='PHP'){
                    let q1 = `insert into technology_details (candidate_id,technology_name,technology_level) values ('${inserId}','${tech[i]}','${php}')`;
                    let a1 = await con.query(q1);
                }
                if(tech[i]=='NodeJs'){
                    let q2 = `insert into technology_details (candidate_id,technology_name,technology_level) values ('${inserId}','${tech[i]}','${nodejs}')`;
                    let a2 = await con.query(q2);
                }
                if(tech[i]=='MySql'){
                    let q3 = `insert into technology_details (candidate_id,technology_name,technology_level) values ('${inserId}','${tech[i]}','${mysql}')`;
                    let a3 = await con.query(q3);
                }
                if(tech[i]=='Laravel'){
                    let q4 = `insert into technology_details (candidate_id,technology_name,technology_level) values ('${inserId}','${tech[i]}','${laravel}')`;
                    let a4 = await con.query(q4);
                }
                if(tech[i]=='Oracle'){
                    let q5 = `insert into technology_details (candidate_id,technology_name,technology_level) values ('${inserId}','${tech[i]}','${oracle}')`;
                    let a5 = await con.query(q5);
                }
                // console.log("Technology inserted !!!");
            }
         }
 
            let sq1= `insert into reference_details (candidate_id,reference_name,reference_contact,reference_relation) values ('${inserId}','${rname1}','${cnumber1}','${relation1}'),('${inserId}','${rname2}','${cnumber2}','${relation2}')`;
            let aq1 = await con.query(sq1);
            // console.log("Reference inserted !!!!");
            
            
            let sq2 = `insert into preference_details (candidate_id,preference_location,preference_ctc,preference_cctc) values ('${inserId}','${location}','${expected_ctc}','${current_ctc}')`;
            let aq2 =await con.query(sq2);
            //    console.log("Preference inserted !!!");

            let sq3 = `select candidate_id,candidate_firstname , candidate_lastname , candidate_surname , candidate_designation , candidate_city,isdelete from basic_details where isdelete='no'`;
            let data = await con.query(sq3);

            let data1 = req.data;
                res.redirect('/show')
}

const show = async (req,res) => {
    let search;
    let q1 = `select candidate_id,candidate_firstname , candidate_lastname , candidate_surname , candidate_designation , candidate_city,isdelete from basic_details where isdelete='no'`;
    let [a1] = await con.query(q1);

    let data1 = req.data;
    res.render('list',{data:a1,search:search,data1:data1});
}



const delete_api  = async (req,res) => {
    let c_id = req.query.c_id;
    let q1 = `update basic_details set isDelete='Yes' where candidate_id=${c_id}`;
    let a1 =await con.query(q1);
    console.log(`Row ${c_id}data is deleted!!`);

    let q2 = `select candidate_id,candidate_firstname , candidate_lastname , candidate_surname , candidate_designation , candidate_city,isdelete from basic_details where isdelete='no'`;
    let [a2] = await con.query(q2);
    res.json({result : a2});
 }

 const delete_all_api = async(req,res)=>{
    let c_ids = req.body.arrid;

    console.log('c_ids',c_ids);
         c_ids.forEach(e  =>{
            let q1 = `update basic_details set isDelete='Yes' where candidate_id=${e}`;
            let a1 = con.query(q1);
            console.log(`Row ${e} data is deleted!!`);   
        })
        let q2 = `select candidate_id,candidate_firstname , candidate_lastname , candidate_surname , candidate_designation , candidate_city,isdelete from basic_details where isdelete='no'`;
        let [result] = await con.query(q2);
        res.json({result});
    
 }
    
const edit_api = async(req,res)=>{

    let sql1 = "SELECT * FROM option_master where s_id='1'";
    let [res1] = await con.query(sql1);
    gender=(res1);

    let sql2 = `SELECT * FROM option_master where s_id='3'`;
    let [res2] = await con.query(sql2);
    course=(res2);

    let sql3 = `SELECT * FROM option_master where s_id='4'`;
    let [res3] = await con.query(sql3);
        lang=(res3);

    let sql4 = `SELECT * FROM option_master where s_id='5'`;
    let [res4] = await con.query(sql4);
        tech=(res4);    

    let sql5 = `SELECT * FROM option_master where s_id='6'`;
    let [res5] = await con.query(sql5);
        loc=(res5);

    let sql6 = `SELECT * FROM option_master where s_id='7'`;
    let [res6] = await con.query(sql6);
        rel=(res6);

    let sql7 = `SELECT * FROM state_master`;
    let [res7] = await con.query(sql7);
        state=(res7);


    let can_id = req.query.c_id;
    
    let sql = `select * from basic_details where candidate_id=${can_id}`;
    let [ans] =await con.query(sql);
    
    let s1 = `select * from education_details where candidate_id=${can_id}`;
    let [a1] =await con.query(s1);
    //console.log(a1);

     let s2 =`select * from experience_details where candidate_id= ${can_id}`;
     let [a2] = await con.query(s2);
     //console.log(a2);

     let s3 =`select * from language_details where candidate_id= ${can_id}`;
     let [a3] = await con.query(s3);
     //console.log(a3);

     let s4 =`select * from technology_details where candidate_id= ${can_id}`;
     let [a4] = await con.query(s4);
     //console.log(a4);

     let s5 = `select * from reference_details where candidate_id= ${can_id}`;
     let [a5] = await con.query(s5);
     //console.log(a5);
     
     let s6 = `select * from preference_details where candidate_id= ${can_id}`;
     let [a6] = await con.query(s6);
     //console.log(a6);

    res.render('edit',{ans:ans,a1:a1,a2:a2,a3:a3,a4:a4,a5:a5,a6:a6,can_id:can_id});
    
}

const update_api = async (req, res)=>{
    //     //------------------Basic Details-------------
   let fname = req.body.firstname;
   let lname = req.body.lastname;
   let sname = req.body.surname;
   let desc =req.body.des;
   let email =req.body.email;
   let contact =req.body.contact;
   let address1 =req.body.address1;
   let address2 =req.body.address2;
   let zipcode = req.body.zipcode;
   let city = req.body.city;
   let state = req.body.state;        
   let rstatus = req.body.rstatus;
   let dob = req.body.date; 
   let gender = req.body.gender;
   let c_id = req.body.candidate_id;
   
   //----------------   Academic Details -----------------
   var course = req.body.course;
   var ebu = req.body.board_university;
   var per = (req.body.per);
   var pass = (req.body.passing_year);
   
   //------------- Experience Details ----------------------
   var companyname = req.body.companyname;
   var designation = req.body.designation;
   var ctc = req.body.ctc;       
   var startdate = req.body.startdate;
   var enddate = req.body.enddate;

      //------------------------------Language Details ----------------
      var language =req.body.language;
   
      var read_english = req.body.read_english;
      var read_hindi = req.body.read_hindi;
      var read_gujarati = req.body.read_gujarati;
      
      var write_english = req.body.write_english;
      var write_hindi = req.body.write_hindi;
      var write_gujarati = req.body.write_gujarati;
      
      var speak_english = req.body.speak_english;
      var speak_hindi = req.body.speak_hindi;
      var speak_gujarati = req.body.speak_gujarati;
   
       //--------------------------------Technology Details---------------
   
       var tech = req.body.techno;
       var php = req.body.PHP;
       var nodejs = req.body.NodeJs;
       var mysql = req.body.MySql;
       var laravel = req.body.Laravel;
       var oracle = req.body.Oracle;
   
       //------------------------------Reference Details---------------
   
       var rname1 = req.body.rname1;
       var cnumber1 = req.body.cnumber1;
       var relation1 = req.body.relation1;
       var rname2 = req.body.rname2;
       var cnumber2 = req.body.cnumber2;
       var relation2 = req.body.relation2;
   
       //-------------------------Loaction Details------------------------
       var location = req.body.location;
       var expected_ctc= req.body.expected_ctc;
       var current_ctc = req.body.current_ctc;
   
    // use to update basic details
     let s1 = `update basic_details set candidate_firstname='${fname}' , candidate_lastname='${lname}' , candidate_surname='${sname}', candidate_designation='${desc}' , candidate_email='${email}' , candidate_address1 ='${address1}', candidate_address2='${address2}' , candidate_state='${state}' , candidate_contact=${contact} , candidate_city='${city}' , candidate_zipcode=${zipcode} , candidate_gender='${gender}' , candidate_rstatus='${rstatus}',  candidate_dob='${dob}' where candidate_id=${c_id}`;
     let SQ1 = await con.query(s1);
    //  console.log("Basic details updated!!!");

        // use to update old education details and also insert new education
        let e1 = `select education_id from education_details where candidate_id=${c_id}`;
        let [ae1] =await  con.query(e1);
        let eid1=[];  // eid1 is array of education id
        if(typeof(ae1)=='string'){
            eid1 = (ae1[0]['education_id']);
        }
        else{
            for(var i=0 ; i<ae1.length;i++){
                eid1.push(ae1[i]['education_id']);
            }
        }

        if(typeof(course)=='string'){
            let s2 = `update education_details set education_course='${course}',education_board_university='${ebu}', education_percentage=${per},education_passing_year='${pass}' where candidate_id=${c_id}`;
            let a2 = await con.query(s2);
            // console.log('Education Details inserted !!! ');
        }
        else{
            for(var i=0 ; i < eid1.length ; i++){
                let s2 = `update education_details set education_course='${course[i]}',education_board_university='${ebu[i]}', education_percentage=${per[i]},education_passing_year='${pass[i]}' where candidate_id=${c_id} && education_id=${eid1[i]}`;
                let a2 = await con.query(s2);
                // console.log('Education Details inserted !!! ');
            }
            for(var i = eid1.length;i<course.length;i++){
                let q1 = `insert into education_details (candidate_id,education_course,education_board_university,education_percentage,education_passing_year) values (${c_id},'${course[i]}','${ebu[i]}','${per[i]}','${pass[i]}')`;
                let a1 = await con.query(q1);
                // console.log('New data inserted');
            }  
        }

    //Experience -------------------------------
    
        let ex1 = `select experience_id from experience_details where candidate_id=${c_id}`;
        let [aex1] =await con.query(ex1);
        let exid1=[];
        
        if(typeof(aex1)=='string'){
            exid1 = (aex1[0]['experience_id']);
        }
        else{
            for(var i=0 ; i<aex1.length;i++){
            exid1.push(aex1[i]['experience_id']);
            }
        }

    if(typeof(companyname)=='string'){
        let s1 = `update experience_details set experience_company='${companyname}',experience_designation='${designation}',experience_ctc=${ctc},experience_sdate='${startdate}',experience_ldate='${enddate}' where candidate_id = ${c_id}`;
        let a1 = await con.query(s1);
        // console.log('Single experience inserted!!!');
    }
    else{
        for(var i=0 ; i < exid1.length ; i++){  // exid1 is array of experience id
            let s2 = `update experience_details set experience_company='${companyname[i]}',experience_designation='${designation[i]}',experience_ctc=${ctc[i]},experience_sdate='${startdate[i]}',experience_ldate='${enddate[i]}' where candidate_id = ${c_id} && experience_id=${exid1[i]}`;
            // console.log(s2);
            let a2 = await queryExecuter(s2);
            // console.log('Experience Details inserted !!! ');
        }
        for(var i = exid1.length;i<companyname.length;i++){
            let q1 = `insert into experience_details (candidate_id,experience_company,experience_designation,experience_ctc,experience_sdate,experience_ldate) values (${c_id},'${companyname[i]}','${designation[i]}','${ctc[i]}','${startdate[i]}','${enddate[i]}')`;
            // console.log(q1);
            let a1 = await con.query(q1);
            // console.log('New data inserted');
        }  
    }

// language -----------------
    let q1 = `select language_id from language_details where candidate_id=${c_id} && language_name='hindi'`;
    let q2 = `select language_id from language_details where candidate_id=${c_id} && language_name='english'`;
    let q3 = `select language_id from language_details where candidate_id=${c_id} && language_name='gujarati'`;
    let [a1] = await con.query(q1);
    let [a2] = await con.query(q2);
    let [a3] = await con.query(q3);
    let hid,eid,gid;
    if(a1 != ''){
         hid = (a1[0]['language_id']);
    }
    if(a2 != ''){
         eid = (a2[0]['language_id']);
    }
    if(a3 != ''){
         gid = (a3[0]['language_id']);
    }

    if(typeof(language) == 'string'){
        
            let s3 =`update language_details  set language_name='english',language_read='${read_english ? 'YES':'NO'}',language_write='${write_english ? 'YES':'NO'}',language_speak='${speak_english ? 'YES':'NO'}' where candidate_id=${c_id} && language_id=${eid}`;
            let a3 = await con.query(s3);
            // console.log("English Inserted !!!");
           
            let s4 =`update language_details  set language_name='hindi',language_read='${read_hindi ? 'YES':'NO'}',language_write='${write_hindi ? 'YES':'NO'}',language_speak='${speak_hindi ? 'YES':'NO'}' where candidate_id=${c_id} && language_id=${hid}`;
            let a4= await con.query(s4);
            // console.log("Hindi is inserted !!!");
     
            let s5 =`update language_details  set language_name='gujarati',language_read='${read_gujarati ? 'YES':'NO'}',language_write='${write_gujarati ? 'YES':'NO'}',language_speak='${speak_gujarati ? 'YES':'NO'}' where candidate_id=${c_id} && language_id=${gid}`;
            let a5 = await con.query(s5);
        }

    else{
     
                let s3 =`update language_details  set language_name='hindi',language_read='${read_hindi ? 'YES':'NO'}',language_write='${write_hindi ? 'YES':'NO'}',language_speak='${speak_hindi ? 'YES':'NO'}' where candidate_id=${c_id} && language_id=${hid}`;
                let a3 = await con.query(s3);
                // console.log("Hindi is Updated !!!");

                let s4 =`update language_details  set language_name='english',language_read='${read_english ? 'YES':'NO'}',language_write='${write_english ? 'YES':'NO'}',language_speak='${speak_english ? 'YES':'NO'}' where candidate_id=${c_id} && language_id=${eid}`;
                let a4 =await con.query(s4);
                // console.log("English updated !!!");
    
                let s5 =`update language_details  set language_name='gujarati',language_read='${read_gujarati ? 'YES':'NO'}',language_write='${write_gujarati ? 'YES':'NO'}',language_speak='${speak_gujarati ? 'YES':'NO'}' where candidate_id=${c_id} && language_id=${gid}`;
                let a5 = await con.query(s5);
                // console.log("Gujarati is updated !!!");
     }

        // Technology --------------------

        let query1 = `select technology_id from technology_details where candidate_id=${c_id} && technology_name='PHP'`;
        let [aq1] = await con.query(query1);
        let pid,nid,mid,lid,oid;
        if(aq1 != ''){
            pid = (aq1[0]['technology_id']);
       }
        let query2 = `select technology_id from technology_details where candidate_id=${c_id} && technology_name='NodeJs'`;
        let [aq2] = await con.query(query2);
        if(aq2 != ''){
            nid = (aq2[0]['technology_id']);
       }
        let query3 = `select technology_id from technology_details where candidate_id=${c_id} && technology_name='MySql'`;
        let [aq3] = await con.query(query3);
        if(aq3 != ''){
            mid = (aq3[0]['technology_id']);
       }
        let query4 = `select technology_id from technology_details where candidate_id=${c_id} && technology_name='Laravel'`;
        let [aq4] = await con.query(query4)
        if(aq4 != ''){
            lid = (aq4[0]['technology_id']);
       }
        let query5 = `select technology_id from technology_details where candidate_id=${c_id} && technology_name='Oracle'`;
        let [aq5] = await con.query(query5)
        if(aq5 != ''){
            oid = (aq5[0]['technology_id']);
       }

        if(typeof(tech)=='string'){
            if(tech == 'PHP' && pid != undefined){
                let s1 = `update technology_details set technology_name='${tech}',technology_level='${php}' where candidate_id=${c_id} && technology_id='${pid}'`;
                let a1 = await con.query(s1);
            }
            if(tech == 'PHP' && pid == undefined){
                let s1 = `insert into technology_details (candidate_id,technology_name,technology_level) values (${c_id},'${tech}','${php}')`;
                let a1 = await con.query(s1);
                
            }
            if(tech=='NodeJs' && nid != undefined){
                let s2 = `update technology_details set technology_name='${tech}',technology_level='${nodejs}' where candidate_id=${c_id} && technology_id='${nid}'`;
                let a2 = await con.query(s2);
            }
            if(tech == 'NodeJs' && nid == undefined){
                let s2 = `insert into technology_details (candidate_id,technology_name,technology_level) values (${c_id},'${tech}','${nodejs}')`;
                let a2 = await con.query(s2);
            }
            if(tech=='MySql' && mid != undefined){
                let s3 = `update technology_details set technology_name='${tech}',technology_level='${mysql}' where candidate_id=${c_id} && technology_id='${mid}'`;
                let a3 = await con.query(s3);
            }
            if(tech == 'MySql' && mid == undefined){
                let s3 = `insert into technology_details (candidate_id,technology_name,technology_level) values (${c_id},'${tech}','${mysql}')`;
                let a3 = await con.query(s3);
            }
            if(tech=='Laravel' && lid != undefined){
                let s4 = `update technology_details set technology_name='${tech}',technology_level='${laravel}' where candidate_id=${c_id} && technology_id='${lid}'`;
                let a4 = await con.query(s4);
                
            }
            if(tech == 'Laravel' && lid == undefined){
                let s4 = `insert into technology_details (candidate_id,technology_name,technology_level) values (${c_id},'${tech}','${laravel}')`;           
                let a4 = await con.query(s4);
            }
            if(tech=='Oracle' && oid != undefined){
                let s5 = `update technology_details set technology_name='${tech}',technology_level='${oracle}' where candidate_id=${c_id} && technology_id='${oid}'`;
                let a5 = await con.query(s5);
            }
            if(tech == 'Oracle' && oid == undefined){
                let s5 = `insert into technology_details (candidate_id,technology_name,technology_level) values (${c_id},'${tech}','${oracle}')`;
                let a5 = await con.query(s5);
            }
            // console.log('Technology inserted !!!');
         }
         else{
            for(var i=0 ; i<tech.length ; i++){
                if(tech[i] == 'PHP' && pid != undefined){
                    let s1 = `update technology_details set technology_name='${tech[i]}',technology_level='${php}' where candidate_id=${c_id} && technology_id='${pid}'`;
                    let a1 = await con.query(s1);
                }
                if(tech[i] == 'PHP' && pid == undefined){
                    let s1 = `insert into technology_details (candidate_id,technology_name,technology_level) values (${c_id},'${tech[i]}','${php}')`;
                    let a1 = await con.query(s1);
                }
                if(tech[i]=='NodeJs' && nid != undefined){
                    let s2 = `update technology_details set technology_name='${tech[i]}',technology_level='${nodejs}' where candidate_id=${c_id} && technology_id='${nid}'`;
                    let a2 = await con.query(s2);
                }
                if(tech[i] == 'NodeJs' && nid == undefined){
                    let s2 = `insert into technology_details (candidate_id,technology_name,technology_level) values (${c_id},'${tech[i]}','${nodejs}')`;
                    let a2 = await con.query(s2);
                }
                if(tech[i]=='MySql' && mid != undefined){
                    let s3 = `update technology_details set technology_name='${tech[i]}',technology_level='${mysql}' where candidate_id=${c_id} && technology_id='${mid}'`;
                    let a3 = await con.query(s3);
                }
                if(tech[i] == 'MySql' && mid == undefined){
                    let s3 = `insert into technology_details (candidate_id,technology_name,technology_level) values (${c_id},'${tech[i]}','${mysql}')`;
                    let a3 = await con.query(s3);
                }
                if(tech[i]=='Laravel' && lid != undefined){
                    let s4 = `update technology_details set technology_name='${tech[i]}',technology_level='${laravel}' where candidate_id=${c_id} && technology_id='${lid}'`;
                    let a4 = await con.query(s4);
                }
                if(tech[i] == 'Laravel' && lid == undefined){
                    let s4 = `insert into technology_details (candidate_id,technology_name,technology_level) values (${c_id},'${tech[i]}','${laravel}')`;
                    let a4 = await con.query(s4);
                }
                if(tech[i] =='Oracle' && oid != undefined){
                    let s5 = `update technology_details set technology_name='${tech[i]}',technology_level='${oracle}' where candidate_id=${c_id} && technology_id='${oid}'`;
                    let a5 = await con.query(s5);
                }
                if(tech[i] == 'Oracle' && oid == undefined){
                    let s5 = `insert into technology_details (candidate_id,technology_name,technology_level) values (${c_id},'${tech[i]}','${oracle}')`;
                    let a5 = await con.query(s5);
                }
            // console.log("Technology inserted !!!");
        }
     }
        // Reference Update -------------

        let uid = `select reference_id from reference_details where candidate_id=${c_id}`;
        let [uid1] =await con.query(uid);
        let id1 = (uid1[0]['reference_id']);
        let id2 = (uid1[1]['reference_id']);

        let s6 = `update reference_details set reference_name='${rname1}' , reference_contact=${cnumber1} , reference_relation='${relation1}' where reference_id=${id1}`;
        let a6 = await con.query(s6);

        let s7 = `update reference_details set reference_name='${rname2}' , reference_contact=${cnumber2} , reference_relation='${relation2}' where reference_id = ${id2}`;
        let a7 = await con.query(s7);

    //Preference----------------

     let s8 = `update preference_details set preference_location='${location}',preference_ctc=${expected_ctc},preference_cctc=${current_ctc} where candidate_id=${c_id}`;
     let a8 = await con.query(s8);
     
     res.redirect('/show');

}

module.exports = {candidate,city_api,candidate_data,candidate_details,show,delete_api,delete_all_api,edit_api,update_api}
