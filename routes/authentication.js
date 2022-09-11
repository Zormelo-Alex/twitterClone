const express = require("express");
const router = express.Router();
const passport = require("passport");
const Users = require("../models/users")


router.get("/", (req, res)=>{
    res.redirect("/register");
})

router.get("/twitter", (req, res)=>{
    res.render("home")
})

router.get("/login", (req, res)=>{
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/twitter",
    failureRedirect: "/login"
}), (req, res)=>{
    Users.find({}, (err, foundUsers)=>{
        if(!err){
            console.log(foundUsers)
        }else{
            console.log(err);
        }
    })
});

router.get("/register", (req, res)=>{
    res.render("register");
})

router.post("/register", (req, res)=>{
    var newUser = new Users({
        username: req.body.name,
        email: req.body.email
    });
    Users.register(newUser, req.body.password, (err, data)=>{
        if(!err){
            passport.authenticate("local")(req, res, ()=>{
                    res.redirect("/login");
            });
        }else{
            res.send(err);
            console.log(err);
        }
    });
});





module.exports = router;