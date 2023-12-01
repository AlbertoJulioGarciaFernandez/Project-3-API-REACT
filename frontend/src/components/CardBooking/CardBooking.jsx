import { Card, Typography } from "@mui/material";
import "./CardBooking.css";
import img from "../../assets/portada.jpg";

function CardBooking(props) {
  function fechaHoy() {
    const fecha = new Date();
    const day = fecha.getDate();
    const month = fecha.getMonth() + 1;
    const year = fecha.getFullYear();
    return `${year}-${month}-${day}`;
  }

  function horaActual() {
    const fecha = new Date();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    return `${hora}:${minutos}`;
  }

  function formatdate(date) {
    return date.split("-").reverse().join("-");
  }

  const clasrooms = {};
  props.classroom.map(
    (classroom) => (clasrooms[classroom.id] = classroom.classroomName)
  );

  function claseCardDate() {
    if (fechaHoy() < props.bookingsArray.bookingDate) {
      return "CardListBookingTitel";
    } else if (fechaHoy() === props.bookingsArray.bookingDate) {
      if (horaActual() < props.bookingsArray.bookingTime) {
        return "CardListBookingTitel";
      } else {
        return "CardListBookingTitelOutDate";
      }
    } else {
      return "CardListBookingTitelOutDate";
    }
  }
  return (
    <Card className="CardListBooking" sx={{background:"#DEE7FF"}}>
      <div className={claseCardDate()}>
        <Typography variant="h5">
          {" "}
          Referencia Reserva {props.bookingsArray.id}
        </Typography>
      </div>
      <div className="CardListBookingBody">
        <div>
        <Typography variant="h6">Fecha: {formatdate(props.bookingsArray.bookingDate)}</Typography>
        <Typography variant="h6">Hora: {props.bookingsArray.bookingTime}</Typography>
        <Typography variant="h6">{clasrooms[props.bookingsArray.classroomId]}</Typography>      
        </div>
        <img className="CardListBookingImg" src={img} />
      </div>
    </Card>
  );
}

export default CardBooking;
