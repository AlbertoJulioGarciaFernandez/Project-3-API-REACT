import { useEffect, useState } from 'react'
import AddMyBookingCard from './AddBookingCard/AddMyBookingCard';
import { getAllClassroom } from '../../../services/classroom';
import "./AddMyBooking.css";

function AddBooking() {
    const [classrooms, setClassrooms] = useState([])

  useEffect(() => {
    getClassroom()
  },[])

  async function getClassroom() {
    const dataClassroom = await getAllClassroom()
    setClassrooms(dataClassroom)
    
     
  }

  return (
    <div className='BodyAddMyBooking'>
      <AddMyBookingCard classroom={classrooms}/>
    </div>
    
  )
}

export default AddBooking