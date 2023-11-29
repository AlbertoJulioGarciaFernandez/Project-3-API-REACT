import { useEffect, useState } from 'react'
import { getAllClassrooms } from '../../../services/classroom';
import "./UpdateMyBooking.css";
import UpdateMyBookingCard from './UpdateMyBookingCard/UpdateMyBookingCard';
import { getMyBookings } from '../../../services/booking';

function UpdateMyBooking() {

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
    getMyBoookings()
  },[refres])

  async function getMyBoookings() {
    const data = await getMyBookings()
    setBookings(data.bookings);
  }

  return (
    <div className='BodyAddMyBooking'>
      {(bookings && classrooms) && <UpdateMyBookingCard classroom={classrooms} booking={bookings}  functRefres={handleRefres} getMyBoookings={getMyBoookings}/>}
      
    </div>
    
  )
}

export default UpdateMyBooking