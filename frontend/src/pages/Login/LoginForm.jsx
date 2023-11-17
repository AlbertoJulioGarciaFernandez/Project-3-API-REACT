import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FilledInput,
  FormControl,
  FormHelperText,
  Icon,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { login } from "../../services/login";
import { Link, useNavigate } from "react-router-dom";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  async function handleClick() {
    try {
      const loginResponse = await login({ email, password });
      localStorage.setItem("token", loginResponse.data.token);
      localStorage.setItem("role", loginResponse.data.role);
      navigate("/home");
    } catch (error) {
      //Handle the error
      console.log("No registrado");
    }
  }

  return (
    <Card
      sx={{ maxWidth: "700px", backgroundColor: "white", margin: "20px" }}
      raised={true}
    >
      <CardHeader title="Login"></CardHeader>
      <CardContent>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          label="Email"
          margin="dense"
          fullWidth={true}
          placeholder="user@email.com"
          InputProps={{
            startAdornment: (
              <InputAdornment>
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
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <Icon>
                  <Lock />
                </Icon>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment>
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
    </Card>
  );
}

export default LoginForm;
