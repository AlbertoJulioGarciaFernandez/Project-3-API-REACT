/* import CreateUserComponent from '../../../components/Users/CreateUser/CreateUserComponent'

import { useState } from 'react';

function CreateUserPage() {

  const [user, setUser] = useState({
    nombre: "",
    apellidos: "",
    direccion: "",
    email: "",
    contraseña: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setUser((usuarioRegistrado) => ({
      ...usuarioRegistrado,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud POST al backend para guardar el nuevo usuario
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log('Usuario creado exitosamente');
        
      } else {
        console.error('Error al crear el usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };


  return (
    <CreateUserComponent  handleSubmit= {handleSubmit} handleChange={handleChange}/>
  )
}

CreateUserPage.propTypes = {}

export default CreateUserPage
 */

//---------------------------------------------------------------

// CreateUserPage.jsx
import CreateUserComponent from "../../../components/Users/CreateUser/CreateUserComponent";
import { useState } from "react";
import { createUser } from "../../../services/user";

function CreateUserPage() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
  });
 
  const handleSubmit = async () => {
    const response = await createUser(user)

  };

  return <CreateUserComponent handleSubmit={handleSubmit} setUser={setUser} user={user} />;
}

export default CreateUserPage;
