var mysql = require("mysql");
var inquirer = require('inquirer');


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_DB"
});



// Display products database using a table made with the npm package cli-table2
// then Prompt the user to determine item and quantity they want to purchase
var showItems = function() {

	connection.query('SELECT * FROM products', function(err, results){
        if (err) throw err;
    // Log all results of the SELECT statement
    for(var i=0; i<results.length; i++){
        console.log(results[i].item_id+":"+results[i].product_name+","+results[i].price);
   
   }
		purchaseProduct();
	});
}

function purchaseProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) console.log(err);

        inquirer.prompt([{
                type: "input",
                message: "Please input the ID of the product you are interested in.",
                name: "itemID",
            },
            {
                type: "input",
                message: "How many?",
                name: "quantity",
            },
        ]).then(function (answer) {
            var chosenProduct;

            for (var i = 0; i < res.length; i += 1) {
                if (res[i].item_id === parseInt(answer.itemID)) {
                    chosenProduct = res[i];
                }
            };

            if (chosenProduct.stock_quantity < parseInt(answer.quantity)) {
                console.log("\n")
                console.log("Sorry, Insufficient Quantity!");
                console.log("\n")
                connection.end();
            } else {
                var quantityUpdate = chosenProduct.stock_quantity - parseInt(answer.quantity);

                connection.query(
                    "UPDATE products SET ? WHERE ?", [
                        {
                            stock_quantity: quantityUpdate
                        },
                        {
                            item_id: chosenProduct.item_id
                        }
                    ],
                    function (err) {
                        if (err) {
                            console.log(err)
                            initialFunction();
                        } else {
                            var totalPrice = chosenProduct.price * parseInt(answer.quantity);
                            console.log("\n")
                            console.log("--------------------------------------------------");
                            console.log("Your total is: " + totalPrice);
                            console.log("Thank you for your purchase!");
                            console.log("We now only have " + quantityUpdate);
                            console.log("--------------------------------------------------");
                            console.log("\n")
                            connection.end();
                        }
                    }
                )
            }; 
        });
    });
};

var initialFunction = function() {
    // connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
  
  });

    inquirer.prompt({
        name: "action",
        type: "list",

        message: " Would like to shop?\n",
        choices: ["Yes", "No"]
    }).then(function(answer) {
        switch(answer.action) {
            case 'Yes':
                showItems();
            break;

            case 'No':
                connection.end();
            break;
        }
    })
};


//Start application 

initialFunction();