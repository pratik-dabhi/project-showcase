const mysql = require('mysql2/promise')

var con =  mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"form_job"
});
// con.connect((err) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log('Database connected!!')
// })
module.exports = con