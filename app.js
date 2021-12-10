//Require dependencies and load express
const express = require("express");
const app = express();

//View engine setup
app.set("view engine", "pug");

//Add static middleware
app.use("/static", express.static("public"));

//Set up route folder and an index for all the routes
//Note my routes and error message are in this file
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

//Errors - note that specific errors with project (.e.g /project/19) are in the router file. Below is general errors for the rest if a /noroute is passed or other 500 type of errors

//First catch 404 and forward to error handler

app.use((req, res, next) => {
  const err = new Error("Page Not Found");
  err.status = 404;
  err.message = "I'm sorry but the page you are trying to access doesn't exist";
  console.log(err.status);
  next(err);
});

//Next an error other than 404
app.use((err, req, res, next) => {
  console.log("Global error", err);
  if (err.status === 404) {
    res.status(404).render("page-not-found", { err });
  } else {
    res.status(err.status || 500).render("error", { err });
  }
});

//The port we are viewing the website on
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

module.exports = app;
