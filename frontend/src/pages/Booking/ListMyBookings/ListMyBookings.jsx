import "./ListMyBookings.css";
import { useState, useEffect } from "react";
import CardBooking from "../../../components/CardBooking/CardBooking";
import { getMyBookings } from "../../../services/booking";
import { getAllClassrooms } from "../../../services/classroom";

function ListBookings() {
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



  const bookingsList = bookings
    .map((booking) => {
      return (
        <CardBooking
          key={booking.id}
          bookingsArray={booking}
          classroom={classrooms}
        />
      );
    })
    .reverse();

  return (<>
    {bookingsList.length > 0 ? (
      <div className="cuerpoListBooking">{bookingsList}</div>
    ) : (
      <h1 className="cuerpoListBookingNot">No Hay Reservas Disponibles</h1>
    )}
  </>)
}

export default ListBookings;
