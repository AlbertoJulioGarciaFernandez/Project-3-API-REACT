// CreateUserComponent.jsx
import "./CreateUserComponent.css";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

export default function CreateUserComponent({ handleSubmit, setUser, user }) {

  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLasttName, setErrorLastName] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  function checkData(e) {
    e.preventDefault();
           if (user.firstName.length < 1) {
      setErrorFirstName(true);
    } else if (user.lastName.length < 1){
      setErrorLastName(true);
    } else if (user.address.length < 1){
      setErrorAddress(true);
    } else if (user.email.length < 1){
      setErrorEmail(true);
    } else if (user.password.length < 1){
      setErrorPassword(true);
    } else {
      handleSubmit(e);
    }
  }

  return (
    <div className="containerFragmentCreateUser">
      <form className="formulariocrearteUser">
        <React.Fragment>
          <Typography
            className="tituloCreate"
            gutterBottom
            variant="h4"
            component="form"
          >
            Alta de Usuario
          </Typography>

          <CardContent className="formContainerCreateUser">
            <TextField
              className="textField"
              value={user.firstName}
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required-name"
              label="Nombre"
              placeholder="Nombre"
              error={errorFirstName}
              helperText={errorFirstName ? "El Nombre es obligatorio" : ""}
              onChange={(e) => {
                setUser({ ...user, firstName: e.target.value });
                setErrorFirstName(false)
              }}

            />
            <TextField
              className="textFieldCreateUser"
              value={user.lastName}
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required-lastname"
              label="Apellidos"
              placeholder="Apellidos"
              error={errorLasttName}
              helperText={errorLasttName ? "El Apellido es obligatorio" : ""}
              onChange={(e) => {
                setUser({ ...user, lastName: e.target.value });
                setErrorLastName(false)
              }}
            />
            <TextField
              className="textFieldCreateUser"
              value={user.address}
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required-address"
              label="Direccion"
              placeholder="Direccion"
              error={errorAddress}
              helperText={errorAddress ? "La Dirección es obligatoria" : ""}
              onChange={(e) => {
                setUser({ ...user, address: e.target.value });
                setErrorAddress(false)
              }}
            />
            <TextField
              className="textFieldCreateUser"
              value={user.email}
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required-email"
              label="Email"
              placeholder="Email"
              error={errorEmail}
              helperText={errorEmail ? "El Email es obligatorio" : ""}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
                setErrorEmail(false)
              }}
            />
            <TextField
              className="textFieldCreateUser"
              value={user.password}
              type="password"
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required-password"
              label="Password"
              placeholder="Password"
              error={errorPassword}
              helperText={errorPassword ? "La contraseña es obligatoria" : ""}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                setErrorPassword(false)
              }}
            />
          </CardContent>

          <CardActions className="botonEnviar">
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={checkData}
            >
              Crear
            </Button>
          </CardActions>
        </React.Fragment>
      </form>
    </div>
  );
}
