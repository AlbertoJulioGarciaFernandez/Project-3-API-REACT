import './ListBookings.css';
import { useState, useEffect } from 'react'
import CardBooking from './CardBooking/CardBooking';
import { getAllBookings } from '../../../services/booking';

function ListBookings() {

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    getBoookings()
  },[])

  async function getBoookings() {
    const data = await getAllBookings()
    setBookings(data);
    console.log(data)
     
  }

  const bookingsList = bookings.map((booking) => {
    return <CardBooking bookingsArray={booking}/>
  })

  



  return (
    <div className='cuerpoListBooking'>
      {bookingsList}
    </div>
      
    
    


    
    
  )
}

export default ListBookings