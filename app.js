const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require("figlet");
// creating connection to mysql db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employees_db",
});

figlet("Employee Tracker", function (err, res) {
  console.log(err || res);
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

function start() {
  inquirer
    .prompt({
      message: "what would you like to do?",
      type: "list",
      choices: [
        "View all employees",
        "View all departments",
        "Update employee role",
        "Add an employee",
        "Add a department",
        "Add a role",
        "QUIT",
      ],
      name: "choice",
    })
    .then((answers) => {
      console.log(answers.choice);
      switch (answers.choice) {
        case "View all employees":
          viewAllEmployees();
          break;

        case "View all departments":
          viewAllDepartments();
          break;

        case "Update employee role":
          updateEmployeeRole();
          break;
        case "Add an employee":
          addEmployee();
          break;

        case "Add a department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "QUIT":
          figlet("Have A Good Day", function (err, res) {
            console.log(err || res);
          });
          connection.end();
          break;

        // default:
        //   connection.end();
        //   break;
      }
    });
}

function viewAllEmployees() {
  connection.query("SELECT * FROM employee", function (err, data) {
    if (err) {
      console.log("YOU HAVE AN ERROR VIEWING ALL EMPLOYEES: " + err);
    } else {
      figlet("Employees", function (err, res) {
        console.log(err || res);
      });
      console.table(data);
      start();
    }
  });
}

function viewAllDepartments() {
  connection.query("SELECT * FROM departments", function (err, data) {
    if (err) {
      console.log("YOU HAVE AN ERROR VIEWING ALL DEPARTMENTS: " + err);
    } else {
      figlet("Departments", function (err, res) {
        console.log(err || res);
      });
      console.table(data);
      start();
    }
  });
}
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "number",
        message: "Select employee by ID number that you wish to update",
        name: "employeeId",
      },
      {
        type: "number",
        message: "Enter a new role ID for employee",
        name: "roleId",
      },
    ])
    .then(function (res) {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [res.roleId, res.employeeId],
        function (err, data) {
          if (err) {
            console.log("ERROR UPDATING EMPLOYEE ROLE: " + err);
          } else {
            console.log("Updated Employee Role");
          }
          start();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the employee you're adding?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the last name of the employee you're adding?",
        name: "lastName",
      },
      {
        type: "number",
        message: "What is the employees role ID?",
        name: "roleId",
      },
      {
        type: "number",
        message: "What is the employees managers ID?",
        name: "managerId",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [res.firstName, res.lastName, res.roleId, res.managerId],
        function (err, data) {
          if (err) {
            console.log("ERROR ADDING AN EMPLOYEE: " + err);
          } else {
            console.table("Added Employee");
            start();
          }
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What department do you want to add?",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO departments (name) VALUES (?)",
        [res.department],
        function (err, data) {
          if (err) {
            console.log("ERROR ADDING DEPARTMENT: " + err);
          } else {
            console.log("Added New Department");
            start();
          }
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter title for new role:",
        name: "newRole",
      },
      {
        type: "number",
        message: "Enter salary for new role:",
        name: "newSalary",
      },
      {
        type: "number",
        message: "Enter department ID for new role:",
        name: "newDeptID",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)",
        [res.title, res.salary, res.department_id],
        function (err, data) {
          if (err) {
            console.log("ERROR ADDING ROLE: " + err);
          } else {
            console.log("Added New Role");
          }
        }
      );
      start();
    });
}
