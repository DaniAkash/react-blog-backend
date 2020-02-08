require("./config/config");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authorsRouter = require("./routers/authorsRouter");
const postsRouter = require("./routers/postsRouter");
const adminRouter = require("./routers/adminRouter");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Blog Backend Server!")
})

app.use("/posts", postsRouter);
app.use("/authors", authorsRouter);
app.use("/admin", adminRouter);

const server = app.listen(8080, () => {
  console.log("Server running on port: " + server.address().port);
});