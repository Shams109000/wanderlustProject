const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/utility");
const Listing = require("../model/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { index, renderNewForm, showListing, createListing, renderEditForm, updateListing, destroyListing } = require("../controllers/listing.js");
const multer  = require('multer')
const {storage}=require('../cloudConfig.js')
const upload = multer({ storage })
// validation for server-side-rendering

router.route('/')
.get(wrapAsync(index)) // show all list
.post(isLoggedIn,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(createListing)
) // create new list


// new list form
router.get("/new", isLoggedIn,renderNewForm);
let mapToken=process.env.MAP_TOKEN
router.route('/:id')
.get(wrapAsync(showListing)) //  get list
.put(isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(updateListing)
) // update route
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(destroyListing)
) // delete route



// edit form route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(renderEditForm)
);


module.exports = router;
