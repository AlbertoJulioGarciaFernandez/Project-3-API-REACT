import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { DeleteMyBooking } from "../../../../services/booking";
import PropTypes from 'prop-types';

function DeleteMyBookingCard(props) {
  const [bookingId, setbookingId] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const role = localStorage.getItem("role");

  async function addMyBooking() {
    try {
      setError("");
      setMensaje("");
      const addMyBookingResponse = await DeleteMyBooking({
        bookingId: bookingId,
      });
      setMensaje(addMyBookingResponse.data);
      props.functRefres()

      //Do something with the response
    } catch (error) {
      setError(error.response.data);
    }
  }

  const handleChangeId = (event) => {
    setbookingId(event.target.value);
  };


  function claseCardDate(booking) {
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

    if (fechaHoy() < booking.bookingDate) {
      return true;
    } else if (fechaHoy() === booking.bookingDate) {
      if (horaActual() < booking.bookingTime) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const clasrooms = {};
  props.classroom
    .filter((booking) => booking.aimedAt === role)
    .map((classroom) => (clasrooms[classroom.id] = classroom.classroomName));

  const myBokkings = props.booking.filter((booking)=>claseCardDate(booking))
    .map((booking) => (
      <MenuItem key={booking.id} value={booking.id}>
        Referencia:{booking.id} | Fecha:{booking.bookingDate} | Hora:
        {booking.bookingTime} | {clasrooms[booking.classroomId]}
      </MenuItem>
    ))
    .reverse();

  return (
    <Card sx={{ width: "500px", background: "#DEE7FF" }}>
      <CardHeader title="Eliminar Reserva" sx={{textAlign:"center"}} />
      <Divider/>
      <CardContent>
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="demo-simple-select-label" sx={{fontWeight:"bold"}}>
            Referencia Reserva
          </InputLabel>
          <Select
          sx={{background:"white"}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bookingId}
            label="Referencia Reserva"
            onChange={handleChangeId}
          >
            {myBokkings}
          </Select>
        </FormControl>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => addMyBooking()} size="large" variant="contained" sx={{background:"black"}}>Eliminar Reserva</Button>
      </CardActions>

      {mensaje ? (<Alert severity="success">{mensaje}</Alert>) : (error && <Alert severity="error">{error}</Alert>)}
    </Card>
  );
}

DeleteMyBookingCard.propTypes = {
  classroom: PropTypes.object,
  booking:PropTypes.object,
  functRefres:PropTypes.func
}

export default DeleteMyBookingCard;
