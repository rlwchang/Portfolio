var express = require("express"),
    router = express.Router(),
    passport = require('passport');

var User = require("../models/user");

router.get("/register", function(req, res) {
    res.render("authentification/register");
});

router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err) {
            console.log(err);
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/");
        });
    });
});

router.get("/login", function(req, res){
   res.render("authentification/login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
    }), function(req, res){
});

router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});
module.exports = router;
