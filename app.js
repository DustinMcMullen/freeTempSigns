const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));




app.get("/", function(req, res){
  // res.send("Hello, welcome to the Free Temp. Signs project");
  const signNames = [
    "WomenSign",
    "WomenHCSign",
    "MenSign",
    "MenHCSign",
    "RestroomSign",
    "ICOFSign",
    "ElecSign",
    "MechSign",
    "ITTechSign",
    "PumpSign",
    "SprinklerSign"
  ];
  const roomIDs = signNames.splice(6, 11);
  const infoSigns = signNames.splice(0,6);

  res.render("home", {signTypes: signNames, infoSigns: infoSigns, roomIDs: roomIDs});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.post("/freeSigns", function(req, res){
  const signsRequested = req.body;
  const signsRequestedArray = Object.entries(signsRequested);
  const totalSignsRequested = (
    Number(req.body.WomenSign)
    + Number(req.body.WomenHCSign)
    + Number(req.body.MenSign)
    + Number(req.body.MenHCSign)
    + Number(req.body.RestroomSign)
    + Number(req.body.ICOFSign)
    + Number(req.body.ElecSign)
    + Number(req.body.MechSign)
    + Number(req.body.ITTechSign)
    + Number(req.body.PumpSign)
    + Number(req.body.SprinklerSign)
  );

  const signsRequestedArraywithoutZeros = signsRequestedArray.filter(([key, value])=> {
    return(value !== "0");
  });

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
const todaysDate = yyyy+'-'+mm+'-'+dd;

  console.log(signsRequestedArraywithoutZeros);

  console.log(totalSignsRequested);
  console.log(signsRequested);
  console.log(signsRequestedArray);
  // console.log(req.body.);
  if (totalSignsRequested <= 25) {
    res.render("projectDetails", {requestCount: totalSignsRequested, signsRequestedArray: signsRequestedArraywithoutZeros, todaysDate: todaysDate});
  }
  else {
    res.render("signCountError", {requestCount: totalSignsRequested});
  }
});

app.post("/projectDetails", function(req, res){
  const signCount = req.body.signCount;
  const customerFName = req.body.firstName;
  const customerEmail = req.body.customerEmail;

res.render("checkout", {requestCount: signCount, customerFirstName: customerFName, customerEmail: customerEmail});
});


app.listen(3000, function() {
  console.log("freeTempSigns app started on port 3000")
});
