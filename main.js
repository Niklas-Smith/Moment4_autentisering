const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const sqlite3 = require("sqlite3").verbose()
const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000
const bcrypt = require("bcrypt")

const db = new sqlite3.Database(process.env.DATABASE);



app.post("/api/register", async(req, res) => {
  try {
       let {username, password} = req.body;
 
    if(!username || ! password) {
         return res.status(400).json({error: "must have both password and username" })

    }
/*kollar om användare finns (gör senare)   */

const hashedPassword = await bcrypt.hash(req.body.password, 10);


const sql = `INSERT INTO users_accunts(username, password)VALUES(?,?)`;
db.run(sql, [username, hashedPassword], (err) => {
if(err){
res.status(400).json({Message: "Error when created user"})

}else{

 res.status(201).json({Message: "New user Reqister"})
}

});

    


  } catch (error){
        res.status(500).json( {error : "samething Went wrong....."}  )



        
  }

});

app.post("/api/login" , async(req, res)=> {

  try {
       let {username, password} = req.body;
 
       
    if(!username || ! password) {
         return res.status(400).json({error: "must have both password and username" })

    }

    const sql = `SELECT * FROM users_accunts WHERE username =? ` ;
    db.get(sql, [username], async(err, row) => {
    if(err) {
             res.status(400).json({error: "Error with authenticator"})
       
    } else if(!row){
 res.status(401).json({error: "wrong password or username!"})
 } else {
       
   const matchPassword = await bcrypt.compare(password, row.password);

if(!matchPassword) {

res.status(401).json({Message: "wrong password or username!"}) 
 
} else {
 res.status(200).json({Message: "You are login"}) 

}
 }

    });
  } catch (error){
        res.status(500).json( {error : "samething Went wrong....."}  )

  }


})


app.listen(port,() => {

     

    console.log(`App started on port:${port}`);
} )



/* {
"username" : "niklas",
"password" : "password"

}   */