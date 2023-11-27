import "./ListMyBookings.css";
import { useState, useEffect } from "react";
import CardBooking from "../../../components/CardBooking/CardBooking";
import { getMyBookings } from "../../../services/booking";
import { getAllClassrooms } from "../../../services/classroom";

function ListBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getMyBoookings();
  }, []);

  async function getMyBoookings() {
    const data = await getMyBookings();
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

  return <div className="cuerpoListBooking">{bookingsList}</div>;
}

export default ListBookings;
