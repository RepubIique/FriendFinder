// Dependencies
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

//Routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function() {
  console.log("App served on PORT: " + PORT);
});

module.exports = app;
