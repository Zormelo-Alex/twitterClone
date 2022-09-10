const express = require("express");
const app = express();
const bodyPaser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/twitterclone").then(res=>{
    console.log("Database connected suc''''''")
}).catch(err=>{
    console.log(err);
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const Users = mongoose.model("Users", userSchema);

app.set("view engine", "ejs");
app.use(bodyPaser.urlencoded({extended:true}));

// Users.remove({}, (err, deletedData)=>{
//     if(!err){
//         console.log(deletedData);
//     }else{
//         console.log(err)
//     }
// })

app.get("/", (req, res)=>{
    res.redirect("/register");
})

app.get("/register", (req, res)=>{
    res.render("register");
})

app.post("/register", (req, res)=>{
    var newUsername = req.body.name;
    var newEmail = req.body.email;
    var newPassword = req.body.password;
    var newUser = {
        username: newUsername,
        email: newEmail,
        password: newPassword
    };
    Users.create(newUser, (err, data)=>{
        if(!err){
            res.redirect("/login");
        }else{
            console.log(err);
        }
    });
});

app.get("/login", (req, res)=>{
    res.render("login");
});

app.post("/login", (req, res)=>{
    Users.find({}, (err, foundUsers)=>{
        if(!err){
            console.log(foundUsers)
            res.render("home");
        }else{
            console.log(err);
        }
    })
});

app.get("/twitter", (req, res)=>{
        res.render("home")
})








app.listen("5000", ()=>{
    console.log("server started on port 5000");
})