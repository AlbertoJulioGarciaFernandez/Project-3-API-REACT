import { Divider } from '@mui/material';
import PropTypes from 'prop-types';

function Classroom(props) {
  return (
    <div>
      <p><b>Código:</b> {props.existingClassroom.id}</p>
      <p><b>Denominación:</b> {props.existingClassroom.classroomName}</p>
      <p><b>Aforo:</b> {props.existingClassroom.capacity}</p>
      <p><b>Dirigida a:</b> {props.existingClassroom.aimedAt}</p>
      <p><b>Edificio de ubicación:</b> {props.existingClassroom.idBuilding}</p>
      <Divider />
    </div>
  )
}

Classroom.propTypes = {
  existingClassroom: PropTypes.object
}

export default Classroom