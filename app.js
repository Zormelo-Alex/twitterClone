const express = require("express");
const app = express();
const mongoose = require("mongoose")
const expressSession = require("express-session")
const authentication = require("./src/routes/authentication");
const seed = require("./seedDb");

//seed();
mongoose.connect("mongodb://localhost:27017/twitterclone").then(res=>{
    console.log("Database connected suc''''''")
}).catch((err)=>{
    console.log(err);
});



app.use(express.static("src"));
app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());
app.use(expressSession({
    secret: "DOM",
    resave: false,
    saveUninitialized: false
}));




app.use(authentication)





app.listen("5000", ()=>{
    console.log("server started on port 5000");
})