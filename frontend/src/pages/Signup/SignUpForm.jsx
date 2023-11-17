import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import './SignUpForm.css';
import { signup } from "../../services/signup";

function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetyped, setPasswordRetyped] = useState("");
  const [inputError, setInputError] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  const [userRegistered, setUserRegistered] = useState(false);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const handleNavigate = () => {
    navigate("/dashboard");
  }

  async function handleClick() {
    try {
      const { data } = await signup({ firstName, lastName, address, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      setUserRegistered(true);
    } catch (error) {
      console.log(error)
      setInputError(true);
      setErrorMsg(error);
    }
  }

  return (
    <Card
      sx={{ maxWidth: "700px", backgroundColor: "white", margin: "20px" }}
      raised={true}
    >
      <CardHeader title="Registro de usuario"></CardHeader>
      <CardContent>
        <TextField
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          label="Nombre"
          margin="dense"
          fullWidth={true}
        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment>
        //       <Icon>
        //         <Email />
        //       </Icon>
        //     </InputAdornment>
        //   ),
        // }}
        ></TextField>
        <TextField
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          label="Apellidos"
          margin="dense"
          fullWidth={true}
        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment>
        //       <Icon>
        //         <Email />
        //       </Icon>
        //     </InputAdornment>
        //   ),
        // }}
        ></TextField>
        <TextField
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          label="Dirección"
          margin="dense"
          fullWidth={true}
        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment>
        //       <Icon>
        //         <Email />
        //       </Icon>
        //     </InputAdornment>
        //   ),
        // }}
        ></TextField>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          label="Email"
          margin="dense"
          fullWidth={true}
          placeholder="user@email.com"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>
                  <Email />
                </Icon>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          type={isVisible ? "text" : "password"}
          label="Password"
          margin="dense"
          placeholder="Se requiere que su contraseña tenga como mínimo ocho caracteres."
          fullWidth={true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>
                  <Lock />
                </Icon>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setIsVisible(!isVisible)}>
                  {isVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <TextField
          onChange={(e) => setPasswordRetyped(e.target.value)}
          type={isVisible ? "text" : "password"}
          label="Repita contraseña"
          margin="dense"
          fullWidth={true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>
                  <Lock />
                </Icon>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setIsVisible(!isVisible)}>
                  {isVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handleClick}
          size="medium"
          // color="primary"
          variant="contained"
        >
          Login
        </Button>
      </CardActions>
      <CardContent>
        <Link to={`/login`}>
          <Typography
            variant="body1"
            color="text.secondary"
            display="flex"
            justifyContent="center"
          >
            Si ya está registrado, haga click aquí
          </Typography>
        </Link>
      </CardContent>

      {inputError && <Alert severity="error">Error. +Info: <br />-Faltan campos por cumplimentar <br />-Hay campos que no se han cumplimentado correctamente. <br /> {errorMsg.message}</Alert>}

      {userRegistered && <Dialog
        open={userRegistered}
        onClose={handleNavigate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Registro de usuario"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Usuario correctamente registrado.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNavigate}>Acceder</Button>
        </DialogActions>
      </Dialog>}
    </Card>
  );
}

export default SignUpForm;
