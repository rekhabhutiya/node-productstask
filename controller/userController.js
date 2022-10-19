require("dotenv").config();
const db = require("../models/index");
const user = db.user;
const jwt = require("jsonwebtoken");


//Add User
const addUser = async (req, res) => {
  const userInfo = {
    fullname: req.body.fullname,
    password: req.body.password,
    email: req.body.email
  };
 
  await user
    .create(userInfo)
    .then((data) => {
      console.log(data);
      jwt.sign({ data }, process.env.JWT_SECRET_KEY, (err, token) => {
        res.status(201).json(token);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Login
const getUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  await user
    .findOne({ email: email })
    .then((data) => {
      if (data.password === password) {
        jwt.sign({ data }, process.env.JWT_SECRET_KEY, (err, token) => {
          if (!err) {
            res.status(200).json(token);
          }
        });
      } else {
        res.status(404).send({ message: "User Not Found." });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};


module.exports = {
  addUser,
  getUser
};
