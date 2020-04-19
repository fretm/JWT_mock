const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "wellcome to API",
  });
});

app.post("/api/posts", verifietoken, (req, res) => {

    jwt.verify(req.token,'secretkey',(err,autData)=>{
if(err){
    res.sendStatus(403)
}
else{
    res.json({
        message: "post created...",
        autData 
    })
}
    
  
  });
});

app.post("/api/login", (req, res) => {
  //mock user
  user = {
    id: 27,
    username: "frecho",
    email: "frecho@gmail.com",
  };
  //sending token
  jwt.sign({ user }, "secretkey",{expiresIn:"20s"}, (err, token) => {
    res.json({
      token,
    });
  });
});

//format of token
//Authorization :bearer <acess_token>

//verify Token  //midleware
function verifietoken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  //check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // split at the space 
    const bearer = bearerHeader.split(' ');
    //get token from array
    const bearerToken = bearer[1];
    //set the token 
    req.token = bearerToken;
    //NEXT
    next();
  } else {
    //Forbidden
    res.sendStatus(403);
  }
}
app.listen(5000, () => console.log("server running on port 5000"));
