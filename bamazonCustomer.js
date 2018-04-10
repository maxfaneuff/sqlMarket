//bugs//
//formatting the data in a nice-looking table//

//require shiz//
var mysql = require("mysql");
var inquirer = require("inquirer");

//connect to server//
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
  begin();
});

//Reads data from products table.//
//Need to figure out how to make table look pretty.//
function begin() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    console.log("Welcome to Bamazon!");
    for (var i = 0; i < res.length; i++) {
      console.log("_______________________________________\n");
      console.log(
        "Item:  " +
          res[i].product_name +
          "\nPrice:  $" +
          res[i].price +
          "\nProduct ID:  " +
          res[i].item_id
      );
    }
    welcome();
  });
}

//Beginning inquirer prompt//
//Need to figure out how to get this to run after console.log in function begin.//
//Going to be an asynch issue//
function welcome() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "select",
        message:
          "Welcome to Bamazon!  Please enter an ID of the item you wish to purchase"
      },
      {
        type: "input",
        name: "howmuch",
        message: "How much/many of this item do you wish to purchase?"
      }
    ])
    .then(answers => {
      fulfillOrder(answers);
    });
}

//function to check inventory against requested items//
function fulfillOrder(answers) {
  connection.query(
    "SELECT stock_quantity, price, product_name, product_sales FROM products WHERE item_id=?",
    [answers.select],
    function(err, res) {
      if (err) throw err;

      for (var i = 0; i < res.length; i++) {
        var price = parseInt(res[i].price);
        var item = res[i].product_name;
        var stockQuantity = parseInt(res[i].stock_quantity);
        var quantityRequest = parseInt(answers.howmuch);
        var pastSales;
        if (res[i].product_sales != null) {
          pastSales = parseInt(res[i].product_sales);
        } else {
          pastSales = 0;
        }

        var newSales = price * quantityRequest + pastSales;

        if (stockQuantity < quantityRequest) {
          console.log(
            "Sorry!  There's not enough of that item in stock to fulfill that order.  Goodbye!"
          );
          connection.end();
        } else if (stockQuantity >= quantityRequest) {
          var remainingQuantity = stockQuantity - quantityRequest;
          updateInventory(remainingQuantity, item);
          updateSales(newSales, item);
          console.log("Ok!  Your total comes to:  $" + quantityRequest * price);
        }
      }
    }
  );
}

function updateInventory(quantity, product, totalSales) {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: quantity
      },
      {
        product_name: product
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log("Thank you for your order!");
    }
  );
}

function updateSales(newSales, item) {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        product_sales: newSales
      },
      {
        product_name: item
      }
    ],
    function(err, res) {
      if (err) throw err;
    }
  );
  connection.end();
}
