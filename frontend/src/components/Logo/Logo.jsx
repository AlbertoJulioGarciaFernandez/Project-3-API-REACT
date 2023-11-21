import { Box } from "@mui/material";
import logo from "../../assets/rvr-logo.png";
import { Link } from "react-router-dom";
import './logo.css';

function Logo() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Link className="link" to={'/'} style={{ display: 'inline-block' }}>
        <Box component={'img'} src={logo} height={100} width={100} alt='ReservRoom Logo' sx={{ marginTop: 10 }} />
      </Link>
    </Box>
  )
}

export default Logo