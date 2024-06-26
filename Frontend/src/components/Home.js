import React, { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import useOtheruser from "../hooks/useOtheruser";
import { useSelector } from "react-redux";
import useGetmytweets from "../hooks/useGetmytweets";


const  Home = () => {
    //custom hook
    const {user , otherUsers} = useSelector(store=>store.user);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user){
            navigate("/login");
        }
    },[]);
    useOtheruser(user?._id);
    useGetmytweets(user?._id);
   
    
    return (
        <div className="flex justify-between w-[80%] mx-auto">
            <LeftSidebar></LeftSidebar>
            <Outlet/>
            <RightSidebar otherUsers={otherUsers}></RightSidebar>
        </div>
    )
}

export default Home;