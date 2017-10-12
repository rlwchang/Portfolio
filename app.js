var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require('body-parser'),
    LocalStrategy = require("passport-local"),
    expressSession = require("express-session"),
    methodOverride = require('method-override');

var app = express();

var User = require("./models/user");

var indexRoutes = require("./routes/index");
var projectRoutes = require("./routes/projects");
var skillRoutes = require("./routes/skills");
var authentificationRoutes = require("./routes/authentification");

mongoose.connect("mongodb://localhost/portfolio", {useMongoClient: true})

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.use(expressSession({
    secret: "This is the secret for my portfolio page.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    // res.locals.error = req.flash("error");
    // res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/", authentificationRoutes);
app.use("/projects", projectRoutes);
app.use("/skills", skillRoutes);



app.listen(3000, function() {
    console.log("Server has started!");
});

// Finish description section for the skills part
// Add ability to add multiple skills at once and populate the show and edit page with them.
// Finish home page
// Finish routes for the projects page
// Create authentification routes
