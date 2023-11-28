import { Divider } from '@mui/material';
import PropTypes from 'prop-types';

function Building(props) {
  return (
    <div>
      <p><b>Código:</b> {props.existingBuilding.id}</p>
      <p><b>Denominación:</b> {props.existingBuilding.buildingName}</p>
      <p><b>Dirección:</b> {props.existingBuilding.address}</p>
      <p><b>Número de teléfono:</b> {props.existingBuilding.phoneNumber}</p>
      <p><b>Servicios disponibles:</b> {props.existingBuilding.providedServices}</p>
      <p><b>Administrador/a:</b> {props.existingBuilding.userId}</p>
      <Divider />
    </div>
  )
}

Building.propTypes = {
  existingBuilding: PropTypes.object
}

export default Building