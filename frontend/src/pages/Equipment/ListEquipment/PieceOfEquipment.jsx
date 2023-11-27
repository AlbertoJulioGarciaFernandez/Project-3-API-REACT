import { Divider } from '@mui/material';
import PropTypes from 'prop-types';

function PieceOfEquipment(props) {
  return (
    <div>
      <p><b>Código:</b> {props.pieceEquipment.id}</p>
      <p><b>Denominación:</b> {props.pieceEquipment.equipmentName}</p>
      <p><b>Descripción:</b> {props.pieceEquipment.description}</p>
      <Divider />
    </div>
  )
}

PieceOfEquipment.propTypes = {
  pieceEquipment: PropTypes.object
}

export default PieceOfEquipment