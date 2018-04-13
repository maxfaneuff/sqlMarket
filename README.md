# **sqlMarket Homework - Markdown**

##### An overview of the functionality of my sqlMarket - Bamazon

## **bamazonCustomer**

##### Bamazon Customer is the first & simplest of the Bamazon.js pages. When loaded w/ Node, BamazonCustomer shows the user a list of all the items for sale, their price, and their product ID number, which increments automatically ![customer onload](https://raw.githubusercontent.com/maxfaneuff/sqlMarket/master/images/customer%20onload.png).

##### Users are then prompted to enter the ID number of the item they wish to purchase, and then the quantity of how many of that item they wish to purchase. The app tallies up the total, presents the user w/ a checkout statement, and subtracts the requested quantity from our stock_quantity ![customer purchase](https://raw.githubusercontent.com/maxfaneuff/sqlMarket/master/images/customer%20purchase.png).

##### If a user tries to purchase an item at a quantity beyond what we have in stock, an error message is displayed ![customer toomany](https://raw.githubusercontent.com/maxfaneuff/sqlMarket/master/images/customer%20toomany.png). In either case, the app exits after the transaction.

## **bamazonManager**

##### Bamazon Manager is the second & manager-oriented platform for Bamazon. When loaded, the user is presented with a menu of for selections ![manager menu](https://raw.githubusercontent.com/maxfaneuff/sqlMarket/master/images/manager%20menu.png).

##### Selecting "View Products for Sale" takes the user to a table of our inventory, similar to the one in BamazonCustomer. The table shows each item's name, price, ID number, department under which it can be found, and the quantity in stock ![manager viewinventory](https://raw.githubusercontent.com/maxfaneuff/sqlMarket/master/images/manager%20viewinventory.png).

##### Selecting "View Low Inventory" will show the user all the items that have fewer than 5 in stock. If no items are below 5 in stock, than no message is displayed. The item's name, ID, and current quantity is displayed. The app then quits ![manager lowstock](https://raw.githubusercontent.com/maxfaneuff/sqlMarket/master/images/manager%20lowstock.png).

##### Selecting "Add to Inventory" allows the manager to set a new inventory for a low item. When selected, the app asks the manager which item to increase the quantity of, and what that new quantity should be ![manager morestock](https://raw.githubusercontent.com/maxfaneuff/sqlMarket/master/images/manager%20morestock.png).

##### When completed, a success message is displayed, telling the manager that the quantity of the desired item has been increased. The app then quits ![manager morestock2](<https://raw.githubusercontent.com/maxfaneuff/sqlMarket/master/images/manager%20morestock%20(2).png>).

##### Selecting "Add New Product" allows the manager to add a new product to the store. When selected, the app asks the manager to fill in the item's name, price & quantity. An ID number is automatically generated for the new item. When finished, a success message is displayed, telling the manager that the item has been added to the store. The app then quits ![manager newitem](https://raw.githubusercontent.com/maxfaneuff/sqlMarket/master/images/manager%20newitem.png).

## **bamazonSupervisor**

##### Bamazon Supervisor is the third & last app for Bamazon. When loaded, a supervisor is asked between "View Product Sales By Department" or "Create New Department". ![supervisor menu](https://raw.githubusercontent.com/maxfaneuff/sqlMarket/master/images/supervisor%20menu.png).

##### Selecting "View Product Sales by Department" displays all the departments in the store in a separate table. Each table has department ID, the name of the department, the overhead costs for running the department, how much business the department has done, and the profits of the department. ![supervisor viewinventory](https://raw.githubusercontent.com/maxfaneuff/sqlMarket/master/images/supervisor%20viewinventory.png)

##### Selecting "Create a Department" allows a supervisor to create a department. When selected, the supervisor is asked to input the department name, and list the overhead costs for this new department. When finished, a success message is displayed, and the app quits. ![supervisor createdept](https://raw.githubusercontent.com/maxfaneuff/sqlMarket/master/images/supervisor%20newdept.png)

##### Once a new department is created, selecting "View Product Sales by Department" will show the newly created department, with the pertinent data associated w/ it. ![supervisor viewnewdept](https://raw.githubusercontent.com/maxfaneuff/sqlMarket/master/images/supervisor%20viewnewdept.png)
