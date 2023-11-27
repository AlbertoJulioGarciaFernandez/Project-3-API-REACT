import { useEffect, useState } from 'react'
import AddMyBookingCard from './AddMyBookingCard/AddMyBookingCard';
import { getAllClassrooms } from '../../../services/classroom';
import "./AddMyBooking.css";

function AddMyBooking() {
    const [classrooms, setClassrooms] = useState([])

  useEffect(() => {
    getClassroom()
  },[])

  async function getClassroom() {
    const dataClassroom = await getAllClassrooms()
    setClassrooms(dataClassroom)
    
     
  }

  return (
    <div className='BodyAddMyBooking'>
      <AddMyBookingCard classroom={classrooms}/>
    </div>
    
  )
}

export default AddMyBooking