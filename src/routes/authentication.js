const {Router} = require("express");
const router = Router()
const Users = require("../models/users")
const {hashPassword, compare} = require("../utils/hash")



router.get("/", (req, res)=>{
    if(!req.session.user) return res.redirect("/twitter/register")
    res.render("home")
})

router.get("/signup", (req, res)=>{
    res.render("index");
})

router.get("/register", (req, res)=>{
    res.render("register");
})

router.post("/register", async (req, res)=>{
    const {username, email} = req.body;
    if(!username|| !email) return res.status(400).send("All details required!")
    const password = hashPassword(req.body.password);
    const userDB = await Users.findOne({ $or: [{username}, {email}] })
    if(userDB) return res.status(401).send("user with email or username already exists!")
    const newUser = Users.create({username, password, email})
    res.status(200).redirect("/twitter/login")
});

router.get("/login", (req, res)=>{
    res.render("login");
});

router.post("/login", async (req, res)=>{
    const {email, password} = req.body
    if(!email || !password) return res.status(400).send("Please fill in all textboxes!");
    const userDB = await Users.findOne({$or: [{email:email}, {username:email}]})
    const comparePassword = compare(password, userDB.password)
    if(!userDB) return res.status(400).send("Sorry username or email incorrect")
    if(!comparePassword) return res.status(401).send("password incorrect!");
    req.session.user = {email: userDB.email}
    res.render("home")
});






module.exports = router;