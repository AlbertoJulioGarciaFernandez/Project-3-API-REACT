import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu/SideMenu";
import HeaderDashboard from "../components/HeaderDashboard/HeaderDashboard";
import "./index.css";

function Root() {
  return (
    <div className="bodyDashboard">
      <div className="headerDashboard"><HeaderDashboard /></div>
      <div className="cuerpo">
        <div className="menuDashboard"><SideMenu /></div>
        <div className="contenidoDashboard"><Outlet /></div>
      </div>
    </div>
  );
}

export default Root;
