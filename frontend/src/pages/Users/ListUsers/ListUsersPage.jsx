import { useEffect, useState } from "react"
import ListUsersComponent from "../../../components/Usuarios/ListUsers/ListUsersComponent"
import { getListUsers } from "../../../services/Users"

function ListUsersPage() {

  const [user, setUSer] = useState([])
  

  async function getUsers(){
    const data = await getListUsers()
    setUSer(data.users)
  
 }

  useEffect(() => {
    getUsers();
  }, [])
/*   console.log(user) */


  return (
    <>
      {user.length === 0 ? <h1>Hole</h1> : <ListUsersComponent users={user}/>}
    </>
    
  )
}

export default ListUsersPage