const express = require("express");
const app = express();
const mongoose = require("mongoose")
const bodyPaser = require("body-parser");
const passport = require("passport")
const localStrategy = require("passport-local")
//const expressSession = require("express-session")
const Users = require("./models/users")
const authentication = require("./routes/authentication");
const seed = require("./seedDb");

seed();
mongoose.connect("mongodb://localhost/twitterclone").then(res=>{
    console.log("Database connected suc''''''")
}).catch(err=>{
    console.log(err);
});



app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyPaser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret: "DOM",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(Users.authenticate()))
passport.serializeUser(Users.serializeUser())
passport.deserializeUser(Users.deserializeUser())



app.use(authentication)





app.listen("5000", ()=>{
    console.log("server started on port 5000");
})