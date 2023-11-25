import { useState, useEffect } from 'react';
import './ListClassrooms.css';
import { getAllEquipment } from '../../../services/equipment';
import PieceOfEquipment from './Classroom';

function ListClassrooms() {

  // Creating a state variable to store the
  // pieces of equipment we retrieve from the API:
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    getEquipmentAvailable();
  }, []);

  async function getEquipmentAvailable() {
    // API request with which we will get the list of pieces of equipment available:
    const data = await getAllEquipment();

    // Storing the different pieces of equipment:
    setEquipment(data);
  }

  return (
    <div>
      <h1>Listado de equipamiento disponible</h1>
      {equipment.map((pieceOfEquipment, i) => {
        return <PieceOfEquipment key={i} pieceEquipment={pieceOfEquipment} />
      })}
    </div>
  )
}

export default ListClassrooms