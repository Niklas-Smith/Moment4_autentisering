const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const sqlite3 = require("sqlite3").verbose
const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000





app.post("/api/register", async(req, res) => {
  try {
       let {username, password} = req.body;
 
    if(!username || ! password) {
         return res.status(400).json({error: "must have both password and username" })

    }

     res.status(201).json({Message: "New user Reqister"})


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

    if(username === "niklas" && password === "password") {
     res.status(201).json({Message: "You are logged in"})

    } else {

     res.status(401).json({error: "Wrong username or password"})
    }
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