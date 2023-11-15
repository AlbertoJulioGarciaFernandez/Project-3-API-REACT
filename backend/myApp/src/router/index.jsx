import App from '../App.jsx'
import React from 'react'
import { createBrowserRouter, redirect } from 'react-router-dom'
import Root from '../layaut/index.jsx'
import Home from '../pages/Home/Home.jsx'
import User from '../pages/User/User.jsx'


const router = createBrowserRouter([
{
    path: '/',
    element:<App/>
},
{
    path: '/home',
    element:<Root/>,
    loader: ()=>{
        if (!localStorage.getItem('token')){
            return redirect('/')
        }else{
            return null
        }
    },
    children: [
        {
            path: '/home',
            element: <Home/>},
        {
            path: '/home/user',
            element: <User/>
        }
    ]
}

])

export default router