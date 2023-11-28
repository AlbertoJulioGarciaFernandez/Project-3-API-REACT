import "./DeleteUserComponent.css";
import { useEffect, useState } from "react";
import { deleteUser, getListUsers } from "../../../services/user";

export default function DeleteUserComponent() {

  const [userSelected, setUserSelected] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([]);

  
  const handleSelectChange = (e) => {
    setUserSelected(e.target.value);
  };
  
  async function removeUser() {
    const id = parseInt(userSelected);
    await deleteUser(id);
    setRefresh(!refresh);
  }
  
  const handleClick = async (e) => {
    e.preventDefault();
    removeUser();
  };
  
  //user.users && user.users.map((user) =>{  comprueba que dentro de la varible user tenga users, en la primera vez no los carga porque es un array vacio en el useState
  //si esto existe o tiene ese campo, va a traer los users.
  //user.users?.map((user) =>{ es lo mismo
  const listUser = users.users && users.users.map((user) => {
      return (
        <>
            <option value={user.id} key={user.id} onClick={(e) => handleSelectChange(e)}>
            {user.id} - {user.firstName}  {user.lastName}
            </option>
          </>
        );
      });
/*       console.log(result); */
    
    
    async function getUsers(){
      const data = await getListUsers();
      setUsers(data);
    }
  
  
    useEffect(() => {
      getUsers();
    },[refresh]);
    
  return (
    <>
      <form className="formulario" action="#">
        <label className="titulo">
          Eliminar usuario
        </label>
        <select className="seleccion" name="lenguajes" id="lang" size="4">
          {listUser}
        </select>
        <input className="boton" type="submit" value="Enviar" onClick={handleClick} />
      </form>
    </>
  );
}
