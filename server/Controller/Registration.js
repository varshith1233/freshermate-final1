const transporter = require('../Config/Transporter')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../Model/User')

async function AddNewUser(req,res){
    const rollNumber = req.body.rollNumber
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const yearOfPassout = req.body.yearOfPassout
    const branch = req.body.branch
    const section = req.body.section
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    const semester = req.body.semester
    try{
        const existingUser = await User.findOne({ email,rollNumber });
  
      if (existingUser) {
        return res.status(404).json({ message: "Email already exists" });
      }
        if(password===confirmPassword){
            hashedPassword = await bcrypt.hash(password,10)
            const token =  jwt.sign({email},"secret-token",{
                expiresIn:"15m"
            })
            const data = {
                rollNumber,firstName,lastName,yearOfPassout,branch,section,email,hashedPassword,semester
            }
            const encodedData = encodeURIComponent(JSON.stringify(data));
            const verification_url = `http://localhost:8000/register/verify/${token}/${encodedData}`
            const maildetails = {
                from:"samuelsachin69@gmail.com",
                to:email,
                subject:"Account verification",
                text:`Verify yourself by clicking this url: ${verification_url}`
            }
    
            await transporter.sendMail(maildetails);
            return res.send({code:200,message:"Success"})
        }

    }catch(error){
        console.log(error)
    }

}

async function VerifyUser(req,res){
    const token = req.params.token
    const data = req.params.encodedData
    try{
        const UserData = JSON.parse(decodeURIComponent(data));
        console.log(token)
        console.log(UserData)
        jwt.verify(token,"secret-token")
        const SaveUser =  new User({
            rollNumber:UserData.rollNumber,
            firstName:UserData.firstName,
            lastName:UserData.lastName,
            yearOfPassout:UserData.yearOfPassout,
            branch:UserData.branch,
            section:UserData.section,
            email:UserData.email,
            password:UserData.hashedPassword,
            isVerified:true,
            status:"active",
            token:null,
            semester:UserData.semester
        })

        await SaveUser.save()
        res.redirect('http://localhost:3000/registration-success');
        
    }catch(error){
        if (error.code === 11000) {
            console.error('Duplicate key error:', error);
            return res.redirect('http://localhost:3000/registration-fail');
        } else if (error.name === 'TokenExpiredError') {
            console.error('Token has expired');
            return res.redirect('http://localhost:3000/registration-fail');
        } else if (error.name === 'JsonWebTokenError') {
            console.error('Invalid token');
            return res.redirect('http://localhost:3000/registration-fail');
        } else {
            console.error('An unexpected error occurred:', error);
            return res.redirect('http://localhost:3000/registration-fail');
        }
    }
}

module.exports = {AddNewUser,VerifyUser}