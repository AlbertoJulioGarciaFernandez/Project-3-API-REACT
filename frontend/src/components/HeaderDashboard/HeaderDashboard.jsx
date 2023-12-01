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

function HeaderDashboard() {

  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const settings = [{ name: "Perfil", onclick: profile, key: "1" }, { name: "Cerrar Sesion", key: "2", onclick: onLogout }];

  useEffect(() => {
    getMyUserProfile();
  }, []);

  async function getMyUserProfile() {
    // API request which will retrieve the user profile:
    const data = await getMyProfile();

    setUserName(data.firstName);
  }

  function onLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/')
  }

  function profile() {
    navigate('/dashboard/profile')
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
              <Avatar alt={userName} src="." />
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
              <MenuItem key={setting.key} onClick={setting.onclick}>
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
