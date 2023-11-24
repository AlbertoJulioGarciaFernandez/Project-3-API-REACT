import './ListMyBookings.css';
import { useState, useEffect } from 'react'
import CardBooking from '../../../components/CardBooking/CardBooking';
import { getMyBookings } from '../../../services/booking';

function ListBookings() {

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    getMyBoookings()
  },[])

  async function getMyBoookings() {
    const data = await getMyBookings()
    setBookings(data.bookings);
    
     
  }
  console.log(bookings)
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