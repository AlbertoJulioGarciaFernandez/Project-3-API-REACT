/* import "./CreateUserComponent.css";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import React from "react";

function CreateUserComponent({handleChange, handleSubmit}){

  const styles = {
    texField: {
      marginBottom: '20px'
    }
  }
  
  const card = (
    <div className="containerFragment" >
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

            onChange={handleChange}

          />
          <br />

          <TextField className="textField"  
            sx={ styles.texField }
            component="form"
            required
            id="outlined-required"
            label="Apellidos"
            placeholder="Apellidos"

            onChange={handleChange}
          />
          <br />

          <TextField className="textField"
           sx={ styles.texField }
            component="form"
            required
            id="outlined-required"
            label="Direccion"
            placeholder="Direccion"
          
            onChange={handleChange}
          />
          <br />

          <TextField className="textField"
           sx={ styles.texField }
            component="form"
            required
            id="outlined-required"
            label="Email"
            placeholder="Email"

            onChange={handleChange}
          />
          <br />

          <TextField className="textField"
           sx={ styles.texField }
            id="outlined-password-input"
            label="Password"
            type="Contraseña"
            placeholder="Contraseña"
            autoComplete="current-password"

            onChange={handleChange}
          />
        </CardContent>
        <CardActions>
          <Button 
          type="submit" 
          variant="contained" 
          color="success" 
          onSubmit={handleSubmit}>
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
 */

//---------------------------------------------------------------

// CreateUserComponent.jsx
import "./CreateUserComponent.css";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import React  from "react";

export default function CreateUserComponent({ handleSubmit, setUser, user }) {
  // Estados locales para cada campo del formulario
 /*  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState({});
 */


  return (
    <div className="containerFragment">
      <form>
        <React.Fragment>
          <Typography gutterBottom variant="h4" component="form">
            Alta de Usuario
          </Typography>

          <CardContent className="formContainer">
            <TextField
              className="textField"
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required"
              label="Nombre"
              placeholder="Nombre"
              onChange={(e) => {
                setUser({ ...user, firstName: e.target.value });
              }}
            />
            <TextField
              className="textField"
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required"
              label="Apellidos"
              placeholder="Apellidos"
              onChange={(e) => {
                setUser({ ...user, lastName: e.target.value });
              }}
            />
            <TextField
              className="textField"
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required"
              label="Direccion"
              placeholder="Direccion"
              onChange={(e) => {
                setUser({ ...user, address: e.target.value });
              }}
            />
            <TextField
              className="textField"
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required"
              label="Email"
              placeholder="Email"
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
             <TextField
              className="textField"
              type="password"
              sx={{ marginBottom: "20px" }}
              component="form"
              required
              id="outlined-required"
              label="Password"
              placeholder="Password"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </CardContent>

          <CardActions>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Enviar
            </Button>
          </CardActions>
        </React.Fragment>
      </form>
    </div>
  );
}
