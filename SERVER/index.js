console.log("Sanskar")

// express().get((req,res)=>{
    
// })
const express = require("express");
const app= express();
const port=8000;
app.get("/launch", (req,res)=>{
    res.send("your are on launch route");
    console.log("/course");

});
app.get("/login/signin", (req,res)=>{
    res.send("you are on sign in page route");
    // console.log("/course");

});
app.get("/login/signup", (req,res)=>{
    res.send("your are on sign up route");
    console.log("/course");

});
app.get("/home", (req,res)=>{
    res.send("you are on home page");
    // console.log("/course");

});
app.get("home/feed", (req,res)=>{
    res.send("your are on feed route");
    console.log("/course");

});

app.get("/*", (req,res)=>{
    res.send("this route is not available, visit below");
    // console.log("/course");

});
app.listen(port,()=>{
    console.log(`app running on ${port}`);
});