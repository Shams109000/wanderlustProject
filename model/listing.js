const { ref } = require('joi')
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Review = require("./review.js")
const User = require("./user.js")



const listSchema= new Schema(
    {
        title:{type:String},
        description:{type:String},
        image:{
            url:String,
            filename:String
        },
        price:{type:Number},
        location:{type:String},
        country:{type:String},
        reviews:[
            {
                type:Schema.Types.ObjectId,
                ref:"Review"
            }
        ],
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    }
)
listSchema.post('findOneAndDelete',async(listing)=>{
    await Review.deleteMany({_id:{$in:listing.reviews}})
})
const Listing=mongoose.model("Listing",listSchema)

module.exports=Listing