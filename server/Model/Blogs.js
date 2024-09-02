const mongoose = require('../Config/Connection')

const blog = mongoose.Schema({
   rollNumber:{
    type:String,
    required:true
   },
   branch:{
    type:String,
    required:true
   },
   createdAt:{
    type: Date,
    default: Date.now
   },
   title:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   },
   images: [
    {
      imagename: {
        type: String,
        required: true,
      },
      imageId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
  ],
  email:{
    type:String,
    required:true
  },
  firstName:{
    type:String,
  },
  lastName:{
    type:String,
  }
})

module.exports = mongoose.model('blog',blog)