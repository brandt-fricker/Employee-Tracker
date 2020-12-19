const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_db"
  });

function getAllRowsFromTable(table,cb){
    const queryString = `SELECT * FROM ${table}`;
    connection.query(queryString, function(err,rows){
        if (err){
           
            cb(err);
        }else{
            cb(null,rows);

        }
    })
}
getAllRowsFromTable('department',function(err,rows){
    if(err){
        console.log("Error getting all rows: ",err);
    }else{
        console.table(rows);
    }
});

