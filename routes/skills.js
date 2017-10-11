var express = require("express"),
    router = express.Router();

var Skill = require("../models/skill")

var levelArr = ["No Experience", "Beginner", "Beginner/Intermediate", "Intermediate", "Intermediate/Advanced", "Advanced", "Expert", "Master"]

// INDEX ROUTE
router.get("/", function(req, res) {
    Skill.find({}, function(err, skills) {
        if(err) {
            console.log(err);
        } else {
            res.render("skills/index", {skills: skills});
        }
    });
});

// NEW ROUTE
router.get("/new", function(req, res) {
    res.render("skills/new");
});

// CREATE ROUTE
router.post("/", function(req, res) {
    Skill.create(req.body.skill, function(err, skill) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/skills");
        }
    });
});

// SHOW ROUTE
router.get("/:id", function(req, res) {

    Skill.findById(req.params.id, function(err, skill) {
        if (err) {
            console.log(err);
        } else {
            res.render("skills/show", {
                skill: skill,
                levelArr: levelArr
            });
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", function(req, res) {
    Skill.findById(req.params.id, function(err, skill) {
        res.render("skills/edit", {skill: skill});
    });
});

// UPDATE ROUTE
router.put("/:id", function(req, res) {
    Skill.findByIdAndUpdate(req.params.id, req.body.skill, function(err, skill) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/skills" + req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/:id", function(req, res) {
    Skill.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/skills");
        }
    });
});

module.exports = router;
