//bugs//
//new departments aren't populating right.  ID and Overhead Cost show up, but department name doesn't, and total profit is just Overhead cost//

//require shiz//
var mysql = require("mysql");
var inquirer = require("inquirer");
const { table } = require("table");
//connect to server//
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "Garnets75!",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id" + connection.threadId);
  hello();
});

function goodbye() {
  console.log("Goodbye!");
  connection.end();
}

function hello() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "hello",
        message: "Welcome, supervisor.  What would you like to do?",
        choices: ["View Product Sales By Department", "Create New Department"]
      }
    ])
    .then(answers => {
      if (answers.hello == "View Product Sales By Department") {
        viewDepartment();
      } else if (answers.hello == "Create New Department") {
        createDepartment();
      }
    });
}

function viewDepartment() {
  connection.query(
    "SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales" +
      " FROM departments LEFT JOIN products ON departments.department_id = products.item_id GROUP BY departments.department_id",
    function(err, res) {
      if (err) throw err;

      for (var i = 0; i < res.length; i++) {
        let config, data, output;

        data = [
          [
            "department_id",
            "department_name",
            "over_head_costs",
            "product_sales",
            "total_profit"
          ],
          [
            res[i].department_id,
            res[i].department_name,
            res[i].over_head_costs,
            res[i].product_sales,
            res[i].over_head_costs - res[i].product_sales
          ]
        ];

        config = {
          columns: {
            0: {
              alignment: "left",
              minWidth: 10
            },
            1: {
              alignment: "left",
              minWidth: 10
            },
            2: {
              alignment: "left",
              minWidth: 10
            },
            3: {
              alignment: "left",
              minWidth: 10
            },
            4: {
              alignment: "left",
              minWidth: 10
            },
            5: {
              alignment: "left",
              minWidth: 10
            }
          }
        };

        output = table(data, config);
        console.log(output);
      }
      goodbye();
    }
  );
}

function createDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What department would you like to create?"
      },
      {
        type: "input",
        name: "costs",
        message: "What are the overhead costs for this department?"
      }
    ])
    .then(answers => {
      connection.query(
        "INSERT INTO departments SET ?",
        {
          department_name: answers.name,
          over_head_costs: answers.costs
        },
        function(err, res) {
          if (err) throw err;

          console.log("Ok!  New department added");
          goodbye();
        }
      );
    });
}
