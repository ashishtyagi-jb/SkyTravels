var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://localhost:27017/tours_and_travels", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

app.post("/signup", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;

  var data = {
    email: email,
    password: password,
    confirm_password: confirm_password,
  };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  return res.redirect("/");
});

app.post("/contacts", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var number = req.body.number;
  var message = req.body.message;

  var data = {
    name: name,
    email: email,
    "phone number": number,
    message: message,
  };

  db.collection("contacts").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  return res.redirect("/");
});

app.post("/bookings", (req, res) => {
  var departure_place = req.body.departure_place;
  var tour_place = req.body.tour_place;
  var what_to_book = req.body.what_to_book;
  var number = req.body.number;
  var email_id = req.body.email_id;
  var arrivaldate = req.body.arrivaldate;
  var leavingdate = req.body.leavingdate;

  var data = {
    "departure from": departure_place,
    "tour to": tour_place,
    "what to book": what_to_book,
    "number of travellers": number,
    "email id": email_id,
    "arrival date": arrivaldate,
    "leaving date": leavingdate,
  };

  db.collection("bookings").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  return res.redirect("/");
});

app
  .get("/", (req, res) => {
    res.set({
      "Allow-access-Allow-Origin": "*",
    });
    return res.redirect("index.html");
  })
  .listen(3000);

console.log("Listening on PORT 3000");
