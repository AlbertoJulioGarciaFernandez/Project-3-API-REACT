// CreateUserComponent.jsx
import "./CreateUserComponent.css";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import React, { useState }  from "react";

export default function CreateUserComponent({ handleSubmit, setUser, user }) {

  const [errorFirstName, setErrorFirstName] = useState(false),
        [errorLastName, setErrorLastName] = useState(false),
        [errorAddress, setErrorAddress] = useState(false),
        [errorEmail, setErrorEmail] = useState(false),
        [errorPassword, setErrorPassword] = useState(false)


  function chekData(e) {
    e.preventDefault();
        if (user.firstName.length < 1) {
      setErrorFirstName(true);
    } else if (user.lastName.length < 1) {
      setErrorLastName(true);
    } else if (user.address.length < 1) {
      setErrorAddress(true);
    } else if (user.email.length < 1) {
      setErrorEmail(true);
    } else if (user.password.length < 1) {
      setErrorPassword(true);
    } else {
      handleSubmit(e);
    }
  }
  

  return (
    <div className="containerFragmentCreateUser">
      <form className="formulariocrearteUser">
        <React.Fragment>
          <Typography className="tituloForm" gutterBottom variant="h5" component="form" >
            Alta de Usuario
          </Typography>

          <CardContent className="formContainerCreateUser">
            <TextField
              className="textFieldCreateUser"
              sx={{ backgroundColor: 'white', marginBottom: "20px" }}
              InputLabelProps={{ style: { fontWeight:"bold"} }}
              value={user.firstName}
              component="form"
              required
              id="outlined-required"
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
              sx={{ backgroundColor: 'white', marginBottom: "20px" }}
              InputLabelProps={{ style: { fontWeight:"bold"} }}
              value={user.lastName}
              component="form"
              required
              id="outlined-required"
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
              className="textFieldCreateUser"
              sx={{ backgroundColor: 'white', marginBottom: "20px" }}
              InputLabelProps={{ style: { fontWeight:"bold"} }}
              value={user.address}
              component="form"
              required
              id="outlined-required"
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
              sx={{ backgroundColor: 'white', marginBottom: "20px" }}
              InputLabelProps={{ style: { fontWeight:"bold"} }}
              value={user.email}
              component="form"
              required
              id="outlined-required"
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
              type="password"
              sx={{ backgroundColor: 'white', marginBottom: "20px" }}
              InputLabelProps={{ style: { fontWeight:"bold"} }}
              value={user.password}
              component="form"
              required
              id="outlined-required"
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

          <CardActions className="containerButton">
            <Button 
            size="large" variant="contained" sx={{background:"black"}}
            type="submit" onClick={chekData}>
              Enviar
            </Button>
          </CardActions>
        </React.Fragment>
      </form>
    </div>
  );
}
