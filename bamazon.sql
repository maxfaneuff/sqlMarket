CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER (200) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (500) NOT NULL,
    department_name VARCHAR(500),
    price INTEGER (100) NOT NULL,
    stock_quantity INTEGER (100),
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
	("lawnmower", "gardening", 250, 50),
    ("banana", "grocery", 10, 500),
    ("jeans", "apparel", 25, 300),
	("soil", "gardening", 30, 350),
    ("beer", "grocery", 10, 400),
    ("sweater", "apparel", 45, 200),
    ("rake", "gardening", 35, 125),
    ("bread", "grocery", 5, 475),
    ("jacket", "apparel", 175, 75),
    ("weed wacker", "gardening", 125, 30);

CREATE TABLE departments (
	department_id INTEGER (100) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR (500) NOT NULL,
    over_head_costs INTEGER (100) NOT NULL
);

ALTER TABLE products 
ADD product_sales INTEGER (100);

INSERT INTO departments (department_name, over_head_costs)
VALUES
	("gardening", 1000),
    ("grocery", 4000),
    ("apparel", 7000),
    ("Electronics", 5000);