import { Link } from "react-router-dom";
import "./SideMenu.css";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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


  const role = localStorage.getItem("role")

  





  const menuItemsReserva = [
    { icon: <ListIcon />, text: 'Ver Reservas', link: role==="admin" ?'/dashboard/listbookings':'/dashboard/listmybookings' , index:1},
    { icon: <AddIcon />, text: 'Crear Reserva', link: role==="admin" ?'/dashboard/addbooking':'/dashboard/addmybooking', index:2 },
    { icon: <ChangeCircleIcon />, text: 'Modificar Reserva', link:role==="admin" ?'/dashboard/updateBooking':'/dashboard/updatemybooking', index:3 },
    { icon: <DeleteIcon />, text: 'Eliminar Reserva', link:role==="admin" ?'/dashboard/deletebooking':'/dashboard/deletemybooking', index:4 },
    // Agrega más elementos si es necesario
  ];

  const menuItemsUsuario = [
    { icon: <ListIcon />, text: 'Ver Usuarios', link: '/dashboard/listUsers', index: 5 },
    { icon: <AddIcon />, text: 'Crear Usuario', link: '/dashboard/createUser', index: 6 },
    { icon: <ChangeCircleIcon />, text: 'Modificar Usuario', link: '/dashboard/updateUser', index: 7 },
    { icon: <DeleteIcon />, text: 'Eliminar Usuario', link: '/dashboard/deleteUser', index: 8 },
    // Agrega más elementos si es necesario
  ];

  const menuItemsEquipamiento = [
    { icon: <ListIcon />, text: 'Ver Equipamientos', link: '/dashboard/listEquipment', index: 9 },
    { icon: <AddIcon />, text: 'Crear Equipamiento', link: '/dashboard/addEquipment', index: 10 },
    { icon: <ChangeCircleIcon />, text: 'Modificar Equipamiento', link: '/dashboard/updateEquipment', index: 11 },
    { icon: <DeleteIcon />, text: 'Eliminar Equipamiento', link: '/dashboard/deleteEquipment', index: 12 },
  ];

  const menuItemsAula = [
    { icon: <ListIcon />, text: 'Ver Aulas', link: '/dashboard/listClassrooms', index: 13 },
    { icon: <AddIcon />, text: 'Crear Aula', link: '/dashboard/addClassroom', index: 14 },
    { icon: <ChangeCircleIcon />, text: 'Modificar Aula', link: '/dashboard/updateClassroom', index: 15 },
    { icon: <DeleteIcon />, text: 'Eliminar Aula', link: '/dashboard/deleteClassroom', index: 16 },
  ];

  const menuItemsEdificio = [
    { icon: <ListIcon />, text: 'Ver Edificios', link: '/dashboard/listBuildings', index: 17 },
    { icon: <AddIcon />, text: 'Crear Edificio', link: '/dashboard/addBuilding', index: 18 },
    { icon: <ChangeCircleIcon />, text: 'Modificar Edificio', link: '/dashboard/updateBuilding', index: 19 },
    { icon: <DeleteIcon />, text: 'Eliminar Edificio', link: '/dashboard/deleteBuilding', index: 20 },
  ];

  return (
    <Box position="absolute" className="menuDashboard">
      <List className="btnMenu">
        {menuItemsReserva.map((item) => (
          <Link key={item.index} to={item.link} className="linkMenu">
            <ListItem
              key={item.text}
              disablePadding
              selected={selectedIndex === item.index}
              onClick={() => handleListItemClick(item.index)}
              className="listItem"
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      {role==="admin" && (<><Divider />
      <List className="btnMenu">
        {menuItemsUsuario.map((item) => (
          <Link key={item.index} to={item.link} className="linkMenu">
            <ListItem
              key={item.text}
              disablePadding
              selected={selectedIndex === item.index}
              onClick={() => handleListItemClick(item.index)}
              className="listItem"
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List className="btnMenu">
        {menuItemsEquipamiento.map((item) => (
          <Link key={item.index} to={item.link} className="linkMenu">
            <ListItem
              key={item.text}
              disablePadding
              selected={selectedIndex === item.index}
              onClick={() => handleListItemClick(item.index)}
              className="listItem"
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List className="btnMenu">
        {menuItemsAula.map((item) => (
          <Link key={item.index} to={item.link} className="linkMenu">
            <ListItem
              key={item.text}
              disablePadding
              selected={selectedIndex === item.index}
              onClick={() => handleListItemClick(item.index)}
              className="listItem"
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List className="btnMenu">
        {menuItemsEdificio.map((item) => (
          <Link key={item.index} to={item.link} className="linkMenu">
            <ListItem
              key={item.text}
              disablePadding
              selected={selectedIndex === item.index}
              onClick={() => handleListItemClick(item.index)}
              className="listItem"
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List></>)}
      
  
    </Box>
  );
}
export default SideMenu;
