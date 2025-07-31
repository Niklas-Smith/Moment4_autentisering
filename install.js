
/*  includera dotenv,express och sqliter3 */
require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

/*  skapar databasen */
const db = new sqlite3.Database(process.env.DATABASE);



db.serialize(()=> {
/*ta bort tabelen om den finns */
db.run("DROP TABLE IF EXISTS users_accunts;")


/*  skapar ny table */
db.run(
    
    `
  CREATE TABLE users_accunts (
id INTEGER PRIMARY KEY AUTOINCREMENT,
username VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
created DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

console.log("Table is created")
}
);

/*stänger databasen */

db.close(); 