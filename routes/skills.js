var express = require("express"),
    router = express.Router();

var Skill = require("../models/skill")

var authMiddleware = require("../middleware/authentification");
var helper = require("../middleware/ejs_helper");

// INDEX ROUTE
router.get("/", function(req, res) {
    Skill.find({}, function(err, skills) {
        if(err) {
            console.log(err);
        } else {
            res.render("skills/index", {
                skills: skills,
                _ : helper
            }
            );
        }
    });
});

// NEW ROUTE
router.get("/new", authMiddleware.isLoggedIn, function(req, res) {
    res.render("skills/new", {_: helper});
});

// CREATE ROUTE
router.post("/", authMiddleware.isLoggedIn, function(req, res) {
    req.body.skill.abilities = req.body.skill.abilities.split("\r\n");
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
                _: helper
            });
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", authMiddleware.isLoggedIn, function(req, res) {
    Skill.findById(req.params.id, function(err, skill) {
        res.render("skills/edit", {
            skill: skill,
            _: helper
        });
    });
});

// UPDATE ROUTE
router.put("/:id", authMiddleware.isLoggedIn, function(req, res) {
    req.body.skill.abilities = req.body.skill.abilities.split("\r\n");
    Skill.findByIdAndUpdate(req.params.id, req.body.skill, function(err, skill) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/skills/" + req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/:id", authMiddleware.isLoggedIn, function(req, res) {
    Skill.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/skills");
        }
    });
});

module.exports = router;
