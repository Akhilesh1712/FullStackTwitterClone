import React from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import useGetProfile from "../hooks/useGetProfile";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import toast from "react-hot-toast";
import { USER_API_ENDPOINT } from '../utils/constant';
import { following } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';

const Profile = () => {
    const { user, profile } = useSelector(store => store.user);
    const { id } = useParams();

    // Custom hook to fetch profile data
    useGetProfile(id);
    const dispatch = useDispatch();

    const followAndUnfollowHandler = async () => {
        //unfollow
        if(user.following.includes(id)){
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_ENDPOINT}/unfollow/${id}`, {id:user?._id});
                dispatch(following(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        }
        else{//follow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_ENDPOINT}/follow/${id}`, {id:user?._id});
                dispatch(following(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        }
    }

    return (
        <div className='w-[80%] ml-10 border-l border-r border-gray-200'>
            <div>
                <div className='flex items-center px-4 py-2'>
                    <Link to="/" className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <IoArrowBackOutline />
                    </Link>
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg'>
                            {profile?.name || 'Loading...'}
                        </h1>
                        <p className='text-gray-500 text-sm'>
                            10 post
                        </p>
                    </div>
                </div>
                <img src="https://pbs.twimg.com/profile_banners/1370641767830233091/1628699136/1500x500" alt="banner" />
                <div className='absolute top-60 border-4 border-white rounded-full'>
                    <Avatar src="https://pbs.twimg.com/profile_images/1702670670100934657/-QwxGPw3_400x400.jpg" size="100" round={true} />
                </div>
                <div className='text-right m-2'>
                    {profile && user ? (
                        profile._id === user._id ? (
                            <button className='px-4 py-1 rounded-full border border-gray-400 hover:bg-gray-200 cursor-pointer'>
                                Edit Profile
                            </button>
                        ) : (
                            <button onClick={followAndUnfollowHandler} className='px-4 py-1 rounded-full border bg-black text-white border-gray-400 cursor-pointer'>
                                {user.following.includes(id) ? "Following" : "Follow" }
                            </button>
                        )
                    ) : (
                        <span>Loading...</span>
                    )}
                </div>

                <div className='m-4'>
                    <h1 className='font-bold text-xl'>{profile?.name || 'Loading...'}</h1>
                    <p>{profile ? `@${profile.username}` : 'Loading...'}</p>
                </div>
                <div className='m-4 text-sm'>
                    <p>{profile?.bio || 'Loading bio...'}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
