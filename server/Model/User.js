const mongoose = require('../Config/Connection')

const user = mongoose.Schema({
    rollNumber:{
        type:Number,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    yearOfPassout:{
        type:Date,
        required:true
    },
    semester:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    token:
    {
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
      status:
      {
          type:String,
          
      },
})

module.exports = mongoose.model('user',user)