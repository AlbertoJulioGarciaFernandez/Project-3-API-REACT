import Typography from '@mui/material/Typography';
import './Footer.css'
import { Paper } from '@mui/material';

function Footer() {
  return (
    <Paper className='footer' sx={{backgroundColor: '#4E7FFF'}}>
      <Typography variant="body2" sx={{color:"white", fontWeight:"bold"}}>© 2023 Todos los derechos reservados.</Typography>
        <a href="https://www.ejemplo.com" target="_blank" rel="noopener noreferrer">Visitar Ejemplo.com</a>
        <a href="#seccion-servicios">Ir a Servicios</a>
        <a href="mailto:info@ejemplo.com">Contactar con Ejemplo</a>
        <a href="/archivos/documento.pdf" download>Descargar Documento</a>
    </Paper>
  
  )
}

export default Footer