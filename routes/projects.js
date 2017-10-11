var express = require("express"),
    router = express.Router();

var Project = require("../models/project"),
    Skill = require("../models/skill")

// INDEX ROUTE
router.get("/", function(req, res) {
    Project.find({}, function(err, projects) {
        if (err) {
            console.log(err);
        } else {
            res.render("projects/index", {projects: projects});
        }
    })
});

// NEW ROUTE
router.get("/new", function(req, res) {
    Skill.find({}, function(err, skills) {
        if (err) {
            console.log(err);
        } else {
            res.render("projects/new", {skills: skills});
        }
    });
})

// CREATE ROUTE
router.post("/", function(req, res) {
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
router.put("/:id", function(req, res) {
    Project.findByIdAndUpdate(req.paras.id, function(err, project) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/projects/" + "req.params.id");
        }
    })
})

// EDIT ROUTE
router.get("/:id/edit", function(req, res) {
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
                        skills: skills
                    });
                }
            });
        }
    })
})

// DESTROY ROUTE
router.delete("/:id", function(req, res) {
    Project.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/projects");
        }
    });
});

module.exports = router;
