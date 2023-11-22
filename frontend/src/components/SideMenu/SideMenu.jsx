import { Link } from 'react-router-dom';
import './SideMenu.css';
import { Box, ListItemIcon, ListItemText, MenuItem } from '@mui/material';

function SideMenu() {
    // function handleClick(e) {
    //     e.target.
    // }
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', backgroundColor: 'lightblue' }}>
            <Box>
                <Link to={'/dashboard/listbookings'}>
                    <p>Ver reservas</p>
                </Link>
            </Box>
            <Box>
                <Link to={'/dashboard/listbookings'}>
                    <p>Crear reserva</p>
                </Link>
            </Box>
            <Box>
                <Link to={'/dashboard/listbookings'}>
                    <p>Modificar reserva</p>
                </Link>
            </Box>
            <Box>
                <Link to={'/dashboard/listbookings'}>
                    <p>Eliminar reserva</p>
                </Link>
            </Box>

            <MenuItem button onClick={handleClick}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Archives" />
            </MenuItem>

            <MenuItem button>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Archives" />
            </MenuItem>

            <MenuItem button>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Archives" />
            </MenuItem>

        </Box >


    )
}

export default SideMenu