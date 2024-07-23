const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/utility");
const Listing = require("../model/listing");
const Review = require("../model/review.js");
const ExpressError = require("../utils/expressError");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const { createReview, destroyReview } = require("../controllers/review.js");

// post review route

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(createReview)
);
// delete review route

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(destroyReview)
);

module.exports = router;
