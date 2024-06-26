import {User} from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const Register = async (req,res) =>{
    try {
        const {name , username , email , password} = req.body;
        if(!name || !username || !email || !password){ // ager kio ye field khali chod deta hai to
            return res.status(401).json({
                message: "ALL fied need to be fill",
                success: false
            })
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                 message: "User already exist here ",
                 success: false
            })
        }
        const hasspassword = await bcryptjs.hash(password,10);
        await User.create({
            name,
            username,
            email,
            password: hasspassword,
        });
        return res.status(201).json({
            message: "Account created",
            success: true
        })
    } catch (err) {
             console.log(err)
    }
}
export const Login = async (req,res) =>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message: "ALL fied need to be fill",
                success: false
            })
        };
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message: "Need to signUp",
                success: false
            })
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET,{expiresIn : "1d"})
        return res.status(201).cookie("token",token,{expiresIn: "1d", httpOnly: true}).json({
            message: `Welcome Back ${user.name}`,
            user,
            success: true
        })

    } catch (err){
        console.log(err);
    }
}
export const Logout = (req,res) =>{
    return res.cookie("token","",{expiresIn:new Date(Date.now())}).json({
        message: "user logged out successfully",
        success: true
    })
}

export const bookmark = async (req,res) =>{
    try {
        const loggeduserId = req.body.id;
        const usertweetid = req.params.id;
        const user = await User.findById(loggeduserId);
        if(user.bookmarks.includes(usertweetid)){
            //remove
            await User.findByIdAndUpdate(loggeduserId,{$pull:{bookmarks:usertweetid}});
            return res.status(200).json({
                message: "Bookmark removed",
                success: true
            })

        } else {
            //bookmark
            await User.findByIdAndUpdate(loggeduserId,{$push:{bookmarks:usertweetid}});
            return res.status(200).json({
                message: "Bookmarked",
                success: true                
            })
        }
    } catch (error) {
        console.log(error);
    }
}
//if user click on profile it profile should open
export const getmyProfile = async (req,res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        return res.status(200).json({
            user,
        })
    } catch (error) {
        console.log(error);
    }
}
//showing other user to home page
export const getotheruser = async (req,res) =>{
    try {
        const {id} = req.params;
        const otherusers = await User.find({_id:{$ne:id}}).select("-password");//ne matlab not include matlab hamre siva or user le aoyu
        if(!otherusers){
            return res.status(401).json({
                message: "only you are using X",
                
            })
        }
        return res.status(200).json({
            otherusers
            
        })
    } catch (error) {
        console.log(error);
    }
}

export const follow = async (req,res) =>{
    try {
        const loggedinuserid = req.body.id;//ye logged in banda
        const userId = req.params.id;//jis ko follow kerna
        const loggedInuser = await User.findById(loggedinuserid);
        const user = await User.findById(userId);
        if(!user.followers.includes(loggedinuserid)){//ager vo nhi matlab follow nhi kerta
            await user.updateOne({$push:{followers:loggedinuserid}});//uske followers me loggeinuser ke id dal do
            await loggedInuser.updateOne({$push:{following:userId}})//mere following me uske id

        }else{
            return res.status(400).json({
                message: "user has already followed"
            })
        }
        return res.status(200).json({
            message: `${loggedInuser.name} just followed to ${user.name}`,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const unfollow = async (req,res) =>{
    try {
        const loggedinuserid = req.body.id;//ye logged in banda
        const userId = req.params.id;//jis ko follow kerna
        const loggedInuser = await User.findById(loggedinuserid);
        const user = await User.findById(userId);
        if(loggedInuser.following.includes(userId)){
            await user.updateOne({$pull:{followers:loggedinuserid}});//uske followers me loggeinuser ke id hata do
            await loggedInuser.updateOne({$pull:{following:userId}})//mere following me uske id hata do

        }else{
            return res.status(400).json({
                message: "doesnt exist that user"
            })
        }
        return res.status(200).json({
            message: `${loggedInuser.name} just unfollowed to ${user.name}`,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}