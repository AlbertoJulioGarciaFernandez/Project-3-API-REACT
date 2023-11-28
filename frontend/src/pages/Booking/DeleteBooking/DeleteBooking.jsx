import { useEffect, useState } from "react";
import { getAllClassrooms } from "../../../services/classroom";
import "./DeleteBooking.css";
import { getAllBookings } from "../../../services/booking";
import DeleteBookingCard from "./DeleteBooking/DeleteBookingCard";

function DeleteBooking() {
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
  }, []);

  async function getAllBoookings() {
    const data = await getAllBookings();
    setBookings(data);
  }

  return (
    <div className="BodyAddMyBooking">
      <DeleteBookingCard classroom={classrooms} booking={bookings} />
    </div>
  );
}

export default DeleteBooking;
