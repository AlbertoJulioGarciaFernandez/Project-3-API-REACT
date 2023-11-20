import { Box } from "@mui/material";
import logo from "../../assets/rvr-logo.png";

function Logo() {
  return (
    <Box component={'img'} src={logo} height={100} width={100} alt='ReserveRoom Logo' sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: 10 }} />
  )
}

export default Logo