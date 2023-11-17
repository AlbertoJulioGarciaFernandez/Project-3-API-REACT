import { createBrowserRouter, redirect } from "react-router-dom";
import PaginaPrincipal from "../pages/PaginaPrincipal/PaginaPrincipal";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import Root from "../layouts";
import LoginForm from "../pages/Login/LoginForm";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PaginaPrincipal />,
  },
  {
    path: "/signup",
    element: <Signup/>,
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
    path: "/home",
    element: <Home />,
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/")  //If the user isn't logged in, we redirect to the login page.
      } else {
        return null;
      }
    }
  },
]);
