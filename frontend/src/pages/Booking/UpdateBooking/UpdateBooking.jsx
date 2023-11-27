import { useEffect, useState } from 'react'
import { getAllClassrooms } from '../../../services/classroom';
import "./UpdateBooking.css";
import { getAllBookings } from '../../../services/booking';
import UpdateBookingCard from './UpdateBookingCard/UpdateBookingCard';

function UpdateBooking() {
    const [classrooms, setClassrooms] = useState([])

  useEffect(() => {
    getClassroom()
  },[])

  async function getClassroom() {
    const dataClassroom = await getAllClassrooms()
    setClassrooms(dataClassroom)
  }

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    getTodasBoookings()
  },[])

  async function getTodasBoookings() {
    const data = await getAllBookings()
    setBookings(data);
    
     
  }

  return (
    <div className='BodyAddMyBooking'>
      <UpdateBookingCard classroom={classrooms} booking={bookings}/>
      
    </div>
    
  )
}

export default UpdateBooking