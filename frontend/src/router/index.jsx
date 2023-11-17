import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../pages/Login/Login";
import Root from "../layouts";
import LoginForm from "../pages/Login/LoginForm";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Signup/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";

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
    element: <LoginForm />,
  },
  {
    path: "/root",
    element: <Root />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/")  //If the user isn't logged in, we redirect to the login page.
      } else {
        return null;
      }
    }
  },
]);
