var express = require("express"),
    mongoose = require("mongoose"),
    passport =require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth_demo_app", {
	useNewUrlParser: true,   //these two written two remove deprecations
	useUnifiedTopology: true
});


var app = express();
app.set("view engine", "ejs");

app.use(require("express-session")({
	secret: "Rusty is the best and cutest dog in the world",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//======
//ROUTES
//======
	
app.get("/", function(req, res){
	res.render("home");
});


app.get("/secret", function(req, res){
	res.render("secret");
});

//Auth Routes
//show signup page
app.get("/register", function(req, res){
	res.render("register");
});
//handling user sign up
app.post("/register", function(req, res){
	res.send("Registered!");
});

app.listen(3000, function(){
	console.log("Server started");
});