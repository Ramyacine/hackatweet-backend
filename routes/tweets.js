var express = require('express');
var router = express.Router();
require('../models/connection');
const Tweet = require('../models/tweets');

router.post("/create", (req, res) => {
    User.findOne({ username: req.body.username, token: req.body.token }).then(
        (data) => {

          if (data) {
            console.log("Start creating user " + data._id);
            const newTweet = new Tweet({
                user: data._id,
                token: req.body.token,
                time: Date.now(),
                message: req.body.message,
                canlike: false,
              });

              console.log("Start creating user 2");
              newTweet.save().then((data) => {
                res.json({
                  result: true,
                  tweet: data,
                });
              });

            } else {
              res.json({ result: false, message: "Username or token not valid!" });
            }
          }
        );
    });

