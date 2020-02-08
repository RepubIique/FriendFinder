const fs = require("fs");
const path = require("path");

let rawdata = path.join(__dirname + "/../data/friends.json");

module.exports = function(app) {
  fs.readFile(rawdata, (err, data) => {
    if (err) throw err;
    let friends = data.toString();
    let friendsData = JSON.parse(friends);

    app.get("/api/friends", function(req, res) {
      res.json(friendsData);
    });
    for (let x = 0; x < friendsData.length; x++) {
      for (let i = 0; i < friendsData[x].scores.length; i++) {}
    }
  });

  app.get("/", function(req, res) {
    res.send("Hello World");
  });
};
