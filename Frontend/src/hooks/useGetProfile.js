import axios from "axios"
import { USER_API_ENDPOINT } from "../utils/constant"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getMyProfile } from "../redux/userSlice"
const useGetProfile  = (id) =>{
    const dispatch = useDispatch();
    useEffect(() =>{
        const fetchMyProfiel = async () => {
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/profile/${id}`,{
                    withCredentials:true
                });
                dispatch(getMyProfile(res.data.user));
            } catch (error) {
                console.log(error);
            }
        }
        fetchMyProfiel();
    },[id]);
    
}

export default useGetProfile;