import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../pages/Login/Login";
import Root from "../layouts";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Signup/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";
import ListBookings from "../pages/ListBookings/ListBookings";
import ListUsersPage from "../pages/Users/ListUsers/ListUsersPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Root />,
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/")  //If the user isn't logged in, we redirect to the login page.
      } else {
        return null;
      }
    },
    children: [
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/dashboard/listbookings',
        element: <ListBookings/>
      },
      {
        path: '/dashboard/listusers',
        element: <ListUsersPage/>
      },
    ],
  },




  
]);
