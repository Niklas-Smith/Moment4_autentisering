// gör så jag kan använda express
const express = require("express");
// gör så jag kan använda body-parser
const bodyParser = require("body-parser");
// gör så jag kan använda dotenv
require("dotenv").config();
// gör så jag kan använda sqlite3 
const sqlite3 = require("sqlite3").verbose()
// gör så jag kan använda cors
const cors = require("cors");
/*skapar app med express */
const app = express()
/*gör så express kan användra bodyparser*/
app.use(bodyParser.json())
// skappar port från env fil eller 3000
const port = process.env.PORT || 3000
// gör så jag kan använda bcrypt
const bcrypt = require("bcrypt")
// gör så jag kan använda jsonwebtoken
const jwt = require("jsonwebtoken")
// gör så att app använder cors
app.use(cors())

// Skapar en databas som använder sqlite3 
const db = new sqlite3.Database(process.env.DATABASE);





// skapar ett post begäran där man kan register sig i tablen users_accunts .
app.post("/api/register", async(req, res) => {
  try {
       let {username, password} = req.body;
 
    if(!username || ! password) {
         return res.status(400).json({error: "must have both password and username" })

    }
/*kollar om användare finns (gör senare)   */

// skapar ett skyddat lösenord som använder bcrypt.
const hashedPassword = await bcrypt.hash(req.body.password, 10);

 // sql som gör att man kan lägga till hashedPassword, username  i tabelen users_accunts.
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


// skapar ett post begäran där man kan loga in sig med om man använder som information som finna lagrad när man register sig .
app.post("/api/login" , async(req, res)=> {

  try {
       let {username, password} = req.body;
 
       
    if(!username || ! password) {
         return res.status(400).json({error: "must have both password and username" })

    }
 // sql som gör att can logga in sig om information match vad som finns i tablen users_accunts.
    const sql = `SELECT * FROM users_accunts WHERE username =? ` ;
    db.get(sql, [username], async(err, row) => {
    if(err) {
             res.status(400).json({error: "Error with authenticator"})
       
    } else if(!row){
 res.status(401).json({error: "wrong password or username!"})
 } else {
        // se om ditt inskriva lösenord match det hased lösenord 
   const matchPassword = await bcrypt.compare(password, row.password);

if(!matchPassword) {

res.status(401).json({Message: "wrong password or username!"}) 
 
} else {
  // skapar en jwt token som vara 2 timmar
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



// skapar ett post begäran där man kan lägga in ny bil i tablelen cars om du har authenticateToken.
app.post("/api/cars",authenticateToken, async(req, res) => {
  try {
       let {carbrand, carmodel,price,year} = req.body;
 
    if(!carbrand || ! carmodel|| !price|| !year) {
       // skapar structur för error.
      let error = {
   message:"",
  detail : "",
  http_response: {

  }
};
 // hur error skirvs ut om något blir fel.
  error.message = "carbrand, carmodel, price and year is not included"
  error.detail = "you need to input carbrand, carmodel,price and year in JSON"
  error.http_response.message = "bad request"
   error.http_response.code = 400;

         return res.status(400).json(error)

    }
/*kollar om användare finns (gör senare)   */


 // sql som gör att man kan lägga till carbrand, carmodel,price och year i tabelen cars.
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

// function som skapar så jag kan använda token för min routes (authenticateToken).
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


// skapar ett get begäran där man få ut alla bilar som finns i tabelen cars.
app.get("/api/cars", (req,res) => {
 const sql = `SELECT * FROM cars`;
 db.all(sql, (err,rows) => {
  if(err) {
  return  res.status(500).json({message: "samething went wrong"})

 } 
res.json(rows)
});

});




// starta appen på en port
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





