const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Model/User')

async function CheckUser(req,res){
    const rollNumber = req.body.rollNumber
    const password = req.body.password
    try{
        const UserDetails = await User.findOne({rollNumber})
        if(UserDetails){
            if(await bcrypt.compare(password,UserDetails.password)){
                const email = UserDetails.email
                token = jwt.sign({rollNumber,email},"secret-token",{expiresIn:"1h"})
                UserDetails.token = token
                await UserDetails.save()
                return res.send({code:200,message:"Success",token:token})
            }else{
                return res.send({code:404,message:"Invalid Password"})
            }

        }else{
            return res.send({code:405,message:"User Doesn't exist"})
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = {CheckUser}