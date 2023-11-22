import { Link } from "react-router-dom";
import "./SideMenu.css";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useState } from "react";

import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@mui/icons-material/Delete';


function SideMenu() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };
  return (
    
    <Box position="absolute" className="menuDashboard">
      <List className="btnMenu">
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Ver Reservas" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
                <AddIcon></AddIcon>
              </ListItemIcon>
              <ListItemText primary="Crear Reserva" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
              <ChangeCircleIcon></ChangeCircleIcon>
              </ListItemIcon>
              <ListItemText primary="Modificar Reserva" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
              <DeleteIcon></DeleteIcon>
              </ListItemIcon>
              <ListItemText primary="Eliminar Reserva" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List className="btnMenu">
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Ver Reservas" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
                <AddIcon></AddIcon>
              </ListItemIcon>
              <ListItemText primary="Crear Reserva" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
              <ChangeCircleIcon></ChangeCircleIcon>
              </ListItemIcon>
              <ListItemText primary="Modificar Reserva" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
              <DeleteIcon></DeleteIcon>
              </ListItemIcon>
              <ListItemText primary="Eliminar Reserva" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List className="btnMenu">
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Ver Reservas" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
                <AddIcon></AddIcon>
              </ListItemIcon>
              <ListItemText primary="Crear Reserva" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
              <ChangeCircleIcon></ChangeCircleIcon>
              </ListItemIcon>
              <ListItemText primary="Modificar Reserva" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
              <DeleteIcon></DeleteIcon>
              </ListItemIcon>
              <ListItemText primary="Eliminar Reserva" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List className="btnMenu">
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Ver Reservas" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
                <AddIcon></AddIcon>
              </ListItemIcon>
              <ListItemText primary="Crear Reserva" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
              <ChangeCircleIcon></ChangeCircleIcon>
              </ListItemIcon>
              <ListItemText primary="Modificar Reserva" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
              <DeleteIcon></DeleteIcon>
              </ListItemIcon>
              <ListItemText primary="Eliminar Reserva" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List className="btnMenu">
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Ver Reservas" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
                <AddIcon></AddIcon>
              </ListItemIcon>
              <ListItemText primary="Crear Reserva" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
              <ChangeCircleIcon></ChangeCircleIcon>
              </ListItemIcon>
              <ListItemText primary="Modificar Reserva" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/dashboard/listbookings`} className="linkMenu">
          <ListItem key="ver" disablePadding className="listItem">
            <ListItemButton>
              <ListItemIcon>
              <DeleteIcon></DeleteIcon>
              </ListItemIcon>
              <ListItemText primary="Eliminar Reserva" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
  
    </Box>
    
    
    
  );
}
export default SideMenu;
