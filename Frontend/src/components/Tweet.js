import axios from "axios";
import React from "react";
import { useState } from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { TWEET_API_ENDPOINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { MdDeleteOutline } from "react-icons/md";
const Tweet = ({ tweet }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredHeart, setIsHoveredHeart] = useState(false);
    const [isHoveredBook, setIsHoveredBook] = useState(false);
    const [isHoverDelete, setIsHoverDelete] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.user);
    const likeorDislike = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_ENDPOINT}/like/${id}`, { id: user?._id }, {
                withCredentials: true
            })
            dispatch(getRefresh());
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
    const deleteTweetHandler = async (id) =>{
                 try {
                    axios.defaults.withCredentials = true;// another way of withcredentcial
                    const res = await axios.delete(`${TWEET_API_ENDPOINT}/delete/${id}`);
                    toast.success(res.data.message);
                    dispatch(getRefresh());
                 } catch (error) {
                    toast.error(error.response.data.message);
                    console.log(error);
                 }
    }
    return (
        <div className="border-b border-gray-200">
            <div className="flex p-3">
                <Avatar src="https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg" size="40" round={true} />
                <div className="ml-2 w-full">
                    <div className="flex items-center ">
                        <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
                        <p className="text-gray-500 text-sm ml-2">{`@${tweet?.userDetails[0]?.username}`} . 1m</p>
                    </div>

                    <div>
                        <p>
                            {tweet?.discription}
                        </p>
                    </div>
                    <div className="flex justify-between my-2">
                        <div className="flex items-center">
                            <div onClick={() => likeorDislike(tweet?._id)}
                                className="p-2"
                                onMouseEnter={() => setIsHoveredHeart(true)}
                                onMouseLeave={() => setIsHoveredHeart(false)}
                            >
                                <FaRegHeart size="22px" color={isHoveredHeart ? 'red' : 'inherit'} />
                            </div>

                            <p >
                                {tweet?.like?.length}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div
                                className="p-2 hover:bg-blue-100 rounded-full cursor-pointer"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <FaRegComment size="22px" color={isHovered ? 'blue' : 'inherit'} />
                            </div>
                            <p >
                                0
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div
                                className="p-2 hover:bg-blue-100 rounded-full cursor-pointer"
                                onMouseEnter={() => setIsHoveredBook(true)}
                                onMouseLeave={() => setIsHoveredBook(false)}
                            >
                                <FaRegBookmark size="22px" color={isHoveredBook ? 'blue' : 'inherit'} />
                            </div>

                            <p >
                                0
                            </p>
                        </div>
                        {


                            user?._id === tweet?.userId && (
                                <div onClick={()=>deleteTweetHandler(tweet?._id)} className="flex items-center">
                                    <div
                                        className="p-2 hover:bg-green-100 rounded-full cursor-pointer"
                                        onMouseEnter={() => setIsHoverDelete(true)}
                                        onMouseLeave={() => setIsHoverDelete(false)}
                                    >
                                        <MdDeleteOutline size="22px" color={isHoverDelete ? 'red' : 'inherit'} />
                                    </div>


                                </div>

                            )



                        }

                    </div>
                </div>
            </div>
        </div>

    )
};

export default Tweet;