import rvrLogo from '../../assets/rvr-logo.png';
import './NotFound.css';

function NotFound() {
    return (
        <div className='notfound'>
            <img src={rvrLogo} alt="ReservRoom" />
            <h1>Lo sentimos, la página a la que intenta acceder no existe.</h1>
        </div>
    )
}

export default NotFound