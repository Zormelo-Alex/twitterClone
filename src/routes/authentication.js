const {Router} = require("express");
const router = Router()
const Users = require("../models/users")


router.get("/", (req, res)=>{
    res.redirect("/register");
})

router.get("/twitter", (req, res)=>{
    if(!req.session.user) return res.status(401).send("Please log in first!")
    res.render("home")
})

router.get("/register", (req, res)=>{
    res.render("register");
})

router.post("/register", async (req, res)=>{
    const {username, password, email} = req.body;
    if(!username || !password || !email) return res.status(400).send("All details required!")
    const userDB = await Users.findOne({ $or: [{username}, {email}] })
    if(userDB) return res.status(401).send("user with email or username already exists!")
    const newUser = Users.create({username, password, email})
});

router.get("/login", (req, res)=>{
    res.render("login");
});

router.post("/login", async (req, res)=>{
    const {email, password} = req.body
    if(!email || !password) return res.status(400).send("Please fill in all textboxes!");
    const userDB = await Users.findOne({email})
    if(!userDB) return res.status(400).send("sorry user does not exist")
    if(password != userDB.password) return res.status(401).send("password incorrect!")
    req.session.user = {email}
    res.render("home")
});






module.exports = router;