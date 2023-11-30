// CreateUserPage.jsx
import CreateUserComponent from "../../../components/Users/CreateUser/CreateUserComponent";
import { useEffect, useState } from "react";
import { createUser } from "../../../services/user";

function CreateUserPage() {
  const [refresh, setRefresh] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(user);
  setUser({
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      password: "",
    })
  }; 

  return (
    <CreateUserComponent
      handleSubmit={handleSubmit}
      setUser={setUser}
      user={user}
    />
  );
}

export default CreateUserPage;
