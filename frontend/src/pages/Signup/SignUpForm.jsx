import { useState } from "react";
import {
  Alert,
  Box,
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
import sideImg from '../../assets/loginSignupImg.jpg';
import Logo from "../../components/Logo/Logo";

function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [retypedPasswordMsg, setRetypedPasswordMsg] = useState("");
  const [inputError, setInputError] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  const [userRegistered, setUserRegistered] = useState(false);
  const navigate = useNavigate();
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [passwordRetypedIsVisible, setPasswordRetypedIsVisible] = useState(false);

  const handleNavigate = () => {
    navigate("/dashboard");
  }

  async function handleClick(e) {
    e.preventDefault();
    // Checking if both passwords match:
    if (retypedPassword !== password) {

      setRetypedPasswordMsg('Error, ambas contraseñas han de coincidir.');
    } else {
      setRetypedPasswordMsg('Ambas contraseñas coinciden.');
    }

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
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        raised={true}
        sx={{ backgroundColor: '#4E7FFF', height: '100vh', width: '50vw' }}
      >

        <Logo />
        <CardHeader title="Registro de usuario" sx={{ color: 'white', textAlign: 'center' }}></CardHeader>
        <CardContent>
          <TextField
            className="textfield"
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            label="Nombre"
            margin="dense"
            fullWidth={true}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            variant="filled"
          ></TextField>

          <TextField
            className="textfield"
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            label="Apellidos"
            margin="dense"
            fullWidth={true}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            variant="filled"
          ></TextField>

          <TextField
            className="textfield"
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            label="Dirección"
            margin="dense"
            fullWidth={true}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            variant="filled"
          ></TextField>

          <TextField
            className="textfield"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            label="Correo electrónico"
            margin="dense"
            fullWidth={true}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            placeholder="El correo electrónico ha de cumplir el siguiente formato de ejemplo: user@email.com"
            variant="filled"
          ></TextField>

          <TextField
            className="textfield"
            onChange={(e) => setPassword(e.target.value)}
            type={passwordIsVisible ? "text" : "password"}
            label="Contraseña"
            margin="dense"
            placeholder="Se requiere que su contraseña tenga como mínimo ocho caracteres."
            fullWidth={true}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setPasswordIsVisible(!passwordIsVisible)}>
                    {passwordIsVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>

          <TextField
            className="textfield"
            onChange={(e) => setRetypedPassword(e.target.value)}
            type={passwordRetypedIsVisible ? "text" : "password"}
            label="Repita contraseña"
            margin="dense"
            placeholder="La contraseña ha de coincidir con la establecida en el campo anterior."
            fullWidth={true}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setPasswordRetypedIsVisible(!passwordRetypedIsVisible)}>
                    {passwordRetypedIsVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>

          {retypedPasswordMsg !== '' && (retypedPasswordMsg.includes('Error') ? <Alert severity="error">Error. +Info: {retypedPasswordMsg}</Alert> : <Alert severity="success">{retypedPasswordMsg}</Alert>)}

        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleClick}
            size="medium"
            variant="contained"
          >
            Login
          </Button>
        </CardActions>
        <CardContent>

          <Typography
            variant="body1"
            color="white"
            fontSize={20}
            display="flex"
            justifyContent="center"
          >
            Si ya está registrado, haga clic&nbsp;<Link className="link" to={`/login`}>aquí.</Link>
          </Typography>
        </CardContent>

        {inputError && <Alert severity="error">Error. +Info: {errorMsg.message}</Alert>}

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

      <Box component={'img'} src={sideImg} sx={{ height: '100vh', width: '50vw', objectFit: 'cover' }} />

    </Box>


  );
}

export default SignUpForm;
