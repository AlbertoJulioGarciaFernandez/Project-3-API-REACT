import { createBrowserRouter } from "react-router-dom";
import PaginaPrincipal from "../pages/PaginaPrincipal/PaginaPrincipal";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import Root from "../layouts";

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
    element: <Login />,
  },
  {
    path: "/root",
    element: <Root />,
  },
]);
