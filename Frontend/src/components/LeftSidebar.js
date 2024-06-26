import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegMessage } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";
const LeftSidebar = () => {
    const {user } = useSelector(store =>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logouthandler = async () =>{
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`);
            toast.success(res.data.message);
            dispatch(getUser(null));
            dispatch(getOtherUsers(null));
            dispatch(getMyProfile(null));
            navigate('/login'); 
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="w-[20%] ">  
            <div>
                <div>
                    <img width={"45px"} src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?w=826&t=st=1715020801~exp=1715021401~hmac=96a40a55cba8c27d4df1d52a4a794cee2442f348c421b53a2c2e8287aa49936c" alt="twitwrlogo" />
                </div>
                <div className="my-5">
                    <Link to="/" className="flex items-center my-4 px-1 gap-1 hover:bg-gray-200 hover:cursor-pointer rounded-full">
                        <div>
                          <IoHomeOutline size="30px"/>
                        </div>
                       <h1 className="font-bold text-lg ml-3">Home</h1>
                    </Link>
                    <div className="flex items-center my-4 px-1 gap-1 hover:bg-gray-200 hover:cursor-pointer rounded-full">
                        <div>
                          <FiSearch size="30px" />
                        </div>
                       <h1 className="font-bold text-lg ml-3">Explore</h1>
                    </div>
                    <div className="flex items-center my-4 px-1 gap-1 hover:bg-gray-200 hover:cursor-pointer rounded-full">
                        <div>
                         <IoMdNotificationsOutline  size="30px"/>
                        </div>
                       <h1 className="font-bold text-lg ml-3">Notification</h1>
                    </div>
                    <div className="flex items-center my-4 px-1 gap-1 hover:bg-gray-200 hover:cursor-pointer rounded-full">
                        <div>
                          <FaRegMessage size="27px" />
                        </div>
                       <h1 className="font-bold text-lg ml-3">Messages</h1>
                    </div>
                    <Link to={`/Profile/${user?._id}`} className="flex items-center my-4 px-1 gap-1 hover:bg-gray-200 hover:cursor-pointer rounded-full">
                        <div>
                          <CgProfile size="30px"/>
                        </div>
                       <h1 className="font-bold text-lg ml-3">Profile</h1>
                    </Link>
                    <div className="flex items-center my-4 px-1 gap-1 hover:bg-gray-200 hover:cursor-pointer rounded-full">
                        <div>
                         <FaRegBookmark size="28px"/>
                        </div>
                       <h1 className="font-bold text-lg ml-3">Bookmarks</h1>
                    </div>
                    <div onClick={logouthandler} className="flex items-center my-4 px-1 gap-1 hover:bg-gray-200 hover:cursor-pointer rounded-full">
                        <div>
                          <MdOutlineLogout size="30px"/>
                        </div>
                       <h1 className="font-bold text-lg ml-2">Logout</h1>
                    </div>
                    <button className="px-4 py-2 border-none text-md bg-[#1D9BF0] w-[50%] rounded-full text-white font-bold">
                        Post
                    </button>
                </div>
            </div>
        </div>
    )

}


export default LeftSidebar;