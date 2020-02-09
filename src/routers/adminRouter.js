const express = require("express");
const Admin = require("../models/admin");
const { adminTokenGenerator, adminTokenValidator } = require("../utils/adminTokenManager");
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
            res.cookie("jwt", jwtToken);
            /**
             * Since frontend & backend are on
             * different domains cookie can't be set
             */
            res.status(200).send({ 
              status: "Success",
              jwtToken
            });
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

adminRouter.get("/isLoggedIn", (req, res) => {
  // const { jwt = "" } = req.cookies; // use this if using cookies
  const jwt = req.header('Authorization');

  if(adminTokenValidator(jwt)) {
    res.status(200).json({message: "logged in"})
  } else {
    res.status(401).send("unauthorized");
  }
});

module.exports = adminRouter;
