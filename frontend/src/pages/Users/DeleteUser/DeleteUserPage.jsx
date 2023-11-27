/* // CreateUserPage.jsx
import DeleteUserComponent from "../../../components/Users/DeleteUser/DeleteUserComponent";
import { deleteUser } from "../../../services/user";

function DeleteUserPage() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
  });

  const handleSubmitSend = async () => {
  const response = await deleteUser(user);
  return response
  };


  const handleSubmitCancel = async () => {
    //volver a la pagina de eliminar
    };

  return <DeleteUserComponent user={user} />;
}

export default DeleteUserPage;
 */

import React, { useState } from "react";
import './DeleteUserComponent.css';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

export default function DeleteUserComponent({ users, setUsers }) {
  const [userId, setUserId] = useState('');

  const handleSubmit = () => {
    // Filtrar los usuarios y mantener solo aquellos cuyo ID no coincida con el que se va a eliminar
    const updatedUsers = users.filter(user => user.id !== userId);

    // Actualizar el estado con la nueva lista de usuarios
    setUsers(updatedUsers);

    // Limpiar el formulario o realizar otras acciones después de la eliminación
    setUserId('');
    // Puedes hacer más cosas aquí, como mostrar un mensaje, etc.
  };

  return (
    <div className="containerFragmentCreateUser">
      <form className="formulariocrearteUser">
        <React.Fragment>
          <Typography gutterBottom variant="h4" component="form">
            Eliminar Usuario
          </Typography>

          <CardContent className="formContainer">
            <TextField
              className="textField"
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required"
              label="Id Usuario"
              placeholder="Id Usuario"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </CardContent>

          <CardActions className="botonEnviar">
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Enviar
            </Button>
          </CardActions>
        </React.Fragment>
      </form>
    </div>
  );
}
