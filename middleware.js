const Listing = require("./model/listing");
const Review = require("./model/review.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/expressError");

module.exports.isLoggedIn=
(req,res,next)=>{
  console.log(req.originalUrl,'r');
 
    if(!req.isAuthenticated()){
      req.session.redirectUrl=req.originalUrl;
        req.flash('error','user must be logged in to create a listing!')
        return res.redirect('/login')
      }
      next()
}

module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl
  }
  next()
}
module.exports.isOwner=async(req,res,next)=>{
  const {id}=req.params
  const listing=await Listing.findById(id)
  console.log(listing,'l');
  if(!listing.owner._id.equals(res.locals.currUser._id)){
    req.flash('error',"you are not the owner of this listing")
    return res.redirect(`/listings/${id}`)
  }
  next()
}

module.exports.validateListing=(req,res,next)=>{
  const { error, value } = listingSchema.validate(req.body);
  console.log(error,'er');
  if (error) {
    throw new ExpressError(
      400,
      error.details.map((e) => e.message).join(", ")
    );
  }
  else{
      next()
  }
}
// validation for server-side-rendering
module.exports.validateReview=(req,res,next)=>{
    const { error, value } = reviewSchema.validate(req.body);
    console.log(error,'er');
    if (error) {
      throw new ExpressError(
        400,
        error.details.map((e) => e.message).join(", ")
      );
    }
    else{
        next()
    }
  }

  module.exports.isReviewAuthor=async(req,res,next)=>{
    const {id,reviewId}=req.params
    const review=await Review.findById(reviewId)
    if(!review.author.equals(res.locals.currUser._id)){
      req.flash('error',"you are not the owner of this review")
      return res.redirect(`/listings/${id}`)
    }
    next()
  }