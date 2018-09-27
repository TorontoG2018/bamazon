DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(12,2) NULL,
  stock_quantity INT(45) NULL,  
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bread", "Food", 6.00, 45);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee", "Food", 24.00, 56);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Game of Thrones", "Books", 10.00, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("COD", "Video Games", 100.00, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("knifes", "tools", 6.00, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("screwdriver", "tools", 8.00, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Atlas Shrugged", "Books", 14.00, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Age of Empires", "Games", 34.00, 1);


select * FROM products