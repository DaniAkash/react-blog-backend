require('../config/config');
const mongoose = require("mongoose");
const { generateHashSync } = require("../utils/hash");
const { Schema, model } = mongoose;

const AdminSchema = new Schema({
  email:{
    type: String,
    required: true,
  },
  passwordHash: {
    type: String
  }
});

/**
 * Virtuals cannot store value into the db
 */
// AdminSchema.virtual('password')
//   .set(function(passwordPlainText) {
//     generateHash(passwordPlainText)
//       .then(hash => {
//         this.passwordHash = hash;
//         // this.set({ passwordHash: hash });
//       })
//       .catch(console.error)
//   });

const Admin = model("Admin", AdminSchema);

// const adminUser = new Admin({
//   email: "admin@example.com",
//   passwordHash: generateHashSync("123456!")
// });

// adminUser.save().then((response) => {
//   console.log(response);
// }).catch(console.error);

module.exports = Admin;