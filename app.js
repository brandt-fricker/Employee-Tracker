const mysql = require("mysql");
const inquirer = require("inquirer");

// creating connection to mysql db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
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
        "Add an employee",
        "Add a department",
        "Add a role",
        "Update employee role",
        "QUIT",
      ],
      name: "choice",
    })
    .then((answers) => {
      console.log(answers.choice);
      switch (answers.choice) {
        case "View all employees":
          viewEmployees();
          break;

        case "View all departments":
          viewDepartments();
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

        case "Update employee role":
          updateEmployeeRole();
          break;

        default:
          connection.end();
          break;
      }
    });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, data) {
    if (err) {
      console.log("YOU HAVE AN ERROR VIEWING ALL EMPLOYEES: " + err);
    } else {
      console.table(data);
      start();
    }
  });
}

function viewDepartments() {
  connection.query("SELECT * FROM departments", function (err, data) {
    if (err) {
      console.log("YOU HAVE AN ERROR VIEWING ALL DEPARTMENTS: " + err);
    } else {
      console.table(data);
      start();
    }
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the employee?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the last name of the employee?",
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
            console.table("Added Department");
            start();
          }
        }
      );
    });
}

function addRole() {
  inquirer.prompt([
      {
          type: 'input',
          message: 'Enter title for new role:',
          name: 'newRole'

      },
      {
        type: 'input',
        message: 'Enter title for new role:',
        name: 'newRole'

    },
    ]);
}
