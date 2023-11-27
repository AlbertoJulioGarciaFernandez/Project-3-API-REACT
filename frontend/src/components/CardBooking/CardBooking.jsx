import { Card, Typography } from "@mui/material";
import "./CardBooking.css";
import img from "../../assets/portada.jpg";

function CardBooking(props) {
 

  const clasrooms = {};
  props.classroom.map(
    (classroom) => (clasrooms[classroom.id] = classroom.classroomName)
  );

  return (
    <Card className="CardListBooking">
      <div className="CardListBookingTitel">
        <Typography variant="h6">
          {" "}
          Referencia Reserva {props.bookingsArray.id}
        </Typography>
      </div>
      <div className="CardListBookingBody">
        <div>
          <p> Fecha: {props.bookingsArray.bookingDate}</p>
          <p>Hora: {props.bookingsArray.bookingTime}</p>
          <p> {clasrooms[props.bookingsArray.classroomId]}</p>
          <p>Usuario: {props.bookingsArray.userId}</p>
        </div>
        <img className="CardListBookingImg" src={img} />
      </div>
    </Card>
  );
}

export default CardBooking;
