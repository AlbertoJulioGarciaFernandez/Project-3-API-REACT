import { Divider } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getAllBuildings } from '../../../services/building';

function Classroom(props) {
  // Creating a state variable to store the
  // buildings we retrieve from the API:
  const [buildingsRetrieved, setBuildings] = useState([]);
  let currentBuildingName = '';

  useEffect(() => {
    getBuildingsAvailable();
  }, []);

  async function getBuildingsAvailable() {
    // API request:
    const { buildings } = await getAllBuildings();

    // Storing the different pieces of equipment:
    setBuildings(buildings);
  }

  buildingsRetrieved.findIndex(building => { if (building.id === props.existingClassroom.buildingId) { currentBuildingName = building.buildingName } })
  return (
    <div>
      <p><b>Código:</b> {props.existingClassroom.id}</p>
      <p><b>Denominación:</b> {props.existingClassroom.classroomName}</p>
      <p><b>Aforo:</b> {props.existingClassroom.capacity}</p>
      {props.existingClassroom.aimedAt === 'student' && <p><b>Dirigida a:</b> Alumnado</p>}
      {props.existingClassroom.aimedAt === 'professor' && <p><b>Dirigida a:</b> Profesorado</p>}
      {(props.existingClassroom.aimedAt !== 'student' && props.existingClassroom.aimedAt !== 'professor') && <p><b>Dirigida a:</b></p>}
      {currentBuildingName !== '' && <p><b>Edificio de ubicación:</b> {currentBuildingName} (ID: {props.existingClassroom.buildingId})</p>}
      {currentBuildingName === '' && <p><b>Edificio de ubicación:</b></p>}
      <Divider />
    </div>
  )
}

Classroom.propTypes = {
  existingClassroom: PropTypes.object
}

export default Classroom