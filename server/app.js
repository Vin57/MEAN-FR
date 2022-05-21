const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const index = require("./routes/index");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect("mongodb://admin_MEAN:5698741@mongo:27017/MEAN_FR", { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB OK !");
  }
});

app.use(index);

app.listen(app.get("port"), function () {
  console.log(`express listening on port ${app.get("port")}!`);
});
module.exports = app;
