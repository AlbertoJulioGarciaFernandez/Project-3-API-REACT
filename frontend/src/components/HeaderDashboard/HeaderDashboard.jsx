import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logoHeader from "../../assets/rvr.png";
import "./HeaderDashboard.css";
import { useNavigate } from 'react-router-dom'


import { useEffect } from "react";
import { getMyProfile } from '../../services/user';
import { useState } from "react";


const settings = ["Perfil", "Cerrar Sesion"];

function HeaderDashboard() {

const navigate = useNavigate()

  const settings = ["Perfil", "Cerrar Sesion"];

  const [userName, setUserName] = useState();

  useEffect(() => {
    getMyUserProfile();
  }, []);

  async function getMyUserProfile() {
    // API request which will retrieve the user profile:

    const data = await getMyProfile();

    setUserName(data.firstName);
  }

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const settings = [{name:"Perfil", onclick:"funcion"},{name:"Cerrar Sesion", onclick:onLogout} ];
  
  function onLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/')
  }
 
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  

  return (
    <AppBar position="static" >
      <Toolbar className="header">
        <img className="logo" src={logoHeader} />
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {/* The initial of the given name (stored in userName) will be shown inside 
              the profile circle located at the top right corner of the screen.
              To make this possible, we have to provide the user name to the «alt» attribute 
              of the Avatar component, as it is shown below:   */}
              <Avatar alt={userName} src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={setting.onclick}>
                <Typography textAlign="center">{setting.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default HeaderDashboard;
