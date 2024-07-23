const express=require('express')
const User = require('../model/user')
const router=express.Router()
const wrapAsync = require("../utils/utility");
const passport = require('passport');
const { saveRedirectUrl}=require('../middleware');
const { renderSignupForm, signup, renderLoginForm, login, logout } = require('../controllers/user');


router.route('/signup')
.get(renderSignupForm)
.post(wrapAsync(signup))

router.route('/login')
.get(renderLoginForm)
.post(saveRedirectUrl,
    passport.authenticate('local',{failureRedirect:"/login",failureFlash:true}),
    login)

router.get('/logout',logout)
module.exports=router
