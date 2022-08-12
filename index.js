// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Respond with JS object when a GET request is made to the homepage
app.get("/all", function (req, res) {
  console.log(projectData);
  res.send(projectData);
});

app.post("/add", addForecast);

function addForecast(req, res) {
  newEntry = {
    temp: req.body.temp,
    feel: req.body.feel,
    date: req.body.date,
  };

  projectData = newEntry;
  res.send(projectData);
  console.log(projectData);
}

// Setup Server
const port = 3000;
/* Spin up the server*/
const server = app.listen(process.env.PORT || port, listening);
function listening() {
  // console.log(server);
  console.log(`running on localhost: ${port}`);
}
