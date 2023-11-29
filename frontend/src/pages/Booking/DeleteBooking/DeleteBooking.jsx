import { useEffect, useState } from "react";
import { getAllClassrooms } from "../../../services/classroom";
import "./DeleteBooking.css";
import { getAllBookings } from "../../../services/booking";
import DeleteBookingCard from "./DeleteBooking/DeleteBookingCard";

function DeleteBooking() {


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
    getAllBoookings();
  }, [refres]);

  async function getAllBoookings() {
    const data = await getAllBookings();
    setBookings(data);
  }

  return (
    <div className="BodyAddMyBooking">
      <DeleteBookingCard classroom={classrooms} booking={bookings} functRefres={handleRefres} />
    </div>
  );
}

export default DeleteBooking;
