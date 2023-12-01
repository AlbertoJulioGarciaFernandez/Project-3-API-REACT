import { useState, useEffect } from 'react';
import './ListBuildings.css';
import Building from './Building';
import { getAllBuildings } from '../../../services/building';

function ListBuildings() {

  // Creating a state variable to store the
  // different buildings we retrieve from the API:
  const [buildingsRetrieved, setBuildings] = useState([]);

  useEffect(() => {
    getExistingBuildings();
  }, []);

  async function getExistingBuildings() {
    // API request:
    const { buildings } = await getAllBuildings();

    // Storing the different buildings:
    setBuildings(buildings);
  }

  return (
    <>
      <Building existingBuildings={buildingsRetrieved} />
    </>
  )
}

export default ListBuildings