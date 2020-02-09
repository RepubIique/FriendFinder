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
        let bestMatch = findFriend(userscore);
        console.log("bestMatch", bestMatch);
        res.status(200).send(bestMatch);
      } else {
        res.status(500).send("Error");
      }
    });

    findFriend = userScore => {
      let totalScoreArray = [];
      let totalArray = [];
      // Loops thru friends.json
      for (let x = 0; x < fData.length; x++) {
        let friendScores = fData[x].scores;
        let totalScore = 0;
        // Loops thru friendScore and userScore
        for (let i = 0; i < userScore.length; i++) {
          let score = parseInt(userScore[i]);
          totalScore += Math.abs(friendScores[i] - parseInt(score));
        }
        console.log(
          `Compatibility Score for ${fData[x].name} and User is ${totalScore}`
        );
        totalScoreArray.push(totalScore);
      }

      let bestFriendIndex = totalScoreArray.indexOf(
        Math.min(...totalScoreArray)
      );
      console.log(`Best match : ${fData[bestFriendIndex].name}`);

      return fData[bestFriendIndex];
    };
  });
};
