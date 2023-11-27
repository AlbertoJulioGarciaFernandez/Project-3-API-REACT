import { useEffect, useState } from 'react'
import { getAllClassrooms } from '../../../services/classroom';
import "./UpdateMyBooking.css";
import UpdateMyBookingCard from './UpdateMyBookingCard/UpdateMyBookingCard';
import { getMyBookings } from '../../../services/booking';

function UpdateMyBooking() {
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
    getMyBoookings()
  },[])

  async function getMyBoookings() {
    const data = await getMyBookings()
    setBookings(data.bookings);
    
     
  }

  return (
    <div className='BodyAddMyBooking'>
      <UpdateMyBookingCard classroom={classrooms} booking={bookings}/>
      
    </div>
    
  )
}

export default UpdateMyBooking