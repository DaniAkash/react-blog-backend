const express = require("express");
const Admin = require("../models/admin");

const adminRouter = express.Router();

adminRouter
  .post("/login", (req, res) => {
    const { email, password } = req.body
    Admin.findOne({ email }).exec().then(admin => {
      if(admin) {

      } else {
        res.status(400).send("Invalid Request");
      }
    }).catch(error => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    })
  });

module.exports = adminRouter;