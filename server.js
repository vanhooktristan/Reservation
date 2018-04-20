// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var tables = [
  {
    customerName: "Yoda",
    phoneNumber: "717-587-3625",
    customerEmail: "yoda@farfaraway.com",
    customerID: "hungryIam"
  }
];

var waitList = [
  {
    customerName: "Darth Maul",
    phoneNumber: "666-987-6543",
    customerEmail: "yoda@sithempire.com",
    customerID: "twosabers"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/create", function(req, res) {
  res.sendFile(path.join(__dirname, "create.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitList);
});
// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;

  console.log(newReservation);

  if (tables.length < 5) {
    tables.push(newReservation);
  } else {
    waitList.push(newReservation);
  }

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// What is this?
