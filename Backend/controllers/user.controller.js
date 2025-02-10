import { User } from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
 const register = async(req,res)=>{
    try{
       
        const {fullname,email,phonenumber,password,role} = req.body;
        
    if(!fullname||!email ||!phonenumber ||!password ||!role) {
        return res.status(400).json({
            message:"something is missing",
            success:false
        });
 };

 const file = req.file;
 const fileUri = getDataUri(file);
 const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
const  user = await User.findOne({email});
if(user){
    return res.status(400).json({
        message:"User already exists with this email",
        success:false
})
}

const hashedPassword = await bcrypt.hash(password, 10);
await User.create({
    fullname,
    email,
    phonenumber,
    password: hashedPassword,
    role,
    profile:{
        profilephoto:cloudResponse.secure_url,
      }
});
return res.status(201).json({
    message: "Account created successfully.",
    success: true
});
}catch (error) {
    console.log(error);
    return res.status(500).json({
        message: "Internal Server Error",
        success: false
    });
}
}
 const login = async(req,res)=>{
    try{
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
     let user = await User.findOne({email});
     if(!user){
     return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
    })
}
const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is matching or not 
        if(role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });
        user = {
            _id: user._id,
            fullname: user.fullname,
            email:user.email,
            phonenumber:user.phonenumber,
            role:user.role,
            profile: user.profile
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    }catch(error){
        console.log(error)
}
}
 const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
 const updateProfile = async (req, res) => {
    try{
    const { fullname, email, phonenumber, bio, skills } = req.body;
   console.log(fullname, email, phonenumber, bio, skills)
   const file = req.file;
   const fileUri = getDataUri(file);
   const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    
    let skillsArray;
    if(skills){
        skillsArray = skills.split(",");
    }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phonenumber)  user.phonenumber = phonenumber
        if(bio)user.profile.bio = bio
        if(skills)user.profile.skills = skillsArray
        // Resume comes 
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }
        
await user.save()
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile:user.profile
        }
        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })

      }catch(error){
        console.log(error)
      }
    }
    export{register,login,updateProfile,logout}