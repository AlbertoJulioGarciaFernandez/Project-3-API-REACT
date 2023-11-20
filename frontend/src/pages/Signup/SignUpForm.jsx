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
  const [isVisible, setIsVisible] = useState(false);

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
        sx={{ backgroundColor: '#4E7FFF' }}
      >
        
        <Logo />
        <CardHeader title="Registro de usuario" sx={{ color: 'white', textAlign: 'center' }}></CardHeader>
        <CardContent>
          <TextField
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            label="Nombre"
            margin="dense"
            fullWidth={true}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          ></TextField>

          <TextField
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            label="Apellidos"
            margin="dense"
            fullWidth={true}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          ></TextField>

          <TextField
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            label="Dirección"
            margin="dense"
            fullWidth={true}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          ></TextField>

          <TextField
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            label="Email"
            margin="dense"
            fullWidth={true}
            placeholder="user@email.com"
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
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
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
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
            onChange={(e) => setRetypedPassword(e.target.value)}
            type={isVisible ? "text" : "password"}
            label="Repita contraseña"
            margin="dense"
            fullWidth={true}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
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

          {retypedPasswordMsg !== '' && (retypedPasswordMsg.includes('Error') ? <Alert severity="error">Error. +Info: {retypedPasswordMsg}</Alert> : <Alert severity="success">{retypedPasswordMsg}</Alert>)}

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

          <Typography
            variant="body1"
            color="text.secondary"
            display="flex"
            justifyContent="center"
          >
            Si ya está registrado, haga clic&nbsp;<Link to={`/login`}>aquí.</Link>
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
      <Box component={'img'} src={sideImg} sx={{ height: '100vh', width: '50vw', objectFit: 'cover'}} />
    </Box>


  );
}

export default SignUpForm;
