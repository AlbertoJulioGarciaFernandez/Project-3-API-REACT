import rvrLogo from '../../assets/rvr-logo.png';
import './NotFound.css';

function NotFound() {
    let tokenExists = false;

    if (localStorage.getItem('token')) {
        tokenExists = true;
    }

    return (
        <div className='notfound'>
            <img src={rvrLogo} alt="ReservRoom" />
            <h1>Lo sentimos, la página a la que intenta acceder no existe.</h1>
            {tokenExists && <a className='notfoundlink' href='/dashboard'>Volver</a>}
            {!tokenExists && <a className='notfoundlink' href='/'>Volver</a>}
        </div>
    )
}

export default NotFound