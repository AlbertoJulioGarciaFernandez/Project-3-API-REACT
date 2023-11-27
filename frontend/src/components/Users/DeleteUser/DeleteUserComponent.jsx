// CreateUserComponent.jsx
import './DeleteUserComponent.css'
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import React  from "react";

export default function DeleteUserComponent({ handleSubmit, setUser, user }) {//de momento solo pasamos user

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
              onChange={(e) => {
                setUser({ user, id: e.target.value });
              }}
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