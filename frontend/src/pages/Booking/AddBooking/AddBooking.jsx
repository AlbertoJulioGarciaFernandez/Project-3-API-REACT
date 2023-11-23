import { useEffect, useState } from 'react'
import { addBooking } from "../../../services/booking";
import AddBookingCard from './AddBookingCard/AddBookingCard';

function AddBooking() {

    const [bookings, setBookings] = useState([])

  useEffect(() => {
    addBoookings()
  },[])

  async function addBoookings() {
    const data = await addBooking()
    setBookings(data);
    console.log(data)
     
  }


  return (
    <AddBookingCard/>
  )
}

export default AddBooking