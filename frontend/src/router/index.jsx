import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../pages/Login/Login";
import Root from "../layouts";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Signup/SignUp";
import ListBookings from "../pages/Booking/ListBookings/ListBookings";
import ListUsersPage from "../pages/Users/ListUsers/ListUsersPage";
import DeleteEquipment from "../pages/Equipment/DeleteEquipment/DeleteEquipment";
import CreateUserPage from "../pages/Users/CreateUser/CreateUserPage";
import ListClassrooms from "../pages/Classroom/ListClassrooms/ListClassrooms";
import AddClassroom from "../pages/Classroom/AddClassroom/AddClassroom";
import UpdateClassroom from "../pages/Classroom/UpdateClassroom/UpdateClassroom";
import DeleteClassroom from "../pages/Classroom/DeleteClassroom/DeleteClassroom";
import NotFound from "../pages/NotFound/NotFound";
import UpdateUserPage from "../pages/Users/UpdateUser/UpdateUserPage";
import DeleteUserComponent from "../components/Users/DeleteUser/DeleteUserComponent";
import ListBuildings from "../pages/Building/ListBuildings/ListBuildings";
import ListMyBookings from "../pages/Booking/ListMyBookings/ListMyBookings";
import AddBooking from "../pages/Booking/AddBooking/AddBooking";
import UpdateMyBooking from "../pages/Booking/UpdateMyBooking/UpdateMyBooking";
import DeleteMyBooking from "../pages/Booking/DeleteMyBooking/DeleteMyBooking";
import AddMyBooking from "../pages/Booking/AddMyBooking/AddMyBooking";
import UpdateBooking from "../pages/Booking/UpdateBooking/UpdateBooking";
import DeleteBooking from "../pages/Booking/DeleteBooking/DeleteBooking";
import Profile from "../pages/Users/Profile/Profiel";
import AddBuilding from "../pages/Building/AddBuilding/AddBuilding";
import UpdateBuilding from "../pages/Building/UpdateBuilding/UpdateBuilding";
import DeleteBuilding from "../pages/Building/DeleteBuilding/DeleteBuilding";
import AddEquipment from "../pages/Building/AddBuilding/AddBuilding";
import UpdateEquipment from "../pages/Building/UpdateBuilding/UpdateBuilding";
import ListEquipment from "../pages/Equipment/ListEquipment/ListEquipment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
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
    path: "/dashboard/",
    element: <Root />,
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
        element: <ListBookings />
      },
      {
        path: '/dashboard/listmybookings',
        element: <ListMyBookings />
      },
      {
        path: '/dashboard/addbooking',
        element: <AddBooking />
      },
      {
        path: '/dashboard/addmybooking',
        element: <AddMyBooking />
      },
      {
        path: '/dashboard/updatebooking',
        element: <UpdateBooking />
      },
      {
        path: '/dashboard/updatemybooking',
        element: <UpdateMyBooking />
      },
      {
        path: '/dashboard/deletebooking',
        element: <DeleteBooking />
      },
      {
        path: '/dashboard/deletemybooking',
        element: <DeleteMyBooking />
      },
      {
        path: '/dashboard/profile',
        element: <Profile />
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
        path: "/dashboard/updateUser",
        element: <UpdateUserPage />,
      },
      {
        path: "/dashboard/deleteUser",
        element: <DeleteUserComponent />
      },
      {
        path: '/dashboard/listEquipment',
        element: <ListEquipment />
      },
      {
        path: '/dashboard/addEquipment',
        element: <AddEquipment />
      },
      {
        path: '/dashboard/updateEquipment',
        element: <UpdateEquipment />
      },
      {
        path: '/dashboard/deleteEquipment',
        element: <DeleteEquipment />
      },
      {
        path: '/dashboard/listClassrooms',
        element: <ListClassrooms />
      },
      {
        path: '/dashboard/addClassroom',
        element: <AddClassroom />
      },
      {
        path: '/dashboard/updateClassroom',
        element: <UpdateClassroom />
      },
      {
        path: '/dashboard/deleteClassroom',
        element: <DeleteClassroom />
      },
      {
        path: '/dashboard/listBuildings',
        element: <ListBuildings />
      },
      {
        path: '/dashboard/addBuilding',
        element: <AddBuilding />
      },
      {
        path: '/dashboard/updateBuilding',
        element: <UpdateBuilding />
      },
      {
        path: '/dashboard/deleteBuilding',
        element: <DeleteBuilding />
      },
    ],
  },
]);
