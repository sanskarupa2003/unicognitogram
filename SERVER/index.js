console.log("Sanskar")

const express = require("express");
const app= express();
const port=8000;

// Middleware to parse JSON body in requests
app.use(express.json());


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

app.use(express.json());

let accounts = {
    lpu:[
        {
            regno:"1",
            name :"a",
            emailid:"sdn@lpu.in"
        },
        {
            regno:"2",
            name:"b",
            emailid:"sffan@lpu.in"
        },
        {
            regno:"3",
            name:"c",
            emailid:"sdfnsdn@lpu.in"
        },
        {
            regno:"4",
            name :"abc",
            emailid:"sdfdfn@lpu.in"
        },
        {
            regno:"5",
            name:"bghh"
        },
        {
            regno:"6",
            name:"cgh"
        },
    ],
};

app.get("/accounts", (req,res)=> {
    res.json(accounts.lpu);
}
);





app.get("/accounts/:reg", (req,res)=> {
    const regnum = accounts.lpu.find((c) =>c.regno === req.params.reg);
    console.log(regnum);
    res.json(regnum);
    //const reg = req.params.reg;
    //res.send(`subroot with id:${reg}`);
});

app.patch("/accounts/:mod", (req, res) => {

    const index = accounts.lpu.findIndex(
      (c) => c.regno === req.params.mod
    );
    //console.log(index);

    if (index === -1) {
      res.status(404).send("regno not found");
    } else {
      const nameToUpdate = accounts.lpu[index];
      // Update specific fields if they exist in the request body
      if (req.body.name) nameToUpdate.name = req.body.name;
  
      res.send("name partially updated");
    }
  });

app.delete("/accounts/:delregno", (req, res) => {
    const index = accounts.lpu.findIndex(
      (c) => c.regno === req.params.delregno
    );
    if (index === -1) {
      res.status(404).send("reg not found");
    } else {
      accounts.lpu.splice(index, 1);
      res.send("Course deleted");
    }
  });
 
app.get("/*", (req,res)=>{
    res.send("this route is not available, visit below");
    // console.log("/course");

});

app.post("/account/add", (req, res) => {
    accounts.lpu.push(req.body);
    res.send("account added");
  });
  
app.listen(port,()=>{
    console.log(`app running on ${port}`);
});