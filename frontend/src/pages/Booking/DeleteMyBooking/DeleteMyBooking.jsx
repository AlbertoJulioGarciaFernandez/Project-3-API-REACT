import { useEffect, useState } from 'react'
import { getAllClassroom } from '../../../services/classroom';
import "./DeleteMyBooking.css";
import { getMyBookings } from '../../../services/booking';
import DeleteMyBookingCard from './DeleteMyBooking/DeleteMyBookingCard';

function DeleteMyBooking() {
    const [classrooms, setClassrooms] = useState([])

  useEffect(() => {
    getClassroom()
  },[])

  async function getClassroom() {
    const dataClassroom = await getAllClassroom()
    setClassrooms(dataClassroom)
  }

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    getMyBoookings()
  },[])

  async function getMyBoookings() {
    const data = await getMyBookings()
    setBookings(data.bookings);
    
     
  }

  return (
    <div className='BodyAddMyBooking'>
      <DeleteMyBookingCard classroom={classrooms} booking={bookings}/>
      
    </div>
    
  )
}

export default DeleteMyBooking