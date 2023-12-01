import { useState, useEffect } from 'react';
import './ListEquipment.css';
import { getAllEquipment } from '../../../services/equipment';
import PieceOfEquipment from './PieceOfEquipment';

function ListEquipment() {

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
    <>
      <PieceOfEquipment equipmentAvailable={equipment} />
    </>
  )
}

export default ListEquipment