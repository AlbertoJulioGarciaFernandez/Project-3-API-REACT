import { useEffect, useState } from 'react'
import { getAllClassrooms } from '../../../services/classroom';
import "./UpdateBooking.css";
import { getAllBookings } from '../../../services/booking';
import UpdateBookingCard from './UpdateBookingCard/UpdateBookingCard';

function UpdateBooking() {



  const [refres, setRefres] = useState(false)

  function handleRefres() {
    setRefres(!refres)
  }



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
  },[refres])

  async function getTodasBoookings() {
    const data = await getAllBookings()
    setBookings(data);
    
     
  }

  return (
    <div className='BodyAddMyBooking'>
      {(bookings && classrooms) &&<UpdateBookingCard classroom={classrooms} booking={bookings} functRefres={handleRefres}/>}
      
    </div>
    
  )
}

export default UpdateBooking