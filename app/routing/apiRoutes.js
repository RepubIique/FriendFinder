const fs = require("fs");
const path = require("path");

let rawdata = path.join(__dirname + "/../data/friends.json");

module.exports = function(app) {
  fs.readFile(rawdata, (err, data) => {
    if (err) throw err;
    let friends = data.toString();
    let fData = JSON.parse(friends);

    app.get("/data/survey.json", function(req, res) {
      res.sendFile(path.join(__dirname, "/../data/survey.json"));
    });

    app.get("/api/friends", function(req, res) {
      res.json(fData);
    });
    app.post("/api/friends", function(req, res) {
      const { userscore } = req.body;
      console.log("Req: ", userscore);
      if (userscore) {
        /* Do calculation once done send it back, replace userscore with the id  */
        res.status(200).send(userscore);
      } else {
        res.status(500).send("Error");
      }
    });

    findFriend = user => {
      for (let x = 0; x < fData.length; x++) {
        for (let i = 0; i < fData[x].scores.length; i++) {
          let totalArray = [];
          let totalScore = 0;
          if (fData[x].scores[i] <= user.scores[i]) {
            totalScore += user.scores[i] - fData[i].scores[i];
          } else {
            totalScore += fData[x].scores[i] - user.scores[i];
          }
          totalArray.push(totalScore);
        }
      }
    };
  });
};
