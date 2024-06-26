import axios from "axios"
import { USER_API_ENDPOINT } from "../utils/constant"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getOtherUsers } from "../redux/userSlice"
const useOtheruser  = (id) =>{
    const dispatch = useDispatch();
    useEffect(() =>{
        const fetchotherusers = async () => {
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/otheruser/${id}`,{
                    withCredentials:true
                });
                dispatch(getOtherUsers(res.data.otherusers));
            } catch (error) {
                console.log(error);
            }
        }
        fetchotherusers();
    },[]);
    
}

export default useOtheruser;