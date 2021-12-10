const express = require("express");
const router = express.Router();
const { projects } = require("../data.json");
console.log({ projects });

//GET home page
router.get("/", (req, res) => {
  res.render("index", { projects });
});

//About page
router.get("/about", (req, res) => {
  res.render("about", { projects });
});

//Define an error if a project ID is not included here (e.g. /projects/20). I'm diisplaying the proejct is it iexists or defining it as an error and passing it onto the error functions as noted in the app.js file. I commented out the err.message since I'm showing error pages instead.
router.get("/projects/:id", (req, res, next) => {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);
  console.log(project);
  if (project) {
    res.render("project", { project });
  } else {
    const err = new Error();
    err.status = 404;
    // err.message = "I'm sorry but the project you requested cannot be found";
    next(err);
  }
});

module.exports = router;
