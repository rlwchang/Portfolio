var express = require("express"),
    router = express.Router();

var Project = require("../models/project"),
    Skill = require("../models/skill")

var authMiddleware = require('../middleware/authentification');
var helper = require("../middleware/ejs_helper");

// INDEX ROUTE
router.get("/", function(req, res) {
    Project.find({}, function(err, projects) {
        if (err) {
            console.log(err);
        } else {
            res.render("projects/index", {
                projects: projects,
                _: helper
            });
        }
    })
});

// NEW ROUTE
router.get("/new", authMiddleware.isLoggedIn, function(req, res) {
    Skill.find({}, function(err, skills) {
        if (err) {
            console.log(err);
        } else {
            res.render("projects/new", {
                skills: skills,
                _: helper
            });
        }
    });
})

// CREATE ROUTE
router.post("/", authMiddleware.isLoggedIn, function(req, res) {
    req.body.project.features = req.body.project.features.split("\r\n");
    Project.create(req.body.project, function(err, project) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/projects");
        }
    });
})

// SHOW ROUTE
router.get("/:id", function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            console.log(err);
        } else {
            res.render("projects/show", {project: project});
        }
    });
})

// UPDATE ROUTE
router.put("/:id", authMiddleware.isLoggedIn, function(req, res) {
    req.body.project.features = req.body.project.features.split("\r\n");
    Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, project) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/projects/" + req.params.id);
        }
    })
})

// EDIT ROUTE
router.get("/:id/edit", authMiddleware.isLoggedIn, function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            console.log(err);
        } else {
            Skill.find({}, function(err, skills) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("projects/edit", {
                        project: project,
                        skills: skills,
                        _: helper
                    });
                }
            });
        }
    })
})

// DESTROY ROUTE
router.delete("/:id", authMiddleware.isLoggedIn, function(req, res) {
    Project.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/projects");
        }
    });
});

module.exports = router;
