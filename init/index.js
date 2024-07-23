const mongoose=require('mongoose')
const initData=require('./data.js')
const Listing=require('../model/listing')


const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust'

main().then(()=>{console.log("db connected");}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
  }
const initDb=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>{return{...obj,owner:"668f8c245c2f9959fe991f09"}})
    await Listing.insertMany(initData.data)
    console.log("init");
}
initDb()