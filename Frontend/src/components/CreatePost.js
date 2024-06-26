import React, { useState } from "react";
import Avatar from 'react-avatar';
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_ENDPOINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAlltweets, getRefresh, getisActive } from "../redux/tweetSlice";

const CreatePost = () => {
    const [discription,setDescription] = useState("");
    const {user} = useSelector(store=>store.user);
    const {isActive} = useSelector(store=>store.tweet);
    const dispatch = useDispatch();

    const submitHandler = async () =>{
           try {
              const res = await axios.post(`${TWEET_API_ENDPOINT}/create`,{discription , id:user?._id},{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
              })
              console.log(res);
              dispatch(getRefresh()); 
              if(res.data.success)
                {
                    toast.success(res.data.message);
                }
           } catch (error) {
              toast.error(error.response.data.message);
               console.log(error);
           }
           setDescription("");

    }

    const foryouhandler = async () =>{
        dispatch(getisActive(true));
    }
    const followinghandler = async () =>{
        dispatch(getisActive(false));
    }
    return (
        <div className="w-[100%]">
            <div >
                <div className="flex items-center justify-evenly border-b border-gray-200 ">
                    <div onClick={foryouhandler} className={`${isActive? "border-b-4 border-blue-400" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                        <h1 className="font-semibold text-gray-600 text-lg">
                            For you
                        </h1>
                    </div>
                    <div  onClick={followinghandler} className={`${!isActive? "border-b-4 border-blue-400" : "border-b-4 border-transparent"} cursor-pointer  hover:bg-gray-200 w-full text-center px-4 py-3`}>
                        <h1 className="font-semibold text-gray-600 text-lg">
                            Following
                        </h1>
                    </div>
                </div>
                <div>
                    <div className="flex items-center p-4">
                        <div>
                           <Avatar src="https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg" size="40" round={true} />
                        </div>
                        <input value={discription} onChange={(e)=>setDescription(e.target.value)} className="w-full outline-none border-none text-lg ml-2" type="text" placeholder="What is happening?"/>
                    </div>
                    <div className="flex justify-between p-4 border-b border-gray-200">
                        <div className="my-2">
                           <CiImageOn size="24px"/>
                        </div>
                        <button onClick={submitHandler} className="bg-[#1D9BF0] px-4 py-1 text-lg text-white border-none rounded-full">
                            Post
                        </button>
                    </div>
                </div>
           </div>
        </div>
    )
};


export default CreatePost;