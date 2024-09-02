const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Succesfully connected to MongoDB")
}).catch((err)=>{
    console.log("Error occured in MongoDB Connection",err)
})

module.exports = mongoose