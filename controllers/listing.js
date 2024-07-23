const Listing=require('../model/listing') 
module.exports.index=async (req, res) => {
    const allListing = await Listing.find({});
    // console.log(allListing,'all');
    res.render("listing/index.ejs", { allListing });
  }

module.exports.renderNewForm= (req, res) => {
  console.log(req.user);
  res.render("listing/new.ejs");
}

module.exports.showListing=async (req, res) => {
  const { id } = req.params;
  let mapToken=process.env.MAP_TOKEN
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "it does not exists");
    res.redirect("/listings");
  } else {
    console.log(listing, "l");
    res.render("listing/show.ejs", { listing,mapToken });
  }
}

module.exports.createListing=async (req, res, next) => {
  console.log(req.body.listing, "obj");
  let url=req.file.path
  let filename=req.file.filename
  // Create a new listing with the validated data
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image={url,filename}
  await newListing.save();
  req.flash("success", "new listing created");
  res.redirect("/listings");
}


module.exports.renderEditForm=async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "list not exists");
      res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_220")
    res.render("listing/edit.ejs", { listing,originalImageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports.updateListing=async (req, res) => {
  let { id } = req.params;
  
  const listing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });
  if(typeof req.file!='undefined'){
    let url=req.file.path
    let filename=req.file.filename
    listing.image={url,filename}
    await listing.save()
  }
  req.flash("success", "updated successfully");
  console.log(listing, "new");
  res.redirect("/listings");
}

module.exports.destroyListing=async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndDelete(id);
  req.flash("success", "deleted successfully");
  res.redirect("/listings");
}