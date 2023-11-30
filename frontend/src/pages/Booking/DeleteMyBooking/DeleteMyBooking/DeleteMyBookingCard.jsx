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
      <CardHeader title="Eliminar Reserva" />
      <CardContent>
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="demo-simple-select-label">
            Referencia Reserva
          </InputLabel>
          <Select
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
      <Divider />
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => addMyBooking()}>Eliminar Reserva</Button>
      </CardActions>

      {mensaje ? (<Alert severity="success">{mensaje}</Alert>) : (error && <Alert severity="error">{error}</Alert>)}
    </Card>
  );
}

export default DeleteMyBookingCard;
