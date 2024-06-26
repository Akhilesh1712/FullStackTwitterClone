import axios from "axios"
import { TWEET_API_ENDPOINT } from "../utils/constant"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAlltweets } from "../redux/tweetSlice"
const useGetmytweets  = (id) =>{
    const dispatch = useDispatch();
    const {refresh,isActive}  = useSelector(store=>store.tweet);
    
    const fetchMytweets = async () => {
        try {
            const res = await axios.get(`${TWEET_API_ENDPOINT}/getalltweet/${id}`,{
                withCredentials:true
            });
            dispatch(getAlltweets(res.data.tweets));
        } catch (error) {
            console.log(error);
        }
    }
    const followingTweetHandler = async () =>{
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get(`${TWEET_API_ENDPOINT}/getfollowingtweet/${id}`);
            dispatch(getAlltweets(res.data.tweets));
           
        } catch (error) {
          console.log(error);  
        } 
    }
    useEffect(() =>{
        
        if(isActive){
            
            fetchMytweets();
        }else{
            followingTweetHandler();
        }
         
        
    },[isActive,refresh]);
    
}

export default useGetmytweets;