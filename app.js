const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_db"
  });

// function getAllRowsFromTable(table,cb){
//     const queryString = `SELECT * FROM ${table}`;
//     connection.query(queryString, function(err,rows){
//         if (err){
           
//             cb(err);
//         }else{
//             cb(null,rows);

//         }
//     })
// }
// getAllRowsFromTable('departments',function(err,rows){
//     if(err){
//         console.log("Error getting all rows: ",err);
//     }else{
//         console.table(rows);
//     }
// });

connection.connect(function(err) {
    if (err){
        console.log("YOU HAVE AN ERROR: "+err);
    };
    start();
    getDepartments();
    getRoles();
    getManagers();
    getEmployees();
  });

  function start(){ 

    inquirer
      .prompt({
        name: "choices",
        type: "list",
        message: "What would you like to do?",
        choices: ["ADD", "VIEW", "UPDATE", "DELETE", "EXIT"]
      })
      .then(function(answer) {
           if (answer.choices === "VIEW") {
            view();
          } 
        else if (answer.choices === "ADD") {
          add();
        }
        else if (answer.choices === "UPDATE") {
          update();
        }
        else if (answer.choices === "DELETE") {
          deleteInput();
        }
        else if (answer.choices === "EXIT") {
         
        
          connection.end();
        }
        else{
          connection.end();
        }
      });
  }
  function getRoles(){
    connection.query("SELECT id, title FROM roles", (err, res) => {
      if (err) throw err;
      roles = res;
    
    })
  };
  
  function getDepartments() {
    connection.query("SELECT id, name FROM departments", (err, res) => {
      if (err) throw err;
      departments = res;
     
    })
  };
  
  function getManagers(){
    connection.query("SELECT id, first_name, last_name FROM employee", (err, res) => {
      if (err) throw err;
      managers = res;
      
    })
  };
  
  function getEmployees(){
    connection.query("SELECT id FROM employee", (err, res) => {
      if (err) throw err;
      employees = res;
      
    })
  };
  function add() {
    inquirer.prompt([
      {
        name: "add",
        type: "list",
        message: "What would you like to add?",
        choices: ["DEPARTMENT", "ROLE", "EMPLOYEE", "EXIT"]
      }
    ]).then(function(answer) {
      if (answer.add === "DEPARTMENT") {
        console.log("Add a new: " + answer.add);
        addDepartment();
      }
      else if (answer.add === "ROLE") {
        console.log("Add a new: " + answer.add);
        addRole();
      }
      else if (answer.add === "EMPLOYEE") {
        console.log("Add a new: " + answer.add);
        addEmployee();
      } 
      else if (answer.add === "EXIT") {
        
  
        connection.end();
      } else {
        connection.end();
      }
    })
  };
  function addDepartment() {
    inquirer.prompt([
      {
        name: "department",
        type: "input",
        message: "What department would you like to add?"
      }
    ]).then(function(answer) {
      connection.query(`INSERT INTO department (name) VALUES ('${answer.department}')`, (err, res) => {
        if (err) throw err;
        console.log("New department added: " + answer.department);
        getDepartments();
        start();
      }) 
    })
  };