import "./ListMyBookings.css";
import { useState, useEffect } from "react";
import CardBooking from "../../../components/CardBooking/CardBooking";
import { getMyBookings } from "../../../services/booking";
import { getAllClassrooms } from "../../../services/classroom";

function ListMyBookings() {

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    getBookings()
  },[])

  async function getBookings() {
    const data = await getMyBookings()
    setBookings(data.bookings);
     
  }


  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    getClassroom();
  }, []);

  async function getClassroom() {
    const dataClassroom = await getAllClassrooms();
    setClassrooms(dataClassroom);
  }

  bookings.sort((a, b) => {
    const dateA = new Date(a.bookingDate);
    const dateB = new Date(b.bookingDate);
    
    // Compara primero por bookingDate
    if (dateA - dateB !== 0) {
      return dateA - dateB;
    } else {
      // Si bookingDate es igual, compara por bookingTime
      const timeA = a.bookingTime.split(':').map(Number);
      const timeB = b.bookingTime.split(':').map(Number);
      return timeA[0] - timeB[0] ;
    }
  })


  const bookingsList = bookings
    .map((booking) => {
      return (
        <CardBooking
          key={booking.id}
          bookingsArray={booking}
          classroomArray={classrooms}
        />
      );
    }).reverse()
    ;

  return (<>
    {bookingsList.length > 0 ? (
      <div className="cuerpoListBooking">{bookingsList}</div>
    ) : (
      <h1 className="cuerpoListBookingNot">No Hay Reservas Disponibles</h1>
    )}
  </>)
}

export default ListMyBookings;
