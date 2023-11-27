import './ListBookings.css';
import { useState, useEffect } from 'react'
import CardBooking from '../../../components/CardBooking/CardBooking';
import { getAllBookings } from '../../../services/booking';
import { getAllClassrooms } from '../../../services/classroom';

function ListBookings() {

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    getBoookings()
  },[])

  async function getBoookings() {
    const data = await getAllBookings()
    setBookings(data);
     
  }

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    getClassroom();
  }, []);

  async function getClassroom() {
    const dataClassroom = await getAllClassrooms();
    setClassrooms(dataClassroom);
  }

  const bookingsList = bookings.map((booking) => {
    return <CardBooking key={booking.id} bookingsArray={booking} classroom={classrooms}/>
  }).reverse()

  



  return (
    <div className='cuerpoListBooking'>
      {bookingsList}
    </div>
      
    
    


    
    
  )
}

export default ListBookings