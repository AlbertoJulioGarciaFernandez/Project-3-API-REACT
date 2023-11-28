import {
  Avatar,
  Box,
  Button,
  Card,
  Icon,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { lightBlue } from "@mui/material/colors";
import { updatePassword } from "../../../../services/user";

function ProfielCard({ myProfile }) {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("1234567a");
  const [passwordRep, setPasswordRep] = useState("1234567a");

  


  
    async function changerPassword() {

      // API request which will retrieve the user profile:
      const changeData = await updatePassword(password);
      localStorage.setItem("token", changeData.data.token);
      
    }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const [errorPassword, setErrorPassword] = useState({
    error: false,
    message: "",
  });

  return (
    <div className="profielBody">
      <Card className="profielCard" sx={{ background: "#DEE7FF" }}>
        <Avatar
          alt={myProfile.firstName}
          src="."
          sx={{ margin: "auto", marginBottom: 5, width: 100, height: 100 }}
        />
        <p>Nombre: {myProfile.firstName}</p>
        <p>Apellidos: {myProfile.lastName}</p>
        <p>Dirreccion: {myProfile.address}</p>
        <p>Email: {myProfile.firstName}</p>
        <Button className="btn-cambiarContraseña" onClick={handleOpen}>
          Cambiar contraseña
        </Button>
        {open && (
          <Box sx={{display:"flex", flexDirection: "column", width:"100%"}}>
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              type={isVisible ? "text" : "password"}
              variant="filled"
              required
              helperText={errorPassword.message}
              error={errorPassword.error}
              sx={{ background: "white", borderRadius: 1, width:"100%" }}
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
              type={isVisible ? "text" : "password"}
              variant="filled"
              required
              helperText={errorPassword.message}
              error={errorPassword.error}
              sx={{ background: "white", borderRadius: 1, width:"100%" }}
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
            <Button className="btn-cambiarContraseña" onClick={changerPassword} sx={{background:lightBlue}}>
          Confirmar cambio de contraseña
        </Button>
          </Box>
        )}
      </Card>
    </div>
  );
}

export default ProfielCard;
