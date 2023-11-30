// CreateUserComponent.jsx
import "./UpdateUserComponent.css";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import React  from "react";

export default function UpdateUserComponent({ handleSubmit, setUser, user }) {

  return (
    <div className="containerFragment">
      <form className="formularioUpdateUser">
        <React.Fragment>
          <Typography gutterBottom variant="h4" component="form" className="tituloUdpdate">
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
              onChange={(e) => {
                setUser({ ...user, id: e.target.value });
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
              onChange={(e) => {
                setUser({ ...user, firstName: e.target.value });
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
              onChange={(e) => {
                setUser({ ...user, lastName: e.target.value });
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
              onChange={(e) => {
                setUser({ ...user, address: e.target.value });
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
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
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
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
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
              onChange={(e) => {
                setUser({ ...user, role: e.target.value });
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
