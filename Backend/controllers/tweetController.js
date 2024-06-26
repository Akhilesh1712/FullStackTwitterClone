import {Tweet} from "../models/tweetSchema.js";
import {User} from "../models/userSchema.js";
export const createTweet  = async(req,res) => {
    try{
        const {discription , id} = req.body;
        if(!discription || !id){
            return res.status(401).json({
                message: "Fields are require",
                success: false
            });
        }
        const user = await User.findById(id).select("-password");
        await Tweet.create({
            discription,
            userId: id,
            userDetails:user
        });
        return res.status(201).json({
            message: "Tweet posted",
            success: true
        })
    } catch (err){
        console.log(err);
    }
}

export const deleteTweet = async (req,res) => {
    try{
        const {id} = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Tweet delete",
            success: true
        })
    } catch (err) {
        console.log(err);
    }
}

export const likeordislike = async(req,res) => {
    try{
         const loggeduserId = req.body.id;
         const tweetId = req.params.id;
         const tweet = await Tweet.findById(tweetId);
         if(tweet.like.includes(loggeduserId)){ //include js ka fun hai array me vo find ka ager ye id array me hai to dislike
            //dislike
            await Tweet.findByIdAndUpdate(tweetId,{$pull:{like:loggeduserId}});
            return res.status(200).json({
                message: "dislike",
                success: true
            })
         }else {
            //like
            await Tweet.findByIdAndUpdate(tweetId,{$push:{like:loggeduserId}});
            return res.status(200).json({
                message: "like",
                success: true
            })
         } 
    } catch (err){

    }
}
//tweets me uska tweet and follow ka tweets
export const getAlltweet = async (req,res) => {
     
    try {
        const id = req.params.id;
        const loggedInuser = await User.findById(id);
        const loggInuserTweets = await Tweet.find({userId:id});//id ager loggedin user ke equal to loggedin user ka tweet
        const followinguserTweet = await Promise.all(loggedInuser.following.map((otheruserId) => { //promise isliye kyuki bhot sare hoge tweet
               return Tweet.find({userId:otheruserId})
        }));
        return res.status(200).json({
            tweets: loggInuserTweets.concat(...followinguserTweet)
        })  
    } catch (error) {
        console.log(error);
    }
}
//to show only following tweet
export const getfollowingTweet = async (req,res) => {
    try {
        const id = req.params.id;
        const loggedInuser = await User.findById(id);
        const followinguserTweet = await Promise.all(loggedInuser.following.map((otheruserId) => { //promise isliye kyuki bhot sare hoge tweet
               return Tweet.find({userId:otheruserId})
        }));
        return res.status(200).json({
            tweets: [].concat(...followinguserTweet)
        })  
    } catch (error) {
        console.log(error);
    }
}