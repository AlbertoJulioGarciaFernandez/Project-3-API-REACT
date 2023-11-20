import { Box } from "@mui/material";
import logo from "../../assets/rvr-logo.png";
import { Link } from "react-router-dom";
import './Logo.css';

function Logo() {
  return (
    <Link className="link" to={'/'} style={{ display: 'inline-block' }}>
      <Box component={'img'} src={logo} height={100} width={100} alt='ReservRoom Logo' sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: 10 }} />
    </Link>
  )
}

export default Logo