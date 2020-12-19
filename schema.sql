DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (30),
    PRIMARY KEY (id) 
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30),
    salary DECIMAL (10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES departments(id)   
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)  
);

INSERT INTO departments(name)
Values ('Sales'), ('Marketing'),('Engineering'),('Human Resources');

INSERT INTO roles(title, salary, department_id) Values ('Sales Associate',40000,1),('Research and Development',50000,2),('Engineer',60000,3),('HR',30000,4),('Sales Manager',75000,1),('Marketing Manager',75000,2),('Engineering Manager',75000,3),('Human Resources Manager',75000,4);

INSERT INTO employee(first_name,last_name,role_id,manager_id) Values ('Spider','Man',5,NULL),('Iron','Man',1,1),('Black','Panther',6,NULL),('Dead','Pool',2,3),('Captain','America',7,NULL),('Jessica','Jones',3,5),('Ant','Man',8,NULL),('Captain','Marvel',4,7);

