import { useEffect, useState } from "react";
import ListUsersComponent from "../../../components/Users/ListUsers/ListUsersComponent";
import { getListUsers } from "../../../services/user";

function ListUsersPage() {
  const [user, setUSer] = useState([]);

  async function getUsers() {
    const data = await getListUsers();
    setUSer(data.users); //data.users accede a users que es el array de usuarios y lo almacena en user(singular) variable de estado
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <ListUsersComponent users={user} />
    </>
  );
}

export default ListUsersPage;
