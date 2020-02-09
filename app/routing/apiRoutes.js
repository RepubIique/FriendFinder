const fs = require("fs");
const path = require("path");

let rawdata = path.join(__dirname + "/../data/friends.json");

module.exports = function(app) {
  fs.readFile(rawdata, (err, data) => {
    if (err) throw err;
    let friends = data.toString();
    let friendsData = JSON.parse(friends);

    app.get("/data/survey.json", function(req, res) {
      res.sendFile(path.join(__dirname, "/../data/survey.json"));
    });

    app.get("/api/friends", function(req, res) {
      res.json(friendsData);
    });
    // app.post("/api/friends", function(req, res) {
    //   res.send(newUser);
    // });

    findFriend = user => {
      for (let x = 0; x < friendsData.length; x++) {
        for (let i = 0; i < friendsData[x].scores.length; i++) {}
      }
    };
    8;
  });
};
