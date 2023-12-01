import { useEffect, useState } from "react";
import { getAllClassrooms } from "../../../services/classroom";
import "./DeleteMyBooking.css";
import { getMyBookings } from "../../../services/booking";
import DeleteMyBookingCard from "./DeleteMyBooking/DeleteMyBookingCard";

function DeleteMyBooking() {


  const [refres, setRefres] = useState(false)

  function handleRefres() {
    setRefres(!refres)
  }



  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    getClassroom();
  }, []);

  async function getClassroom() {
    const dataClassroom = await getAllClassrooms();
    setClassrooms(dataClassroom);
  }

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getMyBoookings();
  }, [refres]);

  async function getMyBoookings() {
    const data = await getMyBookings();
    setBookings(data.bookings);
  }

  return (
    <div className="BodyAddMyBooking">
      <DeleteMyBookingCard classroom={classrooms} booking={bookings} functRefres={handleRefres} />
    </div>
  );
}

export default DeleteMyBooking;
