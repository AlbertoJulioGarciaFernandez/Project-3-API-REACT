import * as React from "react";
import "./Header.css";
import logoHeader from "../../../assets/rvr.png";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="container">
      <div>
        <img className="logo" src={logoHeader} />
      </div>

      <div className="tituloEncabezado">
        <h2>Bien Veniedos a Reserv Room</h2>
      </div>

      <ButtonGroup
        className="grupoBotones"
        disableElevation
        variant="contained"
        aria-label="Disabled elevation buttons"
      >
        <Link to={`/login`}><Button>Login</Button></Link>
        <Link to={`/signup`}><Button>Signup</Button></Link>
      </ButtonGroup>
    </div>
  );
}

export default Header;
