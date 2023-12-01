import { Card, Typography } from "@mui/material";
import "./CardBooking.css";
import img from "../../assets/portada.jpg";
import PropTypes from 'prop-types';

function CardBooking(props) {
  function fechaHoy() {
    const fecha = new Date();
    let day = fecha.getDate();
    const dayCero = [1,2,3,4,5,6,7,8,9]
    if(dayCero.includes(day)){
      day=`0${day}`
    }
    const month = fecha.getMonth() + 1;
    const year = fecha.getFullYear();
    return `${year}-${month}-${day}`;
  }

  function horaActual() {
    const fecha = new Date();
    let hora = fecha.getHours();
    const horaCero = [1,2,3,4,5,6,7,8,9]
    if(horaCero.includes(hora)){
      hora=`0${hora}`
    }
    const minutos = fecha.getMinutes();
    return `${hora}:${minutos}`;
  }



  function formatdate(date) {
    return date.split("-").reverse().join("-");
  }

  const clasrooms = {};
  props.classroomArray.map(
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

CardBooking.propTypes = {
  bookingsArray: PropTypes.object,
  classroomArray:PropTypes.object
}

export default CardBooking;
