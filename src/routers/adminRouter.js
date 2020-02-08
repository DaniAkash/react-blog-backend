const express = require("express");
const Admin = require("../models/admin");
const { adminTokenGenerator } = require("../utils/adminTokenManager");
const { compareHash } = require("../utils/hash");

const adminRouter = express.Router();

adminRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  Admin.findOne({ email })
    .exec()
    .then(admin => {
      if (admin) {
        compareHash(password, admin.passwordHash)
        .then(result => {
          if (result) {
            const jwtToken = adminTokenGenerator({ email });
            res.cookie("jwt", jwtToken, { httpOnly: true });
            res.status(200).send({ status: "Success" });
          } else {
            res.status(400).send("Invalid Request");
          }
        })
        .catch(error => {
          console.error(error);
          res.status(500).send("Internal Server Error");
        });
      } else {
        res.status(400).send("Invalid Request");
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = adminRouter;
