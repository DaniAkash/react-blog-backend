const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", error => {
  console.log("MongoDB Connection error");
  console.error(error);
});

module.exports = db;