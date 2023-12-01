// CreateUserComponent.jsx
import "./UpdateUserComponent.css";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import React, { useState } from "react";

export default function UpdateUserComponent({ handleSubmit, setUser, user }) {
  const [errorId, setErrorId] = useState(false),
    [errorFirstName, setErrorFirstName] = useState(false),
    [errorLastName, setErrorLastName] = useState(false),
    [errorAddress, setErrorAddress] = useState(false),
    [errorEmail, setErrorEmail] = useState(false),
    [errorPassword, setErrorPassword] = useState(false),
    [errorRole, setErrorRole] = useState(false)

  function chekData(e) {
    e.preventDefault();
           if (user.id.length < 1) {
      setErrorId(true);
    } else if (user.firstName.length < 1) {
      setErrorFirstName(true);
    } else if (user.lastName.length < 1) {
      setErrorLastName(true);
    } else if (user.address.length < 1) {
      setErrorAddress(true);
    } else if (user.email.length < 1) {
      setErrorEmail(true);
    } else if (user.password.length < 1) {
      setErrorPassword(true);
    } else if (user.role.length < 1) {
      setErrorRole(true);
    } else {
      handleSubmit(e);
    }
  }

  return (
    <div className="containerFragment">
      <form className="formularioUpdateUser">
        <React.Fragment>
          <Typography
            gutterBottom
            variant="h4"
            component="form"
            className="tituloUdpdate"
          >
            Actualización de Usuario
          </Typography>

          <CardContent className="formContainer">
            <TextField
              className="textField"
              value={user.id}
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required"
              label="Id Usuario"
              placeholder="Id Usuario"
              error={errorId}
              helperText={errorId ? "El Id es obligatorio" : ""}
              onChange={(e) => {
                setUser({ ...user, id: e.target.value });
                setErrorId(false)
              }}
            />
            <TextField
              className="textField"
              value={user.firstName}
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required-1"
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
              className="textField"
              value={user.lastName}
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required-2"
              label="Apellidos"
              placeholder="Apellidos"
              error={errorLastName}
              helperText={errorLastName ? "El Apellido es obligatorio" : ""}
              onChange={(e) => {
                setUser({ ...user, lastName: e.target.value });
                setErrorLastName(false)
              }}
            />
            <TextField
              className="textField"
              value={user.address}
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required-3"
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
              className="textField"
              value={user.email}
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required-4"
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
              className="textField"
              value={user.password}
              type="password"
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required-5"
              label="Password"
              placeholder="Password"
              error={errorPassword}
              helperText={errorPassword ? "La contraseña es obligatoria" : ""}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                setErrorPassword(false)
              }}
            />
            <TextField
              className="textField"
              value={user.role}
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required-6"
              label="role"
              placeholder="role"
              error={errorRole}
              helperText={errorRole ? "El Role es obligatorio" : ""}
              onChange={(e) => {
                setUser({ ...user, role: e.target.value });
                setErrorRole(false)
              }}
            />
          </CardContent>

          <CardActions className="botonEnviar">
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={chekData}
            >
              Actualizar
            </Button>
          </CardActions>
        </React.Fragment>
      </form>
    </div>
  );
}
