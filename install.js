require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(process.env.DATABASE);


/*ta bort tablelen om den finns och skapar ny table */
db.serialize(()=> {

db.run("DROP TABLE IF EXISTS users_accunts;")

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