import { useState } from "react";
import "./LoginForm.css";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { login } from "../../services/login";
import { Link, useNavigate } from "react-router-dom";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import Logo from "../../components/Logo/Logo";
import sideImg from "../../assets/loginSignupImg.jpg";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false);
  const [errorEmail, setErrorEmail] = useState({ error: false, message: "" });
  const [errorPassword, setErrorPassword] = useState({
    error: false,
    message: "",
  });

  async function handleClick() {
    if (validateEmail(email)) {
      setErrorEmail({
        error: false,
        message: "",
      });
    } else {
      setErrorEmail({
        error: true,
        message: "Formato de correo electronico incorrecto",
      });
    }
    if (validatePassword(password)) {
      setErrorPassword({
        error: false,
        message: "",
      });
    } else {
      setErrorPassword({
        error: true,
        message: "Contraseña no valida",
      });
    }
    try {
      if (validateEmail(email) && validatePassword(password)) {
        const loginResponse = await login({ email, password });
        localStorage.setItem("token", loginResponse.data.token);
        localStorage.setItem("role", loginResponse.data.role);
        navigate("/home");
      }
    } catch (error) {
      //Handle the error
      setError("true");
      console.log("No registrado");
    }
  }

  function validateEmail(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  }

  function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/;
    return regex.test(password);
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        raised={true}
        sx={{ backgroundColor: "#4E7FFF", height: "100vh", width: "50vw" }}
      >
          <Logo />
        <CardHeader
          title="Iniciar Sesion"
          sx={{ color: "white", textAlign: "center" }}
        ></CardHeader>
        <CardContent>
          <TextField
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ background: "white", borderRadius: 1 }}
            type="email"
            required
            label="Correo electronico"
            variant="filled"
            margin="dense"
            fullWidth={true}
            helperText={errorEmail.message}
            error={errorEmail.error}
            placeholder="user@email.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ marginTop: 2 }}>
                  <Icon >
                    <Email />
                  </Icon>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            type={isVisible ? "text" : "password"}
            variant="filled"
            required
            helperText={errorPassword.message}
            error={errorPassword.error}
            sx={{ background: "white", borderRadius: 1 }}
            label="Contraseña"
            margin="dense"
            fullWidth={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ marginTop: 2 }}>
                  <Icon >
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
            size="large"
            sx={{ background: "black" }}
            variant="contained"
          >
            Iniciar Sesion
          </Button>
        </CardActions>
        <CardContent>
          <Typography
            variant="body1"
            display="flex"
            justifyContent="center"
            color="white"
          >
            Si no esta regitrado haga clic&nbsp;
            <Link to={`/signup`} className="link">
              aqui
            </Link>
          </Typography>
        </CardContent>
        {error && (
          <Alert severity="error">El usuario indicado no esta registrado</Alert>
        )}
      </Card>
      <Box
        component={"img"}
        src={sideImg}
        sx={{ height: "100vh", width: "50vw", objectFit: "cover" }}
      />
    </Box>
  );
}

export default LoginForm;
