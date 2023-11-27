// CreateUserPage.jsx
import UpdateUserComponent from '../../../components/Users/UpdateUser/UpdateUserComponent'
import { useState } from "react";
import { updateUser } from "../../../services/user";

function UpdateUserPage() {

  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
    role:"",
  });

  const handleSubmit = async () => {
    await updateUser(user);
  };

  return (
    <UpdateUserComponent
      handleSubmit={handleSubmit}
      setUser={setUser}
      user={user}
    />
  );
}

export default UpdateUserPage;
