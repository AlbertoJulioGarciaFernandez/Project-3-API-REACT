import { useEffect, useState } from "react"
import ListUsersComponent from "../../../components/Usuarios/ListUsers/ListUsersComponent"
import { getListUsers } from "../../../services/Users"

function ListUsersPage() {

  const [user, setUSer] = useState([])
  

  async function getUsers(){
    const data = await getListUsers()
    setUSer(data)
    console.log(data)
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <>
      <ListUsersComponent listaUsuarios={user}/>
    </>
    
  )
}

export default ListUsersPage