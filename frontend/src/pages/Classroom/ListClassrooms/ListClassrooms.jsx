import { useState, useEffect } from 'react';
import './ListClassrooms.css';
import Classroom from './Classroom';
import { getAllClassrooms } from '../../../services/classroom';

function ListClassrooms() {

  // Creating a state variable to store the
  // classrooms we retrieve from the API:
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    getClassroomsAvailable();
  }, []);

  async function getClassroomsAvailable() {
    // API request:
    const data = await getAllClassrooms();

    // Storing the different pieces of equipment:
    setClassrooms(data);
  }

  return (
    <div>
      <h1>Aulario</h1>
      {classrooms.map(classroom => {
        return <Classroom key={classroom.id} existingClassroom={classroom} />
      })}
    </div>
  )
}

export default ListClassrooms