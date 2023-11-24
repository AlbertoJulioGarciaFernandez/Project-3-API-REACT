import React from "react";
import "./CreateUserComponent.css";

import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";


const styles = {
  texField: {
    marginBottom: '20px'
  }
}

function CreateUserComponent() {
  const card = (
    <div className="containerFragment">
      <React.Fragment>

        <Typography gutterBottom variant="h4" component="form">
          Alta de Usuario
        </Typography>

        <CardContent className="formContainer">
          
          <TextField className="textField"  
            sx={ styles.texField }
            component="form"
            required
            id="outlined-required"
            label="Nombre"
            placeholder="Nombre"
          />
          <br />

          <TextField className="textField"  
            sx={ styles.texField }
            component="form"
            required
            id="outlined-required"
            label="Apellidos"
            placeholder="Apellidos"
          />
          <br />

          <TextField className="textField"
           sx={ styles.texField }
            component="form"
            required
            id="outlined-required"
            label="Direccion"
            placeholder="Direccion"
          />
          <br />

          <TextField className="textField"
           sx={ styles.texField }
            component="form"
            required
            id="outlined-required"
            label="Email"
            placeholder="Email"
          />
          <br />

          <TextField className="textField"
           sx={ styles.texField }
            id="outlined-password-input"
            label="Password"
            type="Contraseña"
            placeholder="Contraseña"
            autoComplete="current-password"
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="success">
            Enviar
          </Button>
        </CardActions>
      </React.Fragment>
    </div>
  );

  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        <div>{card}</div>
      </Box>
    </>
  );
}

export default CreateUserComponent;
