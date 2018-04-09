var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "Garnets75!",
  database: "bamazon"
});

//to be run on connection.  list data & begin prompt//
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
        message: "Hello, Bamazon Manager.  What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      }
    ])
    .then(answers => {
      if (answers.hello === "View Products for Sale") {
        readInventory();
      } else if (answers.hello === "View Low Inventory") {
        readLowInventory();
      } else if (answers.hello === "Add to Inventory") {
        updateInventory();
      }
    });
}

function readInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    console.log("Here is the current inventory:");
    for (var i = 0; i < res.length; i++) {
      console.log("____________________________________________");
      console.log("Item:  " + res[i].product_name + "\n");
      console.log("Item ID:  " + res[i].item_id + "\n");
      console.log("Price:  $" + res[i].price + "\n");
      console.log("Quantity In Stock:  " + res[i].stock_quantity + "\n");
      console.log("Department:  " + res[i].department_name + "\n");
    }
  });
  goodbye();
}

function readLowInventory() {
  connection.query(
    "SELECT product_name, item_id, stock_quantity FROM products WHERE stock_quantity<5",
    function(err, res) {
      if (err) throw err;

      console.log(
        "We have fewer than 5 of the following items remaining in stock:\n"
      );
      for (var i = 0; i < res.length; i++) {
        console.log("_______________________________________\n");
        console.log("Item:  " + res[i].product_name + "\n");
        console.log("Item ID:  " + res[i].item_id + "\n");
        console.log("Quantity In Stock:  " + res[i].stock_quantity + "\n");
      }
    }
  );
  goodbye();
}

function updateInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    var itemArr = [];
    for (var i = 0; i < res.length; i++) {
      itemArr.push(res[i].product_name);
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "select",
          message: "Which item would you like to increase stocks of?",
          choices: itemArr
        },
        {
          type: "input",
          name: "howmuch",
          //change this to "how many would you like to add?"//
          message: "How many would you like to have in stock?"
        }
      ])
      .then(answers => {
        connection.query(
          "UPDATE products SET ? WHERE ? ",
          [
            {
              //this needs to be stock_quantity:  answers.howmuch + however I can reference the current stock_quantity//
              stock_quantity: answers.howmuch
            },
            {
              product_name: answers.select
            }
          ],
          function(err, res) {
            if (err) throw err;

            console.log(
              "Our inventory has been updated.  Your current inventory is:  " +
                answers.howmuch
            );
          }
        );
      });
  });
  //where do I put the goodbye function?//
}
