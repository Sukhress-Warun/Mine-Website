// packages
const express = require('express')

// constants
const router = express.Router()

// models
const User = require('../models/user')

// sessions middlewares & functions
const {allowOnlyUnauth} = require('../sessions')

// routes /user/
router.get('/signup', allowOnlyUnauth, async (req, res) => {
    return res.render("user/signup.ejs",{attempted: false})
})

router.post('/signup', allowOnlyUnauth, async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    const response = await User.createUser(email, password)
    if(response.created){
        req.session.user = {
            auth: response.created,
            id: response.id
        }
        return res.redirect("/")
    }
    else{
        return res.render("user/signup.ejs",{attempted: true, message: response.message})
    }
})

router.get('/login', allowOnlyUnauth, async (req, res) => {
    return res.render("user/login.ejs",{attempted: false})
})

router.post("/login", allowOnlyUnauth, async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    const response = await User.authenticate(email, password)
    if(response.auth){
        req.session.user = {
            auth: response.auth,
            id: response.id
        }
        return res.redirect("/")
    }
    else{
        return res.render('user/login.ejs',{attempted: true, message: response.message})
    }
})

router.get("/signout", async (req, res) => {
    if(req.session.user !== undefined){
        req.session.destroy()
    }
    res.redirect('/')
})

module.exports = router