import { Link } from 'react-router-dom';
import './SideMenu.css';

function SideMenu() {
    return (
        <Link to={'/dashboard/listbookings'}>
            <p>Ver reservas</p>
        </Link>


    )
}

export default SideMenu