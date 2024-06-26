import React, { useState } from 'react';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {getUser} from "../redux/userSlice";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginSignupHandler = () => {
        setIsLogin(!isLogin);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isLogin) {
            // login
            try {
                const res = await axios.post(`${USER_API_ENDPOINT}/login`, { email, password },{
                    headers:{
                      'Content-Type':"application/json",
                    },
                    withCredentials:true
                });
                dispatch(getUser(res?.data?.user));
                if(res.data.success){
                  navigate("/");
                  toast.success(res.data.message);
              }
            } catch (error) {
                toast.success(error.response.data.message);
                console.log(error);
            }
        } else {
            try {
                const res = await axios.post(`${USER_API_ENDPOINT}/register`, { name, username, email, password },{
                     headers:{
                      'Content-Type':"application/json",
                     },
                     withCredentials:true
                });
                if(res.data.success){
                    setIsLogin(true);
                    toast.success(res.data.message);
                }
            } catch (error) {
                toast.success(error.response.data.message);
                console.log(error);
            }
        }
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='flex items-center justify-evenly w-[80%]'>
                <div>
                    <img className='ml-5' width={"250px"} src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?w=826&t=st=1715020801~exp=1715021401~hmac=96a40a55cba8c27d4df1d52a4a794cee2442f348c421b53a2c2e8287aa49936c" alt="" />
                </div>
                <div>
                    <div className='my-5'>
                        <h1 className='font-bold text-5xl'>Happening Now.</h1>
                    </div>
                    <h1 className='mt-2 mb-2 text-2xl font-bold'>{isLogin ? 'Login' : 'Signup'}</h1>
                    <form onSubmit={submitHandler} className='flex flex-col w-[65%]'>
                        {
                            !isLogin && (
                                <>
                                    <input 
                                        type="text" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        placeholder='Name' 
                                        className='outline-blue-500 border border-gray-800 px-2 py-1 rounded-full my-1 font-semibold' 
                                    />
                                    <input 
                                        type="text" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                        placeholder='Username' 
                                        className='outline-blue-500 border border-gray-800 px-2 py-1 rounded-full my-1 font-semibold' 
                                    />
                                </>
                            )
                        }
                        <input 
                            type="text" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder='Email' 
                            className='outline-blue-500 border border-gray-800 px-2 py-1 rounded-full my-1 font-semibold' 
                        />
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder='Password' 
                            className='outline-blue-500 border border-gray-800 px-2 py-1 rounded-full my-1 font-semibold' 
                        />
                        <button className='bg-[#1D9BF0] border-none py-2 my-2 rounded-full text-lg text-white'>{isLogin ? 'Login' : 'Create Account'}</button>
                        <h1>{isLogin ? "Don't have an account?" : "Already have an account?"} <span onClick={loginSignupHandler} className='font-bold text-blue-400 cursor-pointer underline'>{isLogin ? 'Signup' : 'Login'}</span></h1>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
