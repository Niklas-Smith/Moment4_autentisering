const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const sqlite3 = require("sqlite3").verbose()
const cors = require("cors");
const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
app.use(cors())

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
  // skapar en jwt token
   const payload = {username: username};
   const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn:"2h"})
   const response = {
 message: "you are login",
 token: token


   }
 res.status(200).json({response}) 

}
 }

    });
  } catch (error){
        res.status(500).json( {error : "samething Went wrong....."}  )

  }


})

app.get("/api/hidden", authenticateToken, (req,res) => {

res.json({message: "hidden route"})

})



app.post("/api/cars",authenticateToken, async(req, res) => {
  try {
       let {carbrand, carmodel,price,year} = req.body;
 
    if(!carbrand || ! carmodel|| !price|| !year) {
        let error = {
   message:"",
  detail : "",
  http_response: {

  }
};

  error.message = "carbrand, carmodel, price and year is not included"
  error.detail = "you need to input carbrand, carmodel,price and year in JSON"
  error.http_response.message = "bad request"
   error.http_response.code = 400;

         return res.status(400).json(error)

    }
/*kollar om användare finns (gör senare)   */



const sql = `INSERT INTO cars(carbrand, carmodel,price,year)VALUES(?,?,?,?)`;
db.run(sql, [carbrand, carmodel,price,year], (err) => {
if(err){
res.status(400).json({Message: "Error when input new car"})

}else{

 res.status(201).json({Message: "New car created"})
}

});

    
  } catch (error){
        res.status(500).json( {error : "samething Went wrong....."}  )

        
  }

});


function authenticateToken(req,res,next) {
const authHeader = req.headers["authorization"];
const token = authHeader && authHeader.split(" ")[1]
if(token== null)
res.status(401).json({message: "you dont have acces to this route - you need token"})

jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) =>{
if(err) return res.status(403).json({message: "you have wrong JWT"})


  req.username = username
  next();
})


}
app.get("/api/hidden", authenticateToken, (req,res) => {

res.json({message: "hidden route"})

})


app.get("/api/cars", (req,res) => {
 const sql = `SELECT * FROM cars`;
 db.all(sql, (err,rows) => {
  if(err) {
  return  res.status(500).json({message: "samething went wrong"})

 } 
res.json(rows)
});

});




app.listen(port,() => {

     

    console.log(`App started on port:${port}`);
} )



/* {
"username" : "niklas",
"password" : "password"

}   */







/*  
{
"carbrand" : "niklas",
"carmodel" : "password",
"price" : 3333,
"year" : 2024
} 


*/





