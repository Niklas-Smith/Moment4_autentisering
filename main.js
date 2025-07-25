const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000





app.post("/api/register", async(req, res) => {
  try {
       let {usernamne, password} = req.body;

    if(usernamne.length>4 || password.length>4) {
         return res.status(400).json({error: "usernamne and password need to be atleast 4 letters long" })

    }

     res.status(201).json({Message: "New user Reqister"})


  } catch (error){
        res.status(500).json( {error : "samething Went wrong....."}  )

  }

});

app.post("/api/login" , async(req, res)=> {


})


app.listen(port,() => {

    console.log(`App started on port:${port}`);
} )
