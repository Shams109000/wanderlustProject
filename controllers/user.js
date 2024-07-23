const User = require('../model/user')

module.exports.renderSignupForm=(req,res)=>{
    res.render("./users/signup.ejs")
}
module.exports.signup=async(req,res)=>{
    try{
     let{username,email,password}=req.body
     const newUser=new User({email,username})
     const registeredUser=await User.register(newUser,password)
     req.login(registeredUser,(err)=>{
         if(err){
             return next(err)
         }
         req.flash('success','registered successfully')
         res.redirect("/listings")
     })
     console.log(registeredUser,'registeredUser');
    
    }
    catch(e){
     req.flash('error',e.message)
     res.redirect('/signup')
    }
 }


module.exports.renderLoginForm=(req,res)=>{
    res.render("./users/login.ejs")
}


module.exports.login=async(req,res)=>{
    req.flash("success","welcom back to wanderlust!")
    // console.log(res.locals.redirectUrl,'dd');
    let redirectUrl=res.locals.redirectUrl||'/listings'
    res.redirect(redirectUrl)

}
module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","you are logged out!")
        res.redirect('/listings')
    })
}