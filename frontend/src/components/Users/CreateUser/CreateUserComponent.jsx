// CreateUserComponent.jsx
import "./CreateUserComponent.css";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import React  from "react";

export default function CreateUserComponent({ handleSubmit, setUser, user }) {

  return (
    <div className="containerFragmentCreateUser">
      <form className="formulariocrearteUser">
        <React.Fragment>
          <Typography className="tituloCreate" gutterBottom variant="h4" component="form">
            Alta de Usuario
          </Typography>

          <CardContent className="formContainerCreateUser">
            <TextField
              className="textField"
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required-name"
              label="Nombre"
              placeholder="Nombre"
              onChange={(e) => {
                setUser({ ...user, firstName: e.target.value });
              }}
            />
            <TextField
              className="textFieldCreateUser"
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required-lastname"
              label="Apellidos"
              placeholder="Apellidos"
              onChange={(e) => {
                setUser({ ...user, lastName: e.target.value });
              }}
            />
            <TextField
              className="textFieldCreateUser"
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required-address"
              label="Direccion"
              placeholder="Direccion"
              onChange={(e) => {
                setUser({ ...user, address: e.target.value });
              }}
            />
            <TextField
              className="textFieldCreateUser"
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required-email"
              label="Email"
              placeholder="Email"
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
             <TextField
              className="textFieldCreateUser"
              type="password"
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required-password"
              label="Password"
              placeholder="Password"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </CardContent>

          <CardActions className="botonEnviar">
            <Button type="submit" variant="contained" color="success" onClick={handleSubmit}>
              Enviar
            </Button>
          </CardActions>
        </React.Fragment>
      </form>
    </div>
  );
}
