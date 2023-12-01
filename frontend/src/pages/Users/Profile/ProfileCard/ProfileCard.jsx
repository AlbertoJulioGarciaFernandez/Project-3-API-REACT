import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./ProfileCard.css";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { updatePassword } from "../../../../services/user";
import PropTypes from 'prop-types';

function ProfileCard({ myProfile }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleRep, setIsVisibleRep] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordRep, setPasswordRep] = useState("");
  const [errorMesg, setErrorMesg] = useState("");
  const [dataMesg, setDataMesg] = useState("");
  const [errorPassword, setErrorPassword] = useState({
    error: false,
    message: "",
  });
  const [errorPasswordRep, setErrorPasswordRep] = useState({
    error: false,
    message: "",
  });

  function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/;
    return regex.test(password);
  }

  function validatePasswordEqual(password, passwordRep) {
    if (password === passwordRep) {
      return true;
    } else {
      return false;
    }
  }

  async function changerPassword() {
    setDataMesg("");
    setErrorMesg("");

    if (validatePassword(password)) {
      setErrorPassword({
        error: false,
        message: "",
      });
    } else {
      setErrorPassword({
        error: true,
        message:
          "La contraseña debe contener números, letras y tener al menos 8 caracteres",
      });
    }

    if (validatePasswordEqual(password, passwordRep)) {
      setErrorPasswordRep({
        error: false,
        message: "",
      });
    } else {
      setErrorPasswordRep({
        error: true,
        message: "Las contraseñas deben ser iguales",
      });
    }

    try {
      if (
        validatePassword(password) &&
        validatePasswordEqual(password, passwordRep)
      ) {
        setDataMesg("");
        setErrorMesg("");
        const changeData = await updatePassword({ password });
        localStorage.setItem("token", changeData.data.token);
        setDataMesg(changeData.data.message);
        console.log("dato", changeData);
      }
    } catch (error) {
      setErrorMesg(error.response.data.message);
    }
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="profileBody">
      <Card className="profileCard" sx={{ background: "#DEE7FF" }}>
        <Avatar
          alt={myProfile.firstName}
          src="."
          sx={{ margin: "auto", marginBottom: 5, width: 100, height: 100 }}
        />
        <Typography variant="h6">
          Nombre: {myProfile.firstName}
        </Typography>
        <Typography variant="h6">
          Apellidos: {myProfile.lastName}
        </Typography>
        <Typography variant="h6">
          Dirección: {myProfile.address}
        </Typography>
        <Typography variant="h6">
          Email: {myProfile.email}
        </Typography>
        <Button className="btn-cambiarContraseña" onClick={handleOpen} >
          Cambiar contraseña
        </Button>
        {open && (
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              type={isVisible ? "text" : "password"}
              variant="filled"
              required
              helperText={errorPassword.message}
              error={errorPassword.error}
              sx={{ background: "white", borderRadius: 1, width: "100%" }}
              label="Contraseña"
              margin="dense"
              fullWidth={true}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ marginTop: 2 }}>
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
              onChange={(e) => setPasswordRep(e.target.value)}
              type={isVisibleRep ? "text" : "password"}
              variant="filled"
              required
              helperText={errorPasswordRep.message}
              error={errorPasswordRep.error}
              sx={{ background: "white", borderRadius: 1, width: "100%" }}
              label="Contraseña"
              margin="dense"
              fullWidth={true}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ marginTop: 2 }}>
                    <Icon>
                      <Lock />
                    </Icon>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setIsVisibleRep(!isVisibleRep)}>
                      {isVisibleRep ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <Button
              className="btn-cambiarContraseña"
              onClick={changerPassword}
              size="large" variant="contained" sx={{ background: "black" }}
            >
              Confirmar cambio de contraseña
            </Button>

            {dataMesg ? (
              <Alert severity="success">{dataMesg}</Alert>
            ) : (
              errorMesg && <Alert severity="error">{errorMesg}</Alert>
            )}
          </Box>
        )}
      </Card>
    </div>
  );
}

ProfileCard.propTypes = {
  myProfile: PropTypes.object
}

export default ProfileCard;
