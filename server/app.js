const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

// importing routes
const user = require("./routes/user");
const post = require("./routes/posts");
console.log();
const port = 5000;

// connect mongodb

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected!");
  })
  .catch((err) => console.log(err));

// middlewares
app.use(cors());
app.use(express.json());
app.use("/featuredImage", express.static("featuredImage"));
app.use("/profileImage", express.static("profileImage"));

// routes
app.use("/api/user", user);
app.use("/api/posts", post);

app.listen(port, () => {
  console.log(`listening on port :${port}`);
});

// 8160177536
