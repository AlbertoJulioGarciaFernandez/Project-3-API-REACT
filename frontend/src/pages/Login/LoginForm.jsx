import { useState } from "react";
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
import sideImg from '../../assets/loginSignupImg.jpg';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false)

  async function handleClick() {
    try {
      const loginResponse = await login({ email, password });
      localStorage.setItem("token", loginResponse.data.token);
      localStorage.setItem("role", loginResponse.data.role);
      navigate("/home");
    } catch (error) {
      //Handle the error
      setError("true")
      console.log("No registrado");
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        raised={true}
        sx={{ backgroundColor: '#4E7FFF', height: '100vh', width: '50vw' }}
      >
        <CardHeader title="Login" sx={{ color: 'white', textAlign: 'center' }}></CardHeader>
        <CardContent>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            label="Email"
            margin="dense"
            fullWidth={true}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
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
          <Link to={`/signup`}>
            <Typography
              variant="body1"
              color="text.secondary"
              display="flex"
              justifyContent="center"
            >
              Si no esta regitrado haga click aqui
            </Typography>
          </Link>
        </CardContent>
        {error && <Alert severity="error">El usuario indicado no esta registrado</Alert>}
      </Card>
      <Box component={'img'} src={sideImg} sx={{ height: '100vh', width: '50vw', objectFit: 'cover' }} />
    </Box>
  );
}

export default LoginForm;

