import React from "react";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from './Home.js';
import Feed from "./Feed.js";
import Profile from "./Profile.js";
import Login from "./Login.js";
const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home/>,
            children: [
                {
                    path: "/",
                    element: <Feed></Feed>
                },
                {
                    path: "/profile/:id",
                    element: <Profile/>
                }
            ]
        },
        {
            path: "/login",
            element: <Login/>
        }
    ])
    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    )
}


export default Body;