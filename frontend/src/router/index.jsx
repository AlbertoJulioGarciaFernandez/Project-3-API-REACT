import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../pages/Login/Login";
import Root from "../layouts";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Signup/SignUp";
import ListBookings from "../pages/Booking/ListBookings/ListBookings";
import ListUsersPage from "../pages/Users/ListUsers/ListUsersPage";
import ListEquipment from "../pages/Equipment/ListEquipment/ListEquipment";
import AddEquipment from "../pages/Equipment/AddEquipment/AddEquipment";
import UpdateEquipment from "../pages/Equipment/UpdateEquipment/UpdateEquipment";
import DeleteEquipment from "../pages/Equipment/DeleteEquipment/DeleteEquipment";
import CreateUserPage from "../pages/Users/CreateUser/CreateUserPage";
import ListClassrooms from "../pages/Classroom/ListClassrooms/ListClassrooms";
import AddClassroom from "../pages/Classroom/AddClassroom/AddClassroom";
import UpdateClassroom from "../pages/Classroom/UpdateClassroom/UpdateClassroom";
import DeleteClassroom from "../pages/Classroom/DeleteClassroom/DeleteClassroom";
import NotFound from "../pages/NotFound/NotFound";
import ListBuildings from "../pages/Building/ListBuildings/ListBuildings";
import ListMyBookings from "../pages/Booking/ListMyBookings/ListMyBookings";
import AddBooking from "../pages/Booking/AddMyBooking/AddMyBooking";
import UpdateMyBooking from "../pages/Booking/UpdateMyBooking copy/UpdateMyBooking";
import DeleteMyBooking from "../pages/Booking/DeleteMyBooking/DeleteMyBooking";
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
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Root />,
    errorElement: <NotFound />,
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/"); //If the user isn't logged in, we redirect to the login page.
      } else {
        return null;
      }
    },
    children: [
      {
        path: "/dashboard/listBookings",
        element: <ListBookings />,
      },
      {
        path: "/dashboard/deleteEquipment",
        element: <DeleteEquipment />,
      },
      {
        path: "/dashboard/listUsers",
        element: <ListUsersPage />,
      },
      {
        path: "/dashboard/createUser",
        element: <CreateUserPage />,
      },
      {
        path: "/dashboard/listClassrooms",
        element: <ListClassrooms />,
      },
      {
        path: "/dashboard/addClassroom",
        element: <AddClassroom />,
      },
      {
        path: "/dashboard/updateClassroom",
        element: <UpdateClassroom />,
      },
      {
        path: "/dashboard/deleteClassroom",
        element: <DeleteClassroom />,
      },
      // {
      //   path: '/dashboard/updateBuilding',
      //   element: <UpdateBuilding />
      // },
      // {
      //   path: '/dashboard/deleteBuilding',
      //   element: <DeleteBuilding />
      // },
      {
        path: '/dashboard/listmybookings',
        element: <ListMyBookings/>
      },
      {
        path: '/dashboard/addmybooking',
        element: <AddBooking/>
      }
      ,
      {
        path: '/dashboard/updatemybooking',
        element: <UpdateMyBooking/>
      },
      {
        path: '/dashboard/deletemybooking',
        element: <DeleteMyBooking/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/dashboard/listbookings',
        element: <ListBookings/>
      }
    ],
  },
]);
